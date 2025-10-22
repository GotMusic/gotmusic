/**
 * Comprehensive Authentication Flow Component
 * 
 * Supports all authentication methods:
 * - External wallets (MetaMask, Coinbase, WalletConnect)
 * - Embedded wallets (automatic creation)
 * - Traditional auth (email, phone, Google, Apple)
 * - Passkey authentication
 * 
 * Works for both web and mobile platforms
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '@gotmusic/tokens/native';
import { usePrivyAuth } from '../src/contexts/PrivyAuthContext';

interface ComprehensiveAuthFlowProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function ComprehensiveAuthFlow({ onComplete, onSkip }: ComprehensiveAuthFlowProps) {
  const [selectedMethod, setSelectedMethod] = useState<'external' | 'embedded' | 'traditional' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    login, 
    logout, 
    connectWallet, 
    createEmbeddedWallet,
    isAuthenticated,
    isLoading: privyLoading,
    error 
  } = usePrivyAuth();

  const handleExternalWallet = async () => {
    try {
      setIsLoading(true);
      await connectWallet();
      onComplete?.();
    } catch (error) {
      Alert.alert('Connection Failed', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmbeddedWallet = async () => {
    try {
      setIsLoading(true);
      await createEmbeddedWallet();
      onComplete?.();
    } catch (error) {
      Alert.alert('Setup Failed', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTraditionalAuth = async () => {
    try {
      setIsLoading(true);
      await login();
      onComplete?.();
    } catch (error) {
      Alert.alert('Authentication Failed', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMethodSelection = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Choose Your Authentication Method
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Select how you'd like to authenticate and access your wallet
      </Text>

      <View style={{ gap: tokens.space['4'] }}>
        {/* External Wallets */}
        <TouchableOpacity
          onPress={() => setSelectedMethod('external')}
          style={{
            backgroundColor: tokens.color.bg.default,
            padding: tokens.space['4'],
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: tokens.color.border.subtle
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginRight: tokens.space['3'] }}>🔗</Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: tokens.text.lg.size,
                fontWeight: '600',
                color: tokens.color.fg.default
              }}>
                External Wallets
              </Text>
              <Text style={{
                fontSize: tokens.text.sm.size,
                color: tokens.color.fg.muted
              }}>
                Connect MetaMask, Coinbase Wallet, or WalletConnect
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Embedded Wallets */}
        <TouchableOpacity
          onPress={() => setSelectedMethod('embedded')}
          style={{
            backgroundColor: tokens.color.bg.default,
            padding: tokens.space['4'],
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: tokens.color.border.subtle
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginRight: tokens.space['3'] }}>💳</Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: tokens.text.lg.size,
                fontWeight: '600',
                color: tokens.color.fg.default
              }}>
                Embedded Wallet
              </Text>
              <Text style={{
                fontSize: tokens.text.sm.size,
                color: tokens.color.fg.muted
              }}>
                Create a new wallet automatically
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Traditional Auth */}
        <TouchableOpacity
          onPress={() => setSelectedMethod('traditional')}
          style={{
            backgroundColor: tokens.color.bg.default,
            padding: tokens.space['4'],
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: tokens.color.border.subtle
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginRight: tokens.space['3'] }}>📧</Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: tokens.text.lg.size,
                fontWeight: '600',
                color: tokens.color.fg.default
              }}>
                Email & Social Login
              </Text>
              <Text style={{
                fontSize: tokens.text.sm.size,
                color: tokens.color.fg.muted
              }}>
                Sign in with email, Google, Apple, or phone
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={onSkip}
        style={{
          paddingVertical: tokens.space['3'],
          alignItems: 'center',
          marginTop: tokens.space['6']
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
  );

  const renderExternalWallets = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Connect External Wallet
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Connect your existing wallet to access GotMusic
      </Text>

      <TouchableOpacity
        onPress={handleExternalWallet}
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
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelectedMethod(null)}
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
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmbeddedWallet = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Create Embedded Wallet
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        We'll create a new wallet for you automatically. You can always connect an external wallet later.
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
          What you'll get:
        </Text>
        <View style={{ gap: tokens.space['2'] }}>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Secure embedded wallet
          </Text>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Easy recovery options
          </Text>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • No external app required
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleEmbeddedWallet}
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
          {isLoading ? 'Creating...' : 'Create Embedded Wallet'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelectedMethod(null)}
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
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderTraditionalAuth = () => (
    <View style={{ flex: 1, justifyContent: 'center', padding: tokens.space['4'] }}>
      <Text style={{
        fontSize: tokens.text['display-sm'].size,
        fontWeight: 'bold',
        color: tokens.color.fg.default,
        textAlign: 'center',
        marginBottom: tokens.space['6']
      }}>
        Sign In or Create Account
      </Text>
      
      <Text style={{
        fontSize: tokens.text.lg.size,
        color: tokens.color.fg.muted,
        textAlign: 'center',
        marginBottom: tokens.space['8'],
        lineHeight: 24
      }}>
        Use your email, phone, Google, Apple, or other social accounts to sign in
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
          Available sign-in methods:
        </Text>
        <View style={{ gap: tokens.space['2'] }}>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Email and password
          </Text>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Phone number (SMS)
          </Text>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Google account
          </Text>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Apple ID
          </Text>
          <Text style={{ fontSize: tokens.text.sm.size, color: tokens.color.fg.default }}>
            • Passkey authentication
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleTraditionalAuth}
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
          {isLoading ? 'Signing in...' : 'Sign In / Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelectedMethod(null)}
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
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isAuthenticated) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: tokens.color.bg.default,
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.space['4']
      }}>
        <Text style={{
          fontSize: 64,
          marginBottom: tokens.space['4']
        }}>
          ✅
        </Text>
        <Text style={{
          fontSize: tokens.text['display-sm'].size,
          fontWeight: 'bold',
          color: tokens.color.fg.default,
          textAlign: 'center',
          marginBottom: tokens.space['4']
        }}>
          Authentication Complete!
        </Text>
        <TouchableOpacity
          onPress={onComplete}
          style={{
            backgroundColor: tokens.color.brand.primary,
            paddingVertical: tokens.space['4'],
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
            Continue to GotMusic
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: tokens.color.bg.default 
    }}>
      <ScrollView style={{ flex: 1 }}>
        {!selectedMethod && renderMethodSelection()}
        {selectedMethod === 'external' && renderExternalWallets()}
        {selectedMethod === 'embedded' && renderEmbeddedWallet()}
        {selectedMethod === 'traditional' && renderTraditionalAuth()}
      </ScrollView>
    </SafeAreaView>
  );
}
