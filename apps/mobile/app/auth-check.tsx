import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { tokens } from '@gotmusic/tokens/native';
import { useAuth } from '../src/contexts/AuthContext';
import { useBiometric } from '../src/contexts/BiometricContext';
import { usePasskey } from '../src/contexts/PasskeyContext';

export default function AuthCheckScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authMethod, setAuthMethod] = useState<string | null>(null);
  
  const { isAuthenticated, isFirstTime, isLoading } = useAuth();
  const { isBiometricEnabled, authenticateWithBiometric } = useBiometric();
  const { isPasskeyEnabled, authenticateWithPasskey } = usePasskey();

  useEffect(() => {
    if (isLoading) return;

    if (isFirstTime) {
      router.replace('/onboarding');
    } else if (!isAuthenticated) {
      router.replace('/auth');
    } else {
      // User is authenticated, check for security methods
      if (isBiometricEnabled || isPasskeyEnabled) {
        handleAuthentication();
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isLoading, isAuthenticated, isFirstTime, isBiometricEnabled, isPasskeyEnabled]);

  const handleAuthentication = async () => {
    setIsAuthenticating(true);
    
    try {
      let authenticated = false;
      
      // Try biometric first
      if (isBiometricEnabled) {
        setAuthMethod('biometric');
        authenticated = await authenticateWithBiometric();
      }
      
      // Fallback to passkey
      if (!authenticated && isPasskeyEnabled) {
        setAuthMethod('passkey');
        authenticated = await authenticateWithPasskey();
      }
      
      if (authenticated) {
        router.replace('/(tabs)');
      } else {
        Alert.alert(
          'Authentication Failed',
          'Please try again or use your wallet to re-authenticate',
          [
            { text: 'Retry', onPress: handleAuthentication },
            { text: 'Re-authenticate', onPress: () => router.replace('/auth') }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getAuthIcon = () => {
    if (authMethod === 'biometric') return '👆';
    if (authMethod === 'passkey') return '🔑';
    return '🔐';
  };

  const getAuthText = () => {
    if (authMethod === 'biometric') return 'Biometric Authentication';
    if (authMethod === 'passkey') return 'Passkey Authentication';
    return 'Security Check';
  };

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: tokens.color.bg.default,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={tokens.color.brand.primary} />
        <Text style={{
          color: tokens.color.fg.muted,
          fontSize: tokens.text.lg.size,
          marginTop: tokens.space['4']
        }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: tokens.color.bg.default,
      justifyContent: 'center',
      alignItems: 'center',
      padding: tokens.space['6']
    }}>
      <Text style={{
        fontSize: 64,
        marginBottom: tokens.space['6']
      }}>
        {getAuthIcon()}
      </Text>
      
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['4']
      }}>
        {getAuthText()}
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        {isAuthenticating 
          ? 'Please authenticate to continue' 
          : 'Tap to authenticate with your security method'
        }
      </Text>

      {!isAuthenticating && (
        <TouchableOpacity
          onPress={handleAuthentication}
          style={{
            backgroundColor: tokens.color.brand.primary,
            paddingVertical: tokens.space['4'],
            paddingHorizontal: tokens.space['8'],
            borderRadius: tokens.radius.lg,
            marginBottom: tokens.space['4']
          }}
        >
          <Text style={{
            color: tokens.color.fg.inverse,
            fontSize: tokens.text.lg.size,
            fontWeight: '600'
          }}>
            Authenticate
          </Text>
        </TouchableOpacity>
      )}

      {isAuthenticating && (
        <View style={{
          backgroundColor: tokens.color.fg.muted + '10',
          padding: tokens.space['4'],
          borderRadius: tokens.radius.lg,
          alignItems: 'center'
        }}>
          <ActivityIndicator size="small" color={tokens.color.brand.primary} />
          <Text style={{
            color: tokens.color.fg.muted,
            fontSize: tokens.text.sm.size,
            marginTop: tokens.space['2']
          }}>
            Authenticating...
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.replace('/auth')}
        style={{
          paddingVertical: tokens.space['3'],
          paddingHorizontal: tokens.space['4']
        }}
      >
        <Text style={{
          color: tokens.color.fg.muted,
          fontSize: tokens.text.lg.size
        }}>
          Use different method
        </Text>
      </TouchableOpacity>
    </View>
  );
}
