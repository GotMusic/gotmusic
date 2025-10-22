/**
 * Enhanced Authentication Flow Component
 * 
 * Provides a comprehensive authentication experience combining:
 * - Wallet connection (primary identity)
 * - Passkey creation (cryptographic proof)
 * - Biometric setup (convenience layer)
 * 
 * Flow:
 * 1. Connect wallet
 * 2. Create passkey for security
 * 3. Optionally enable biometrics
 * 4. Smart authentication for future logins
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '@gotmusic/tokens/native';
import { useEnhancedAuth } from '../../src/contexts/EnhancedAuthContext';
import { useWalletService } from '../../src/services/blockchain/BlockchainServiceProvider';

interface EnhancedAuthFlowProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function EnhancedAuthFlow({ onComplete, onSkip }: EnhancedAuthFlowProps) {
  const [currentStep, setCurrentStep] = useState<'wallet' | 'passkey' | 'biometric' | 'complete'>('wallet');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    loginWithWallet, 
    createPasskey, 
    enableBiometric,
    hasPasskey,
    hasBiometric,
    isBiometricAvailable,
    walletAddress,
    setFirstTimeComplete
  } = useEnhancedAuth();
  
  const { connectWallet, getProviders } = useWalletService();
  const providers = getProviders();

  const handleWalletConnection = async (providerId: string) => {
    try {
      setIsLoading(true);
      
      const account = await connectWallet(providerId);
      await loginWithWallet(account.address, providerId);
      
      setCurrentStep('passkey');
    } catch (error) {
      Alert.alert('Connection Failed', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyCreation = async () => {
    try {
      setIsLoading(true);
      
      if (!walletAddress) {
        throw new Error('No wallet connected');
      }
      
      const success = await createPasskey(walletAddress);
      if (success) {
        setCurrentStep('biometric');
      } else {
        Alert.alert('Passkey Creation Failed', 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create passkey');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricSetup = async () => {
    try {
      setIsLoading(true);
      
      const success = await enableBiometric();
      if (success) {
        setCurrentStep('complete');
      } else {
        Alert.alert('Biometric Setup Failed', 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to enable biometric authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipBiometric = () => {
    setCurrentStep('complete');
  };

  const handleComplete = async () => {
    try {
      await setFirstTimeComplete();
      onComplete?.();
    } catch (error) {
      console.error('Failed to complete setup:', error);
    }
  };

  const renderWalletStep = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Connect Your Wallet
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Connect your wallet to start buying and selling music on GotMusic. This will be your primary identity.
      </Text>

      <View style={{ gap: tokens.space['4'] }}>
        {providers.map((provider) => (
          <TouchableOpacity
            key={provider.id}
            onPress={() => handleWalletConnection(provider.id)}
            disabled={isLoading}
            style={{
              backgroundColor: tokens.color.bg.default,
              padding: tokens.space['4'],
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: tokens.color.border.subtle,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            <Text style={{ fontSize: 24, marginRight: tokens.space['3'] }}>
              {provider.icon}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: tokens.text.lg.size,
                fontWeight: '600',
                color: tokens.color.fg.default
              }}>
                {provider.name}
              </Text>
              <Text style={{
                fontSize: tokens.text.sm.size,
                color: tokens.color.fg.muted
              }}>
                {provider.description}
              </Text>
            </View>
            {isLoading && (
              <ActivityIndicator size="small" color={tokens.color.brand.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPasskeyStep = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Create Passkey
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Create a passkey for your wallet address. This provides cryptographic proof of ownership and enables secure authentication.
      </Text>

      <View style={{
        backgroundColor: tokens.color.brand.primary + '10',
        padding: tokens.space['4'],
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: tokens.color.brand.primary + '30',
        marginBottom: tokens.space['6']
      }}>
        <Text style={{
          fontSize: tokens.text.sm.size,
          color: tokens.color.brand.primary,
          fontWeight: '600',
          marginBottom: tokens.space['2']
        }}>
          Wallet Address
        </Text>
        <Text style={{
          fontSize: tokens.text.sm.size,
          color: tokens.color.fg.default,
          fontFamily: 'monospace'
        }}>
          {walletAddress}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handlePasskeyCreation}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? tokens.color.fg.muted : tokens.color.brand.primary,
          paddingVertical: tokens.space['4'],
          paddingHorizontal: tokens.space['6'],
          borderRadius: tokens.radius.lg,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        {isLoading && (
          <ActivityIndicator 
            size="small" 
            color={tokens.color.fg.inverse} 
            style={{ marginRight: tokens.space['2'] }}
          />
        )}
        <Text style={{
          color: tokens.color.fg.inverse,
          fontSize: tokens.text.lg.size,
          fontWeight: '600'
        }}>
          {isLoading ? 'Creating Passkey...' : 'Create Passkey'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBiometricStep = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Enable Biometric Authentication
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Enable biometric authentication for quick and secure access to your account. You can always use your passkey as a fallback.
      </Text>

      {isBiometricAvailable ? (
        <View style={{ gap: tokens.space['4'] }}>
          <TouchableOpacity
            onPress={handleBiometricSetup}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? tokens.color.fg.muted : tokens.color.brand.primary,
              paddingVertical: tokens.space['4'],
              paddingHorizontal: tokens.space['6'],
              borderRadius: tokens.radius.lg,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            {isLoading && (
              <ActivityIndicator 
                size="small" 
                color={tokens.color.fg.inverse} 
                style={{ marginRight: tokens.space['2'] }}
              />
            )}
            <Text style={{
              color: tokens.color.fg.inverse,
              fontSize: tokens.text.lg.size,
              fontWeight: '600'
            }}>
              {isLoading ? 'Setting up...' : 'Enable Biometric'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSkipBiometric}
            style={{
              paddingVertical: tokens.space['3'],
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: tokens.color.fg.muted,
              fontSize: tokens.text.lg.size
            }}>
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{
          backgroundColor: tokens.color.fg.muted + '10',
          padding: tokens.space['4'],
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: tokens.color.fg.muted + '30'
        }}>
          <Text style={{
            fontSize: tokens.text.sm.size,
            color: tokens.color.fg.muted,
            textAlign: 'center'
          }}>
            Biometric authentication is not available on this device.
          </Text>
          
          <TouchableOpacity
            onPress={handleSkipBiometric}
            style={{
              backgroundColor: tokens.color.brand.primary,
              paddingVertical: tokens.space['3'],
              paddingHorizontal: tokens.space['6'],
              borderRadius: tokens.radius.lg,
              alignItems: 'center',
              marginTop: tokens.space['4']
            }}
          >
            <Text style={{
              color: tokens.color.fg.inverse,
              fontSize: tokens.text.lg.size,
              fontWeight: '600'
            }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderCompleteStep = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: 64,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        🎉
      </Text>
      
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['4']
      }}>
        Setup Complete!
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Your account is now secured with wallet connection, passkey authentication, and optional biometric access.
      </Text>

      <View style={{
        backgroundColor: tokens.color.bg.default,
        padding: tokens.space['4'],
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: tokens.color.border.subtle,
        marginBottom: tokens.space['6']
      }}>
        <Text style={{
          fontSize: tokens.text.sm.size,
          color: tokens.color.fg.default,
          fontWeight: '600',
          marginBottom: tokens.space['3']
        }}>
          Security Features Enabled:
        </Text>
        
        <View style={{ gap: tokens.space['2'] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginRight: tokens.space['2'] }}>🔗</Text>
            <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
              Wallet Connection
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginRight: tokens.space['2'] }}>🔑</Text>
            <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
              Passkey Authentication
            </Text>
          </View>
          
          {hasBiometric && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: tokens.space['2'] }}>👆</Text>
              <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
                Biometric Authentication
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleComplete}
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
          Start Using GotMusic
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: tokens.color.bg.default 
    }}>
      <ScrollView style={{ flex: 1 }}>
        {currentStep === 'wallet' && renderWalletStep()}
        {currentStep === 'passkey' && renderPasskeyStep()}
        {currentStep === 'biometric' && renderBiometricStep()}
        {currentStep === 'complete' && renderCompleteStep()}
      </ScrollView>
    </SafeAreaView>
  );
}
