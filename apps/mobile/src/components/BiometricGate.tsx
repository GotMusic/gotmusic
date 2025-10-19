import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { useBiometricGate } from "../hooks/useBiometricGate";

interface BiometricGateProps {
  onAuthenticated: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export function BiometricGate({
  onAuthenticated,
  onCancel,
  title = "Authenticate to Continue",
  description = "Use your biometric authentication to access your music",
}: BiometricGateProps) {
  const { authenticate, checkBiometricAvailability, isLoading, error } = useBiometricGate();
  const [biometricInfo, setBiometricInfo] = useState<{
    isAvailable: boolean;
    supportedTypes: number[];
  } | null>(null);

  useEffect(() => {
    const checkAvailability = async () => {
      const info = await checkBiometricAvailability();
      setBiometricInfo(info);
    };
    checkAvailability();
  }, [checkBiometricAvailability]);

  const handleAuthenticate = async () => {
    const success = await authenticate();
    if (success) {
      onAuthenticated();
    } else {
      Alert.alert(
        "Authentication Failed",
        "Please try again or use an alternative authentication method.",
        [{ text: "OK" }],
      );
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-lg font-medium text-gray-900 mt-4">Authenticating...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      <View className="w-full max-w-sm">
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</Text>
        <Text className="text-base text-gray-600 text-center mb-8">{description}</Text>

        {biometricInfo && (
          <View className="mb-6">
            <Text className="text-sm text-gray-500 text-center">
              {biometricInfo.isAvailable
                ? "Biometric authentication is available"
                : "Biometric authentication not available - using PIN fallback"}
            </Text>
          </View>
        )}

        {error && (
          <View className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Text className="text-sm text-red-600 text-center">{error}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleAuthenticate}
          className="bg-blue-600 py-3 px-6 rounded-lg mb-4"
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {biometricInfo?.isAvailable ? "Authenticate" : "Use PIN"}
          </Text>
        </TouchableOpacity>

        {onCancel && (
          <TouchableOpacity
            onPress={handleCancel}
            className="py-3 px-6 rounded-lg border border-gray-300"
          >
            <Text className="text-gray-700 text-center font-medium">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
