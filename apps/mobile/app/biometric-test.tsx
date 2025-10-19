import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { BiometricGate } from '../src/components/BiometricGate';

export default function BiometricTestScreen() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorized = () => {
    setIsAuthorized(true);
    Alert.alert('Success', 'Biometric authentication successful!');
  };

  const handleUnauthorized = () => {
    Alert.alert('Failed', 'Biometric authentication failed. Please try again.');
  };

  const handleLogout = () => {
    setIsAuthorized(false);
  };

  return (
    <View className="flex-1 bg-white">
      <BiometricGate
        onAuthorized={handleAuthorized}
        onUnauthorized={handleUnauthorized}
      >
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-2xl font-bold mb-4">🎉 Authenticated!</Text>
          <Text className="text-gray-600 mb-6 text-center">
            You have successfully authenticated with biometrics. This content is now secure.
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </BiometricGate>
    </View>
  );
}
