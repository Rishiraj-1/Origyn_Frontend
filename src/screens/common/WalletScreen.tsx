import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const WalletScreen = () => {
  const { user } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-white text-2xl font-bold">Origyn Wallet</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {/* Balance Card */}
        <View className="bg-gradient-to-br from-green-accent/20 to-navy-800 rounded-3xl p-6 mb-6 border border-green-accent/30 shadow-[0_0_30px_rgba(0,255,136,0.1)]">
          <View className="flex-row items-center mb-4">
            <WalletIcon color="#00FF88" size={24} />
            <Text className="text-gray-300 ml-2 font-medium">Total Balance</Text>
          </View>
          <Text className="text-white text-5xl font-black mb-2">1,240 <Text className="text-xl text-green-accent">ORG</Text></Text>
          <Text className="text-gray-400">≈ $45.20 USD</Text>

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity className="bg-green-accent py-3 px-6 rounded-full flex-row items-center justify-center flex-1 mr-2">
              <ArrowUpRight color="#0A0F1E" size={20} />
              <Text className="text-navy-900 font-bold ml-2">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-navy-900 py-3 px-6 rounded-full flex-row items-center justify-center flex-1 ml-2 border border-white/10">
              <ArrowDownRight color="#fff" size={20} />
              <Text className="text-white font-bold ml-2">Receive</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white text-lg font-bold mb-4">Recent Transactions</Text>
        
        {[
          { id: 1, type: 'reward', amount: '+15 ORG', title: 'Product Scan Reward', date: 'Today, 10:24 AM', color: '#00FF88' },
          { id: 2, type: 'reward', amount: '+50 ORG', title: 'Data Contribution', date: 'Yesterday', color: '#00FF88' },
          { id: 3, type: 'spend', amount: '-10 ORG', title: 'Premium Access', date: 'May 2', color: '#EF4444' },
        ].map((tx) => (
          <View key={tx.id} className="flex-row items-center bg-navy-800 p-4 rounded-2xl mb-3 border border-white/5">
            <View className="w-10 h-10 rounded-full bg-navy-900 items-center justify-center mr-4">
              <Activity color={tx.color} size={20} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold">{tx.title}</Text>
              <Text className="text-gray-400 text-xs">{tx.date}</Text>
            </View>
            <Text style={{ color: tx.color }} className="font-bold text-lg">{tx.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
