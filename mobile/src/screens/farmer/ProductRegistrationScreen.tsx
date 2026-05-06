import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ArrowLeft, UploadCloud, MapPin, Download, Share2, CheckCircle, QrCode } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const CATEGORIES = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Meat', 'Spices'];

export const ProductRegistrationScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [permission, requestPermission] = useCameraPermissions();
  const [registered, setRegistered] = useState(false);
  const viewShotRef = useRef<any>(null);
  
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    batchSize: '',
    harvestDate: '',
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  // Generate a unique batch ID
  const batchId = `ORG-${formData.category?.slice(0,3).toUpperCase() || 'XXX'}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // QR data payload
  const qrData = JSON.stringify({
    platform: 'origyn',
    batchId,
    product: formData.name || 'Organic Product',
    category: formData.category || 'General',
    batchSize: formData.batchSize || '0',
    harvestDate: formData.harvestDate || new Date().toLocaleDateString(),
    origin: '31.1048°N, 77.1734°E',
    location: 'Shimla, Himachal Pradesh',
    aiGrade: 'A',
    trustScore: 98,
    registeredAt: new Date().toISOString(),
  });

  const handleSaveQR = useCallback(async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        const filename = `${FileSystem.documentDirectory}origyn-qr-${batchId}.png`;
        await FileSystem.copyAsync({ from: uri, to: filename });
        Alert.alert('Saved!', `QR code saved to your device.\n\nBatch: ${batchId}`, [{ text: 'OK' }]);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not save QR code. Please try sharing instead.');
    }
  }, [batchId]);

  const handleShareQR = useCallback(async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: `Share QR for ${batchId}`,
          });
        } else {
          Alert.alert('Sharing not available', 'Sharing is not available on this device.');
        }
      }
    } catch (e) {
      Alert.alert('Error', 'Could not share QR code.');
    }
  }, [batchId]);

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-center mb-6">
      {[1, 2, 3, 4].map((s, i) => (
        <React.Fragment key={s}>
          <View className={`w-8 h-8 rounded-full items-center justify-center ${step >= s ? 'bg-farmer' : 'bg-navy-800 border border-gray-600'}`}>
            <Text className={`font-bold ${step >= s ? 'text-navy-900' : 'text-gray-400'}`}>{s}</Text>
          </View>
          {i < 3 && (
            <View className={`w-10 h-1 ${step > s ? 'bg-farmer' : 'bg-navy-800 border-t border-b border-gray-600'}`} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const Step1 = () => (
    <View>
      <Text className="text-white text-xl font-bold mb-4">Product Info</Text>
      
      <Text className="text-gray-400 text-sm mb-2">Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        {CATEGORIES.map(cat => (
          <TouchableOpacity 
            key={cat} 
            onPress={() => setFormData({...formData, category: cat})}
            className={`px-4 py-2 rounded-full mr-2 border ${formData.category === cat ? 'bg-farmer/20 border-farmer' : 'bg-navy-800 border-white/10'}`}
          >
            <Text className={formData.category === cat ? 'text-farmer font-bold' : 'text-gray-400'}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Input 
        label="Product Name" 
        placeholder="e.g. Organic Tomatoes" 
        value={formData.name}
        onChangeText={(val) => setFormData({...formData, name: val})}
      />
      
      <View className="flex-row justify-between">
        <View className="w-[48%]">
          <Input 
            label="Batch Size (kg)" 
            placeholder="500" 
            keyboardType="numeric"
            value={formData.batchSize}
            onChangeText={(val) => setFormData({...formData, batchSize: val})}
          />
        </View>
        <View className="w-[48%]">
          <Input 
            label="Harvest Date" 
            placeholder="DD/MM/YYYY" 
            value={formData.harvestDate}
            onChangeText={(val) => setFormData({...formData, harvestDate: val})}
          />
        </View>
      </View>

      <Button title="Next Step" onPress={() => setStep(2)} className="mt-6" />
    </View>
  );

  const Step2 = () => {
    if (!permission?.granted) {
      return (
        <View className="items-center justify-center py-10">
          <Text className="text-gray-400 mb-4 text-center">Camera permission is required to analyze produce.</Text>
          <Button title="Grant Permission" onPress={requestPermission} />
        </View>
      );
    }

    return (
      <View className="flex-1">
        <Text className="text-white text-xl font-bold mb-4">Photo Capture & AI Verification</Text>
        
        {!aiAnalysis ? (
          <View className="h-80 rounded-2xl overflow-hidden mb-6 relative">
            <CameraView style={StyleSheet.absoluteFillObject} facing="back" />
            <View className="absolute inset-4 border-2 border-dashed border-farmer rounded-xl pointer-events-none" />
            <TouchableOpacity 
              className="absolute bottom-4 self-center w-16 h-16 bg-white rounded-full border-4 border-gray-300"
              onPress={() => {
                setTimeout(() => setAiAnalysis('🍅 Tomatoes detected • Grade A • Freshness 87%'), 1500);
              }}
            />
          </View>
        ) : (
          <View className="bg-navy-800 rounded-2xl p-6 mb-6 items-center border border-farmer/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
            <View className="w-16 h-16 bg-farmer/20 rounded-full items-center justify-center mb-4">
              <UploadCloud color="#4ADE80" size={32} />
            </View>
            <Text className="text-farmer font-bold text-lg text-center">{aiAnalysis}</Text>
            <TouchableOpacity className="mt-4" onPress={() => setAiAnalysis(null)}>
              <Text className="text-gray-400 underline">Retake Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="flex-row justify-between">
          <Button title="Back" variant="outline" onPress={() => setStep(1)} className="w-[48%]" color="green" />
          <Button title="Next Step" onPress={() => setStep(3)} disabled={!aiAnalysis} className="w-[48%]" />
        </View>
      </View>
    );
  };

  const Step3 = () => (
    <View>
      <Text className="text-white text-xl font-bold mb-4">Location Capture</Text>
      
      <View className="h-64 bg-navy-800 rounded-2xl mb-4 border border-white/10 items-center justify-center relative">
         <View className="w-12 h-12 bg-farmer/20 rounded-full items-center justify-center absolute">
            <MapPin color="#4ADE80" size={24} />
         </View>
         <View className="w-4 h-4 bg-farmer rounded-full absolute" />
         <Text className="absolute bottom-4 text-gray-500 text-xs">Simulated Map View</Text>
      </View>

      <View className="bg-navy-800 rounded-xl p-4 mb-6">
        <Text className="text-white font-medium mb-1">Current GPS Coordinates</Text>
        <Text className="text-farmer font-mono">31.1048° N, 77.1734° E</Text>
        <Text className="text-gray-400 text-xs mt-2">Shimla, Himachal Pradesh</Text>
      </View>

      <View className="flex-row justify-between">
        <Button title="Back" variant="outline" onPress={() => setStep(2)} className="w-[48%]" color="green" />
        <Button title="Next Step" onPress={() => setStep(4)} className="w-[48%]" />
      </View>
    </View>
  );

  const Step4 = () => (
    <View>
      <Text className="text-white text-xl font-bold mb-4">
        {registered ? 'Your DCQR Code' : 'Review & Submit'}
      </Text>
      
      {!registered ? (
        <>
          <View className="bg-navy-800 rounded-2xl p-5 mb-6 border border-white/5">
            <View className="flex-row justify-between mb-3 border-b border-white/10 pb-3">
              <Text className="text-gray-400">Product</Text>
              <Text className="text-white font-bold">{formData.name || 'Organic Tomatoes'}</Text>
            </View>
            <View className="flex-row justify-between mb-3 border-b border-white/10 pb-3">
              <Text className="text-gray-400">Category</Text>
              <Text className="text-white font-bold">{formData.category || 'Vegetables'}</Text>
            </View>
            <View className="flex-row justify-between mb-3 border-b border-white/10 pb-3">
              <Text className="text-gray-400">Batch Size</Text>
              <Text className="text-white font-bold">{formData.batchSize || '500'} kg</Text>
            </View>
            <View className="flex-row justify-between mb-3 border-b border-white/10 pb-3">
              <Text className="text-gray-400">AI Verification</Text>
              <Text className="text-farmer font-bold">Passed (Grade A)</Text>
            </View>
            <View className="flex-row justify-between mb-3 border-b border-white/10 pb-3">
              <Text className="text-gray-400">Batch ID</Text>
              <Text className="text-farmer font-mono font-bold">{batchId}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Est. Trust Score</Text>
              <Text className="text-farmer font-black">98/100</Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-4 mb-10">
            <Button title="Back" variant="outline" onPress={() => setStep(3)} className="w-[30%]" color="green" />
            <Button 
              title="Register on Blockchain" 
              onPress={() => setRegistered(true)} 
              className="w-[66%]" 
            />
          </View>
        </>
      ) : (
        <>
          {/* Success Banner */}
          <View className="bg-farmer/10 border border-farmer/30 rounded-2xl p-4 mb-6 flex-row items-center">
            <CheckCircle color="#4ADE80" size={24} />
            <View className="ml-3 flex-1">
              <Text className="text-farmer font-bold">Registered on Blockchain!</Text>
              <Text className="text-gray-400 text-xs mt-1">Batch {batchId} is now on-chain and traceable.</Text>
            </View>
          </View>

          {/* QR Code Card */}
          <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
            <View className="bg-white rounded-3xl p-6 items-center mb-6">
              <View className="mb-4">
                <QRCode
                  value={qrData}
                  size={200}
                  backgroundColor="white"
                  color="#0A0F1E"
                  logo={undefined}
                />
              </View>
              <Text style={{ color: '#0A0F1E', fontWeight: '900', fontSize: 18, marginBottom: 4 }}>
                {formData.name || 'Organic Product'}
              </Text>
              <Text style={{ color: '#6B7280', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' }}>
                {batchId}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100 }}>
                <Text style={{ color: '#16A34A', fontWeight: 'bold', fontSize: 12 }}>
                  ORIGYN VERIFIED • Score 98
                </Text>
              </View>
            </View>
          </ViewShot>

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity 
              className="flex-1 mr-2 bg-farmer py-4 rounded-xl flex-row items-center justify-center"
              onPress={handleSaveQR}
            >
              <Download color="#0A0F1E" size={20} />
              <Text className="text-navy-900 font-bold ml-2">Save to Device</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 ml-2 bg-navy-800 py-4 rounded-xl flex-row items-center justify-center border border-white/10"
              onPress={handleShareQR}
            >
              <Share2 color="#fff" size={20} />
              <Text className="text-white font-bold ml-2">Share QR</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="bg-navy-800 py-4 rounded-xl items-center mb-10 border border-white/10"
            onPress={() => navigation.navigate('AppTabs', { screen: 'Home' })}
          >
            <Text className="text-white font-bold">Back to Dashboard</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <View className="flex-row items-center px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-navy-800 rounded-full">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold ml-4">Register New Batch</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {renderStepIndicator()}
        
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </ScrollView>
    </SafeAreaView>
  );
};
