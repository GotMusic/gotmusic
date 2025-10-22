import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { tokens } from '@gotmusic/tokens/native';
import { useAuth } from '../src/contexts/AuthContext';

export default function AuthScreen() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { login } = useAuth();

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    
    try {
      // TODO: Integrate with real wallet connection (WalletConnect, MetaMask, etc.)
      // For now, simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate wallet address
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9e2a3C4C5C6C7';
      await login(mockAddress);
      
      // Navigate to security setup
      router.replace('/security-setup');
      
    } catch (error) {
      Alert.alert('Connection Failed', 'Please try again');
      setIsConnecting(false);
    }
  };

  const handleSkipAuth = () => {
    Alert.alert(
      'Skip Authentication',
      'You can skip wallet connection for now, but you won\'t be able to buy or sell music.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Skip', 
          onPress: () => router.replace('/(tabs)'),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: tokens.color.bg.default,
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
          Connect Your Wallet
        </Text>
        
        <Text style={{
          fontSize: tokens.text.lg.size,
          color: tokens.color.fg.muted,
          textAlign: 'center',
          marginBottom: tokens.space['8'],
          lineHeight: 24
        }}>
          Connect your wallet to start buying and selling music on GotMusic. You'll need PYUSD for transactions.
        </Text>

        <View style={{
          backgroundColor: tokens.color.fg.muted + '10',
          padding: tokens.space['6'],
          borderRadius: tokens.radius.lg,
          marginBottom: tokens.space['8'],
          borderWidth: 1,
          borderColor: tokens.color.border.subtle
        }}>
          <Text style={{
            fontSize: tokens.text.sm.size,
            color: tokens.color.fg.muted,
            textAlign: 'center',
            marginBottom: tokens.space['4']
          }}>
            Supported Wallets
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['MetaMask', 'WalletConnect', 'Coinbase Wallet', 'Trust Wallet'].map((wallet) => (
              <View key={wallet} style={{
                backgroundColor: tokens.color.bg.default,
                paddingVertical: tokens.space['2'],
                paddingHorizontal: tokens.space['3'],
                borderRadius: tokens.radius.md,
                margin: tokens.space['1'],
                borderWidth: 1,
                borderColor: tokens.color.border.subtle
              }}>
                <Text style={{
                  fontSize: tokens.text.sm.size,
                  color: tokens.color.fg.default
                }}>
                  {wallet}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleWalletConnect}
          disabled={isConnecting}
          style={{
            backgroundColor: isConnecting ? tokens.color.fg.muted : tokens.color.brand.primary,
            paddingVertical: tokens.space['4'],
            paddingHorizontal: tokens.space['6'],
            borderRadius: tokens.radius.lg,
            alignItems: 'center',
            marginBottom: tokens.space['4'],
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          {isConnecting && (
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
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSkipAuth}
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
    </View>
  );
}
