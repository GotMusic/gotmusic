/**
 * PasskeyPurchaseFlow - Seamless purchase flow with passkey transaction signing
 * 
 * This component demonstrates the ideal UX:
 * 1. User wants to buy music
 * 2. Passkey authentication (quick & secure)
 * 3. Transaction automatically signed with passkey
 * 4. Purchase completes without wallet app
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { tokens } from '@gotmusic/tokens/native';
import { usePasskeyTransaction } from '../../src/contexts/PasskeyTransactionContext';
import { usePurchaseService } from '../../src/services/blockchain/BlockchainServiceProvider';
import { useMultiCurrency } from '../../src/services/blockchain/BlockchainServiceProvider';

interface Asset {
  id: string;
  title: string;
  artist: string;
  price: number; // in PYUSD
  currency: string;
  description: string;
}

interface PasskeyPurchaseFlowProps {
  asset: Asset;
  onPurchaseComplete?: (transactionHash: string) => void;
  onPurchaseError?: (error: string) => void;
}

export function PasskeyPurchaseFlow({ 
  asset, 
  onPurchaseComplete, 
  onPurchaseError 
}: PasskeyPurchaseFlowProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('PYUSD');
  const [convertedPrice, setConvertedPrice] = useState(asset.price);
  
  const { 
    wallet, 
    isWalletLoaded, 
    isBiometricEnabled, 
    isPasskeyEnabled,
    signTransaction,
    getAddress 
  } = usePasskeyTransaction();
  
  const { initiatePurchase } = usePurchaseService();
  const { convertPrice, getSupportedCurrencies } = useMultiCurrency();

  // Convert price when currency changes
  React.useEffect(() => {
    if (selectedCurrency !== 'PYUSD') {
      convertPrice(asset.price, 'PYUSD', selectedCurrency)
        .then(price => setConvertedPrice(price))
        .catch(() => setConvertedPrice(asset.price));
    } else {
      setConvertedPrice(asset.price);
    }
  }, [selectedCurrency, asset.price]);

  const handlePurchase = async () => {
    if (!wallet || !isWalletLoaded) {
      Alert.alert('Wallet Required', 'Please set up your passkey wallet first');
      return;
    }

    if (!isBiometricEnabled && !isPasskeyEnabled) {
      Alert.alert(
        'Authentication Required', 
        'Please enable biometric or passkey authentication for secure transactions'
      );
      return;
    }

    try {
      setIsPurchasing(true);

      // Step 1: Create purchase intent
      const purchaseIntent = await initiatePurchase({
        assetId: asset.id,
        price: convertedPrice,
        currency: selectedCurrency,
        buyerAddress: getAddress()!,
      });

      // Step 2: Sign transaction with passkey (no wallet popup!)
      const signedTransaction = await signTransaction(
        {
          to: purchaseIntent.contractAddress,
          value: purchaseIntent.amount.toString(),
          data: purchaseIntent.transactionData,
          gasLimit: purchaseIntent.gasLimit,
          gasPrice: purchaseIntent.gasPrice,
        },
        `Purchase ${asset.title} by ${asset.artist}`
      );

      // Step 3: Submit signed transaction
      const result = await purchaseIntent.submitTransaction(signedTransaction.rawTransaction);

      // Step 4: Complete purchase
      onPurchaseComplete?.(result.transactionHash);
      
      Alert.alert(
        'Purchase Complete! 🎵',
        `You've successfully purchased "${asset.title}" by ${asset.artist} for ${convertedPrice} ${selectedCurrency}`
      );

    } catch (error) {
      console.error('Purchase failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Purchase failed';
      onPurchaseError?.(errorMessage);
      
      Alert.alert('Purchase Failed', errorMessage);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSetupWallet = () => {
    Alert.alert(
      'Setup Passkey Wallet',
      'This will create a secure wallet that uses your device\'s biometric authentication for all transactions. No external wallet apps needed!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Setup', onPress: () => {
          // Navigate to wallet setup
          // This would typically navigate to a setup screen
        }}
      ]
    );
  };

  const handleEnableBiometric = () => {
    Alert.alert(
      'Enable Biometric Authentication',
      'This will allow you to sign transactions using your fingerprint or face ID instead of external wallet apps.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enable', onPress: () => {
          // Enable biometric authentication
          // This would call the context method
        }}
      ]
    );
  };

  if (!isWalletLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.setupCard}>
          <Text style={styles.setupTitle}>🔐 Setup Passkey Wallet</Text>
          <Text style={styles.setupDescription}>
            Create a secure wallet that uses your device's biometric authentication for all transactions. No external wallet apps needed!
          </Text>
          <TouchableOpacity style={styles.setupButton} onPress={handleSetupWallet}>
            <Text style={styles.setupButtonText}>Setup Passkey Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!isBiometricEnabled && !isPasskeyEnabled) {
    return (
      <View style={styles.container}>
        <View style={styles.setupCard}>
          <Text style={styles.setupTitle}>🔒 Enable Secure Authentication</Text>
          <Text style={styles.setupDescription}>
            Enable biometric or passkey authentication to sign transactions securely without external wallet apps.
          </Text>
          <TouchableOpacity style={styles.setupButton} onPress={handleEnableBiometric}>
            <Text style={styles.setupButtonText}>Enable Biometric Auth</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Asset Info */}
      <View style={styles.assetCard}>
        <Text style={styles.assetTitle}>{asset.title}</Text>
        <Text style={styles.assetArtist}>by {asset.artist}</Text>
        <Text style={styles.assetDescription}>{asset.description}</Text>
      </View>

      {/* Price Display */}
      <View style={styles.priceCard}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.priceAmount}>
          {convertedPrice} {selectedCurrency}
        </Text>
        {selectedCurrency !== 'PYUSD' && (
          <Text style={styles.priceOriginal}>
            (${asset.price} PYUSD)
          </Text>
        )}
      </View>

      {/* Currency Selection */}
      <View style={styles.currencyCard}>
        <Text style={styles.currencyLabel}>Pay with</Text>
        <View style={styles.currencyOptions}>
          {getSupportedCurrencies().map((currency) => (
            <TouchableOpacity
              key={currency}
              style={[
                styles.currencyOption,
                selectedCurrency === currency && styles.currencyOptionSelected
              ]}
              onPress={() => setSelectedCurrency(currency)}
            >
              <Text style={[
                styles.currencyOptionText,
                selectedCurrency === currency && styles.currencyOptionTextSelected
              ]}>
                {currency}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Security Info */}
      <View style={styles.securityCard}>
        <Text style={styles.securityTitle}>🔐 Secure Transaction</Text>
        <Text style={styles.securityDescription}>
          This transaction will be signed using your {isBiometricEnabled ? 'biometric' : 'passkey'} authentication. No external wallet apps needed!
        </Text>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity
        style={[styles.purchaseButton, isPurchasing && styles.purchaseButtonDisabled]}
        onPress={handlePurchase}
        disabled={isPurchasing}
      >
        {isPurchasing ? (
          <ActivityIndicator color={tokens.color.fg.inverse} />
        ) : (
          <Text style={styles.purchaseButtonText}>
            Buy with {isBiometricEnabled ? 'Biometric' : 'Passkey'} Auth
          </Text>
        )}
      </TouchableOpacity>

      {/* Wallet Address */}
      <Text style={styles.walletAddress}>
        Wallet: {getAddress()?.slice(0, 6)}...{getAddress()?.slice(-4)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: tokens.space['4'],
    backgroundColor: tokens.color.bg.default,
  },
  setupCard: {
    backgroundColor: tokens.color.bg.subtle,
    padding: tokens.space['6'],
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
    marginBottom: tokens.space['4'],
  },
  setupTitle: {
    fontSize: tokens.text['2xl'].size,
    fontWeight: 'bold',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['3'],
    textAlign: 'center',
  },
  setupDescription: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.fg.muted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: tokens.space['6'],
  },
  setupButton: {
    backgroundColor: tokens.color.brand.primary,
    paddingVertical: tokens.space['4'],
    paddingHorizontal: tokens.space['6'],
    borderRadius: tokens.radius.lg,
  },
  setupButtonText: {
    color: tokens.color.fg.inverse,
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
  },
  assetCard: {
    backgroundColor: tokens.color.bg.subtle,
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space['4'],
  },
  assetTitle: {
    fontSize: tokens.text['2xl'].size,
    fontWeight: 'bold',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['2'],
  },
  assetArtist: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.fg.muted,
    marginBottom: tokens.space['3'],
  },
  assetDescription: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    lineHeight: 20,
  },
  priceCard: {
    backgroundColor: tokens.color.bg.subtle,
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
    marginBottom: tokens.space['4'],
  },
  priceLabel: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    marginBottom: tokens.space['2'],
  },
  priceAmount: {
    fontSize: tokens.text['3xl'].size,
    fontWeight: 'bold',
    color: tokens.color.brand.primary,
    marginBottom: tokens.space['1'],
  },
  priceOriginal: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
  },
  currencyCard: {
    backgroundColor: tokens.color.bg.subtle,
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space['4'],
  },
  currencyLabel: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    marginBottom: tokens.space['3'],
  },
  currencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.space['2'],
  },
  currencyOption: {
    paddingVertical: tokens.space['2'],
    paddingHorizontal: tokens.space['4'],
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.default,
  },
  currencyOptionSelected: {
    backgroundColor: tokens.color.brand.primary,
    borderColor: tokens.color.brand.primary,
  },
  currencyOptionText: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.default,
  },
  currencyOptionTextSelected: {
    color: tokens.color.fg.inverse,
  },
  securityCard: {
    backgroundColor: tokens.color.bg.subtle,
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space['6'],
  },
  securityTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['2'],
  },
  securityDescription: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    lineHeight: 20,
  },
  purchaseButton: {
    backgroundColor: tokens.color.brand.primary,
    paddingVertical: tokens.space['4'],
    paddingHorizontal: tokens.space['6'],
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
    marginBottom: tokens.space['4'],
  },
  purchaseButtonDisabled: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    color: tokens.color.fg.inverse,
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
  },
  walletAddress: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    textAlign: 'center',
  },
});
