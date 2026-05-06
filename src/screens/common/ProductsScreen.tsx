import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Package, Search, Filter } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const ProductsScreen = () => {
  const { role } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">Products</Text>
        <TouchableOpacity className="w-10 h-10 bg-navy-800 rounded-full items-center justify-center">
          <Search color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-400">All Registered Items</Text>
          <TouchableOpacity className="flex-row items-center">
            <Filter color="#6B7280" size={16} />
            <Text className="text-gray-400 ml-1">Filter</Text>
          </TouchableOpacity>
        </View>

        {[1, 2, 3, 4].map((item) => (
          <TouchableOpacity 
            key={item}
            className="bg-navy-800 rounded-2xl p-4 mb-4 border border-white/5 flex-row items-center"
          >
            <View className="w-12 h-12 bg-navy-900 rounded-xl items-center justify-center mr-4">
              <Package color="#00FF88" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Organic Apples Batch {item}</Text>
              <Text className="text-gray-400 text-sm">Status: In Transit</Text>
            </View>
            <Text className="text-green-accent font-bold">#102{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
