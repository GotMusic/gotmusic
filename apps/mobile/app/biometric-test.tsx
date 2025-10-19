import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BiometricGate } from "../src/components/BiometricGate";

export default function BiometricTestScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showGate, setShowGate] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setShowGate(false);
  };

  const handleCancel = () => {
    setShowGate(false);
  };

  if (showGate) {
    return (
      <BiometricGate
        onAuthenticated={handleAuthenticated}
        onCancel={handleCancel}
        title="Access Your Music"
        description="Authenticate to download and decrypt your music files"
      />
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Biometric Authentication Test
      </Text>
      
      {isAuthenticated ? (
        <View className="items-center">
          <Text className="text-lg text-green-600 mb-4">
            ✅ Authentication Successful!
          </Text>
          <Text className="text-base text-gray-600 text-center mb-6">
            You can now access your music files securely.
          </Text>
          <TouchableOpacity
            onPress={() => setIsAuthenticated(false)}
            className="bg-gray-600 py-3 px-6 rounded-lg"
          >
            <Text className="text-white font-semibold">
              Reset Authentication
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-lg text-gray-600 mb-6 text-center">
            Tap the button below to test biometric authentication
          </Text>
          <TouchableOpacity
            onPress={() => setShowGate(true)}
            className="bg-blue-600 py-3 px-6 rounded-lg"
          >
            <Text className="text-white font-semibold text-lg">
              Authenticate
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
