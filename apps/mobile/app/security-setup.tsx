import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { tokens } from '@gotmusic/tokens/native';
import { useBiometric } from './contexts/BiometricContext';
import { usePasskey } from './contexts/PasskeyContext';

export default function SecuritySetupScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [passkeyEnabled, setPasskeyEnabled] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  
  const { 
    isBiometricAvailable, 
    isBiometricEnabled, 
    enableBiometric, 
    biometricType 
  } = useBiometric();
  
  const { 
    isPasskeyAvailable, 
    isPasskeyEnabled, 
    createPasskey, 
    enablePasskey 
  } = usePasskey();

  const handleBiometricToggle = async () => {
    if (biometricEnabled) {
      setBiometricEnabled(false);
    } else {
      setIsSettingUp(true);
      try {
        const success = await enableBiometric();
        if (success) {
          setBiometricEnabled(true);
          Alert.alert('Success', 'Biometric authentication enabled');
        } else {
          Alert.alert('Error', 'Failed to enable biometric authentication');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to enable biometric authentication');
      } finally {
        setIsSettingUp(false);
      }
    }
  };

  const handlePasskeyToggle = async () => {
    if (passkeyEnabled) {
      setPasskeyEnabled(false);
    } else {
      setIsSettingUp(true);
      try {
        const success = await createPasskey('mock_wallet_address');
        if (success) {
          setPasskeyEnabled(true);
          Alert.alert('Success', 'Passkey authentication enabled');
        } else {
          Alert.alert('Error', 'Failed to enable passkey authentication');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to enable passkey authentication');
      } finally {
        setIsSettingUp(false);
      }
    }
  };

  const continueToApp = () => {
    router.replace('/(tabs)');
  };

  const getBiometricIcon = () => {
    if (biometricType.includes(1)) return '👆'; // Fingerprint
    if (biometricType.includes(2)) return '👁️'; // Face ID
    if (biometricType.includes(3)) return '👁️'; // Face ID
    return '🔐'; // Generic
  };

  return (
    <ScrollView style={{ 
      flex: 1, 
      backgroundColor: tokens.color.bg.default 
    }}>
      <View style={{ 
        flex: 1, 
        padding: tokens.space['6']
      }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{
            fontSize: tokens.text['display-sm'].size,
            fontWeight: 'bold',
            color: tokens.color.fg.default,
            textAlign: 'center',
            marginBottom: tokens.space['6']
          }}>
            Secure Your Account
          </Text>
          
          <Text style={{
            fontSize: tokens.text.lg.size,
            color: tokens.color.fg.muted,
            textAlign: 'center',
            marginBottom: tokens.space['8'],
            lineHeight: 24
          }}>
            Add an extra layer of security to protect your wallet and assets. You can enable one or both options.
          </Text>

          {/* Biometric Option */}
          {isBiometricAvailable && (
            <TouchableOpacity
              onPress={handleBiometricToggle}
              disabled={isSettingUp}
              style={{
                backgroundColor: biometricEnabled ? tokens.color.brand.primary : tokens.color.fg.muted + '20',
                paddingVertical: tokens.space['6'],
                paddingHorizontal: tokens.space['6'],
                borderRadius: tokens.radius.lg,
                marginBottom: tokens.space['6'],
                alignItems: 'center',
                borderWidth: 1,
                borderColor: biometricEnabled ? tokens.color.brand.primary : tokens.color.border.subtle
              }}
            >
              <Text style={{
                fontSize: 48,
                marginBottom: tokens.space['3']
              }}>
                {getBiometricIcon()}
              </Text>
              <Text style={{
                color: biometricEnabled ? tokens.color.fg.inverse : tokens.color.fg.default,
                fontSize: tokens.text.lg.size,
                fontWeight: '600',
                marginBottom: tokens.space['2']
              }}>
                {biometricEnabled ? '✅ Biometric Enabled' : '🔐 Enable Biometric'}
              </Text>
              <Text style={{
                color: biometricEnabled ? tokens.color.fg.inverse + '80' : tokens.color.fg.muted,
                fontSize: tokens.text.sm.size,
                textAlign: 'center'
              }}>
                {biometricEnabled 
                  ? 'Quick access with your biometric' 
                  : 'Use your fingerprint or face to unlock'
                }
              </Text>
            </TouchableOpacity>
          )}

          {/* Passkey Option */}
          {isPasskeyAvailable && (
            <TouchableOpacity
              onPress={handlePasskeyToggle}
              disabled={isSettingUp}
              style={{
                backgroundColor: passkeyEnabled ? tokens.color.brand.primary : tokens.color.fg.muted + '20',
                paddingVertical: tokens.space['6'],
                paddingHorizontal: tokens.space['6'],
                borderRadius: tokens.radius.lg,
                marginBottom: tokens.space['8'],
                alignItems: 'center',
                borderWidth: 1,
                borderColor: passkeyEnabled ? tokens.color.brand.primary : tokens.color.border.subtle
              }}
            >
              <Text style={{
                fontSize: 48,
                marginBottom: tokens.space['3']
              }}>
                🔑
              </Text>
              <Text style={{
                color: passkeyEnabled ? tokens.color.fg.inverse : tokens.color.fg.default,
                fontSize: tokens.text.lg.size,
                fontWeight: '600',
                marginBottom: tokens.space['2']
              }}>
                {passkeyEnabled ? '✅ Passkey Enabled' : '🔑 Enable Passkey'}
              </Text>
              <Text style={{
                color: passkeyEnabled ? tokens.color.fg.inverse + '80' : tokens.color.fg.muted,
                fontSize: tokens.text.sm.size,
                textAlign: 'center'
              }}>
                {passkeyEnabled 
                  ? 'Secure authentication with passkey' 
                  : 'Use passkey for secure authentication'
                }
              </Text>
            </TouchableOpacity>
          )}

          {isSettingUp && (
            <View style={{
              backgroundColor: tokens.color.fg.muted + '10',
              padding: tokens.space['4'],
              borderRadius: tokens.radius.lg,
              marginBottom: tokens.space['6'],
              alignItems: 'center'
            }}>
              <Text style={{
                color: tokens.color.fg.muted,
                fontSize: tokens.text.sm.size,
                textAlign: 'center'
              }}>
                Setting up security...
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={continueToApp}
            style={{
              backgroundColor: tokens.color.brand.primary,
              paddingVertical: tokens.space['4'],
              paddingHorizontal: tokens.space['6'],
              borderRadius: tokens.radius.lg,
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: tokens.color.fg.inverse,
              fontSize: tokens.text.lg.size,
              fontWeight: '600'
            }}>
              Continue to App
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={continueToApp}
            style={{
              paddingVertical: tokens.space['3'],
              alignItems: 'center',
              marginTop: tokens.space['4']
            }}
          >
            <Text style={{
              color: tokens.color.fg.muted,
              fontSize: tokens.text.lg.size
            }}>
              Skip security setup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
