import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '../ui/Button';

import { useStore } from '../../store/useStore';

export const QRScanner = ({ navigation }: any) => {
  const [permission, requestPermission] = useCameraPermissions();
  const { role } = useStore();
  const [scanned, setScanned] = React.useState(false);

  // Reset scan state when screen is focused
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(false);
    });
    return unsubscribe;
  }, [navigation]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-navy-900 p-6">
        <Text className="text-white text-center mb-6 text-lg">
          We need your permission to show the camera to scan DCQR codes.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={({ data }) => {
          if (scanned) return;
          setScanned(true);
          
          if (role === 'consumer') {
            navigation.navigate('TrustScore', { score: 94, data });
          } else if (role === 'distributor') {
            navigation.navigate('UpdateStage', { data });
          } else if (role === 'farmer') {
            navigation.navigate('ProductRegistration', { data });
          } else {
            // Default fallback
            alert(`Scanned: ${data}`);
            setTimeout(() => setScanned(false), 2000);
          }
        }}
      >
        <View className="flex-1 bg-black/60 items-center justify-center">
          <Text className="text-white text-lg font-bold mb-8">Align QR code within frame</Text>
          
          {/* Scanner frame */}
          <View className="w-64 h-64 border-2 border-green-accent rounded-xl relative overflow-hidden">
            {/* Corner highlights */}
            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
            
            {/* Animated scan line placeholder */}
            <View className="w-full h-1 bg-green-accent shadow-[0_0_10px_#00FF88] opacity-80" />
          </View>
        </View>
      </CameraView>
    </View>
  );
};
