import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { tokens } from '@gotmusic/tokens/native';
import { useEnhancedAuth } from '../src/contexts/EnhancedAuthContext';
import { useWalletService } from '../src/services/blockchain/BlockchainServiceProvider';

export default function AuthScreen() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { loginWithWallet } = useEnhancedAuth();
  const { connectWallet, getProviders } = useWalletService();
  const providers = getProviders();

  const handleWalletConnect = async (providerId: string) => {
    setIsConnecting(true);
    
    try {
      const account = await connectWallet(providerId);
      await loginWithWallet(account.address, providerId);
      
      // Navigate to enhanced auth flow
      router.replace('/enhanced-auth');
      
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

            <View style={{ gap: tokens.space['4'] }}>
              {providers.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  onPress={() => handleWalletConnect(provider.id)}
                  disabled={isConnecting}
                  style={{
                    backgroundColor: tokens.color.bg.default,
                    padding: tokens.space['4'],
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: tokens.color.border.subtle,
                    flexDirection: 'row',
                    alignItems: 'center',
                    opacity: isConnecting ? 0.6 : 1
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
                  {isConnecting && (
                    <ActivityIndicator size="small" color={tokens.color.brand.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

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
