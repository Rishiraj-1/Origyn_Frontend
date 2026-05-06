import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../store/useStore';
import { Leaf, Truck, Store, ShoppingBag, ShieldCheck } from 'lucide-react-native';

const DEMO_ROLES = [
  { role: 'farmer', label: 'Farmer', icon: Leaf, color: '#4ADE80', bg: 'bg-farmer/20', email: 'farmer@origyn.demo' },
  { role: 'distributor', label: 'Distributor', icon: Truck, color: '#38BDF8', bg: 'bg-distributor/20', email: 'dist@origyn.demo' },
  { role: 'retailer', label: 'Retailer', icon: Store, color: '#A78BFA', bg: 'bg-retailer/20', email: 'retail@origyn.demo' },
  { role: 'consumer', label: 'Consumer', icon: ShoppingBag, color: '#FBBF24', bg: 'bg-consumer/20', email: 'consumer@origyn.demo' },
  { role: 'admin', label: 'Admin', icon: ShieldCheck, color: '#EF4444', bg: 'bg-red-500/20', email: 'admin@origyn.demo' },
] as const;

export const LoginScreen = ({ navigation }: any) => {
  const [method, setMethod] = useState<'password' | 'otp'>('password');
  const { login } = useStore();
  
  const handleLogin = () => {
    // Default login as consumer
    login('consumer');
  };

  const handleDemoLogin = (role: string) => {
    login(role as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
        <View className="items-center mb-10">
          <View className="w-16 h-16 bg-green-accent rounded-2xl items-center justify-center mb-4">
            <Text className="text-navy-900 font-black text-3xl">O</Text>
          </View>
          <Text className="text-white text-3xl font-black">ORIGYN</Text>
          <Text className="text-gray-400 mt-2">Your products, verified.</Text>
        </View>

        <View className="flex-row bg-navy-800 rounded-lg p-1 mb-6">
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-md items-center ${method === 'password' ? 'bg-navy-700' : ''}`}
            onPress={() => setMethod('password')}
          >
            <Text className={`font-bold ${method === 'password' ? 'text-white' : 'text-gray-500'}`}>Password</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-md items-center ${method === 'otp' ? 'bg-navy-700' : ''}`}
            onPress={() => setMethod('otp')}
          >
            <Text className={`font-bold ${method === 'otp' ? 'text-white' : 'text-gray-500'}`}>OTP</Text>
          </TouchableOpacity>
        </View>

        {method === 'password' ? (
          <>
            <Input label="Email or Phone" placeholder="user@origyn.com" keyboardType="email-address" autoCapitalize="none" />
            <Input label="Password" placeholder="••••••••" isPassword />
            <TouchableOpacity className="mb-6 self-end">
              <Text className="text-green-accent font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Input label="Phone Number" placeholder="+91 98765 43210" keyboardType="phone-pad" />
          </>
        )}

        <Button title={method === 'password' ? "Login" : "Send OTP"} onPress={handleLogin} className="mt-4" />

        {/* Demo Accounts Section */}
        <View className="mt-8 mb-4">
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-white/10" />
            <Text className="text-gray-400 text-sm mx-4">Quick Demo Login</Text>
            <View className="flex-1 h-px bg-white/10" />
          </View>

          <View className="flex-row flex-wrap justify-between">
            {DEMO_ROLES.map((demo) => {
              const Icon = demo.icon;
              return (
                <TouchableOpacity
                  key={demo.role}
                  onPress={() => handleDemoLogin(demo.role)}
                  className="w-[48%] bg-navy-800 rounded-xl p-3 mb-3 border border-white/5 flex-row items-center"
                  style={{ borderColor: `${demo.color}33` }}
                >
                  <View className="w-9 h-9 rounded-full items-center justify-center mr-3" style={{ backgroundColor: `${demo.color}20` }}>
                    <Icon color={demo.color} size={18} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-sm">{demo.label}</Text>
                    <Text className="text-gray-500 text-[10px]">{demo.email}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-400">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
            <Text className="text-green-accent font-bold">Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
