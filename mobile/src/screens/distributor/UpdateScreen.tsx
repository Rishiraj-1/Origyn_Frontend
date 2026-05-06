import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Truck, CheckCircle, Package, ArrowRight } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export const UpdateScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 bg-navy-900 px-4">
      <View className="flex-row items-center mt-4 mb-6">
        <View className="w-12 h-12 bg-distributor/20 rounded-full items-center justify-center mr-4">
          <Truck color="#38BDF8" size={24} />
        </View>
        <View>
          <Text className="text-white text-xl font-bold">Update Transit Stage</Text>
          <Text className="text-gray-400 text-sm">Batch #8922</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="bg-navy-800 rounded-2xl p-5 mb-6 border border-white/5">
          <Text className="text-gray-400 text-sm mb-4">Current Status</Text>
          
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-green-accent rounded-full items-center justify-center">
              <CheckCircle color="#0A0F1E" size={20} />
            </View>
            <View className="flex-1 h-1 bg-green-accent mx-2" />
            <View className="w-10 h-10 bg-navy-700 border-2 border-distributor rounded-full items-center justify-center">
              <Truck color="#38BDF8" size={20} />
            </View>
            <View className="flex-1 h-1 bg-navy-700 mx-2" />
            <View className="w-10 h-10 bg-navy-700 rounded-full items-center justify-center">
              <Package color="#6B7280" size={20} />
            </View>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-white font-medium">Farm Origin</Text>
            <Text className="text-gray-400">08 May 10:00 AM</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-distributor font-medium">In Transit</Text>
            <Text className="text-distributor">Now</Text>
          </View>
        </View>

        <Text className="text-white font-bold mb-4">Select New Stage</Text>

        {[
          { title: 'Arrived at Warehouse', desc: 'Delhi Central Hub', active: true },
          { title: 'Quality Check Passed', desc: 'Temperature & conditions verified', active: false },
          { title: 'Dispatched to Retailer', desc: 'En route to final destination', active: false },
        ].map((stage, i) => (
          <TouchableOpacity 
            key={i} 
            className={`flex-row items-center p-4 rounded-xl mb-3 border ${stage.active ? 'bg-distributor/10 border-distributor' : 'bg-navy-800 border-white/5'}`}
          >
            <View className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${stage.active ? 'border-distributor bg-distributor/20' : 'border-gray-600'}`}>
              {stage.active && <View className="w-3 h-3 rounded-full bg-distributor" />}
            </View>
            <View className="flex-1">
              <Text className={`font-bold ${stage.active ? 'text-distributor' : 'text-white'}`}>{stage.title}</Text>
              <Text className="text-gray-400 text-xs mt-1">{stage.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View className="mt-8 mb-10">
          <Button 
            title="Update Blockchain" 
            color="blue"
            onPress={() => navigation.goBack()}
          />
          <Text className="text-gray-500 text-center text-xs mt-4">This action will cost ~0.001 MATIC and cannot be undone.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
