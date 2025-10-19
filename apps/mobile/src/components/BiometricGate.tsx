import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useBiometricGate } from '../hooks/useBiometricGate';

interface BiometricGateProps {
  onAuthorized: () => void;
  onUnauthorized?: () => void;
  children?: React.ReactNode;
}

export function BiometricGate({ onAuthorized, onUnauthorized, children }: BiometricGateProps) {
  const { authorized, prompt, isAvailable, isEnrolled } = useBiometricGate();

  useEffect(() => {
    if (authorized) {
      onAuthorized();
    }
  }, [authorized, onAuthorized]);

  const handleAuthenticate = async () => {
    const success = await prompt();
    if (success) {
      onAuthorized();
    } else {
      onUnauthorized?.();
    }
  };

  if (!isAvailable) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-gray-600 mb-4">
          Biometric authentication is not available on this device.
        </Text>
        <TouchableOpacity
          onPress={onAuthorized}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Continue Without Biometrics</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isEnrolled) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-gray-600 mb-4">
          No biometric data is enrolled. Please set up Face ID, Touch ID, or fingerprint authentication.
        </Text>
        <TouchableOpacity
          onPress={onAuthorized}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Continue Without Biometrics</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-xl font-semibold mb-4">Secure Access Required</Text>
      <Text className="text-gray-600 mb-6 text-center">
        Please authenticate to access secure content.
      </Text>
      <TouchableOpacity
        onPress={handleAuthenticate}
        className="bg-blue-500 px-8 py-4 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
}
