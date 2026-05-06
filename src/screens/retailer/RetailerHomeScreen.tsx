import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Store, Package, CheckCircle, Maximize, Settings, ShieldCheck, AlertTriangle } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const RetailerHomeScreen = ({ navigation }: any) => {
  const { user } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold">{user?.name || 'Retailer'} 🏪</Text>
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
          <View className="bg-navy-800 rounded-2xl p-4 flex-1 mr-2 border border-purple-500/20 shadow-[0_0_15px_rgba(167,139,250,0.1)]">
            <Store color="#A78BFA" size={24} />
            <Text className="text-white text-2xl font-bold mt-2">142</Text>
            <Text className="text-gray-400 text-xs">In Stock</Text>
          </View>
          <View className="bg-navy-800 rounded-2xl p-4 flex-1 mx-2 border border-white/5">
            <CheckCircle color="#10B981" size={24} />
            <Text className="text-white text-2xl font-bold mt-2">89%</Text>
            <Text className="text-gray-400 text-xs">Authenticity</Text>
          </View>
          <View className="bg-navy-800 rounded-2xl p-4 flex-1 ml-2 border border-white/5">
            <AlertTriangle color="#FBBF24" size={24} />
            <Text className="text-white text-2xl font-bold mt-2">2</Text>
            <Text className="text-gray-400 text-xs">Flagged</Text>
          </View>
        </View>

        {/* Scan Action */}
        <TouchableOpacity 
          className="bg-purple-500 py-4 rounded-xl items-center flex-row justify-center mb-8 shadow-[0_0_15px_rgba(167,139,250,0.3)]"
          onPress={() => navigation.navigate('Scan')}
        >
          <Maximize color="#fff" size={20} />
          <Text className="text-white font-bold text-lg ml-2">Scan Incoming Inventory</Text>
        </TouchableOpacity>

        {/* Inventory */}
        <Text className="text-white text-lg font-bold mb-4">Current Inventory</Text>
        {[
          { name: 'Organic Apples', batch: 'BAT-1001', qty: 50, verified: true, origin: 'Shimla, HP' },
          { name: 'Fresh Tomatoes', batch: 'BAT-1002', qty: 30, verified: true, origin: 'Nashik, MH' },
          { name: 'Basmati Rice', batch: 'BAT-1003', qty: 100, verified: false, origin: 'Dehradun, UK' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index} 
            className="bg-navy-800 rounded-2xl p-4 mb-4 border border-white/5"
            onPress={() => navigation.navigate('Products')}
          >
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 bg-purple-500/10 rounded-xl items-center justify-center mr-4 border border-purple-500/20">
                <Package color="#A78BFA" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-400 text-sm">{item.batch} • {item.origin}</Text>
              </View>
              <Text className="text-white font-bold">{item.qty} kg</Text>
            </View>
            <View className="flex-row items-center">
              <View className={`flex-row items-center px-3 py-1 rounded-full ${item.verified ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                <ShieldCheck color={item.verified ? '#10B981' : '#FBBF24'} size={14} />
                <Text className={`text-xs font-bold ml-1 ${item.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {item.verified ? 'Blockchain Verified' : 'Pending Verification'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Recent Deliveries */}
        <Text className="text-white text-lg font-bold mb-4 mt-2">Recent Deliveries</Text>
        {[
          { id: 'DEL-882', status: 'Received', time: '1h ago', color: '#A78BFA' },
          { id: 'DEL-881', status: 'Verified', time: 'Yesterday', color: '#10B981' },
        ].map((item, index) => (
          <View key={index} className="bg-navy-800 rounded-2xl p-4 mb-4 border border-white/5 flex-row items-center">
            <View className="w-12 h-12 bg-purple-500/10 rounded-xl items-center justify-center mr-4 border border-purple-500/20">
              <Package color={item.color} size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">{item.id}</Text>
              <Text className="text-gray-400 text-sm">{item.status}</Text>
            </View>
            <Text className="text-gray-400 text-xs">{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
