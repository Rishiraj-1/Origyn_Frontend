import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Truck, Package, Maximize, Settings, MapPin, BarChart2 } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const DistributorHomeScreen = ({ navigation }: any) => {
  const { user } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold">{user?.name || 'Distributor'} 🚚</Text>
        </View>
        <TouchableOpacity 
          className="w-12 h-12 bg-navy-800 rounded-full items-center justify-center"
          onPress={() => navigation.navigate('Profile')}
        >
          <Settings color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {/* Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-navy-800 rounded-2xl p-4 flex-1 mr-2 border border-blue-500/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <Truck color="#38BDF8" size={24} />
            <Text className="text-white text-2xl font-bold mt-2">12</Text>
            <Text className="text-gray-400 text-xs">In Transit</Text>
          </View>
          <View className="bg-navy-800 rounded-2xl p-4 flex-1 ml-2 border border-white/5">
            <Package color="#fff" size={24} />
            <Text className="text-white text-2xl font-bold mt-2">48</Text>
            <Text className="text-gray-400 text-xs">Delivered</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity 
            className="bg-blue-500 py-4 rounded-xl items-center flex-row justify-center flex-1 mr-2"
            onPress={() => navigation.navigate('Scan')}
          >
            <Maximize color="#fff" size={20} />
            <Text className="text-white font-bold text-sm ml-2">Scan & Update</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-navy-800 py-4 rounded-xl items-center flex-row justify-center flex-1 ml-2 border border-white/10"
            onPress={() => navigation.navigate('Products')}
          >
            <BarChart2 color="#fff" size={20} />
            <Text className="text-white font-bold text-sm ml-2">View All</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white text-lg font-bold mb-4">Active Shipments</Text>
        {[
          { id: 'TRK-9921', from: 'Shimla Farm', to: 'Delhi Hub', status: 'In Transit', time: '2h ago', temp: '4.2°C' },
          { id: 'TRK-4412', from: 'Pune Farm', to: 'Mumbai Warehouse', status: 'Pending Pickup', time: '5h ago', temp: '3.8°C' },
          { id: 'TRK-3301', from: 'Nashik Vineyard', to: 'Bangalore DC', status: 'Quality Check', time: '1d ago', temp: '5.1°C' },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            className="bg-navy-800 rounded-2xl p-4 mb-4 border border-white/5"
            onPress={() => navigation.navigate('UpdateStage', { data: item.id })}
          >
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 bg-blue-500/10 rounded-xl items-center justify-center mr-4 border border-blue-500/20">
                <Truck color="#38BDF8" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">{item.id}</Text>
                <Text className="text-gray-400 text-sm">{item.status}</Text>
              </View>
              <Text className="text-gray-400 text-xs">{item.time}</Text>
            </View>
            <View className="flex-row justify-between bg-navy-900 rounded-lg p-3">
              <View className="flex-row items-center">
                <MapPin color="#6B7280" size={14} />
                <Text className="text-gray-400 text-xs ml-1">{item.from} → {item.to}</Text>
              </View>
              <Text className="text-blue-400 text-xs font-mono">{item.temp}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
