import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, User, ShieldCheck } from 'lucide-react-native';
import { useStore } from '../../store/useStore';

export const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore(); // Mock register by just logging in

  const handleRegister = () => {
    // In a real app, this would create an account
    // For the prototype, we'll just navigate to role selection
    navigation.navigate('RoleSelection');
  };

  return (
    <SafeAreaView className="flex-1 bg-navy-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-navy-800 items-center justify-center mb-8"
          >
            <ArrowLeft color="#fff" size={20} />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-white text-3xl font-bold mb-2">Create Account</Text>
            <Text className="text-gray-400">Join the Origyn network for traceability</Text>
          </View>

          <View className="space-y-4 mb-8">
            <View>
              <Text className="text-gray-400 text-sm mb-1 ml-1">Full Name</Text>
              <View className="flex-row items-center bg-navy-800 rounded-xl px-4 py-3 border border-white/10">
                <User color="#6B7280" size={20} />
                <TextInput
                  placeholder="John Doe"
                  placeholderTextColor="#4B5563"
                  className="flex-1 text-white ml-3"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-400 text-sm mb-1 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-navy-800 rounded-xl px-4 py-3 border border-white/10">
                <Mail color="#6B7280" size={20} />
                <TextInput
                  placeholder="name@example.com"
                  placeholderTextColor="#4B5563"
                  className="flex-1 text-white ml-3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-400 text-sm mb-1 ml-1">Password</Text>
              <View className="flex-row items-center bg-navy-800 rounded-xl px-4 py-3 border border-white/10">
                <Lock color="#6B7280" size={20} />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#4B5563"
                  className="flex-1 text-white ml-3"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-green-accent py-4 rounded-xl items-center flex-row justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)] mb-6"
            onPress={handleRegister}
          >
            <ShieldCheck color="#0A0F1E" size={20} className="mr-2" />
            <Text className="text-navy-900 font-bold text-lg">Register</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-auto">
            <Text className="text-gray-400">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-green-accent font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
