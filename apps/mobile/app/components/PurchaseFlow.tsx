/**
 * Purchase Flow Component
 *
 * Demonstrates the complete multi-currency purchase flow
 * Shows PYUSD anchor pricing, currency selection, and blockchain integration
 *
 * Features:
 * - Multi-currency pricing display
 * - Currency selection interface
 * - Real-time price conversion
 * - Purchase flow status tracking
 * - Blockscout transaction links
 * - License receipt display
 */

import { tokens } from "@gotmusic/tokens/native";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useBlockscoutService,
  useMultiCurrencyService,
  usePurchaseService,
  useWalletService,
} from "../../src/services/blockchain/BlockchainServiceProvider";
import { WalletConnectionModal } from "./WalletConnectionModal";

interface PurchaseFlowProps {
  assetId: string;
  assetTitle: string;
  assetArtist: string;
  onComplete?: (purchaseFlow: any) => void;
  onCancel?: () => void;
}

export default function PurchaseFlow({
  assetId,
  assetTitle,
  assetArtist,
  onComplete,
  onCancel,
}: PurchaseFlowProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("pyusd");
  const [purchaseFlow, setPurchaseFlow] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Blockchain services
  const { getAssetPricing, getSupportedCurrencies } = useMultiCurrencyService();
  const { initiatePurchase, getPurchaseStatus } = usePurchaseService();
  const { isConnected: isWalletConnected, currentAccount } = useWalletService();
  const { getExplorerUrl } = useBlockscoutService();

  // State for pricing and currencies
  const [assetPricing, setAssetPricing] = useState<any>(null);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssetPricing();
    loadCurrencies();
  }, [assetId]);

  const loadAssetPricing = async () => {
    try {
      const pricing = await getAssetPricing(assetId);
      setAssetPricing(pricing);
    } catch (error) {
      console.error("Failed to load asset pricing:", error);
    }
  };

  const loadCurrencies = async () => {
    try {
      const supportedCurrencies = getSupportedCurrencies();
      setCurrencies(supportedCurrencies);
    } catch (error) {
      console.error("Failed to load currencies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isWalletConnected || !currentAccount) {
      setShowWalletModal(true);
      return;
    }

    try {
      setIsPurchasing(true);

      const purchaseRequest = {
        assetId,
        buyerAddress: currentAccount.address,
        buyerCurrency: selectedCurrency,
        amount: getSelectedCurrencyPrice(),
        metadata: {
          title: assetTitle,
          artist: assetArtist,
          duration: 180, // 3 minutes
          genre: "Hip Hop",
        },
      };

      const flow = await initiatePurchase(purchaseRequest);
      setPurchaseFlow(flow);

      // Monitor purchase flow
      monitorPurchaseFlow(flow.id);
    } catch (error) {
      console.error("Purchase failed:", error);
      Alert.alert("Purchase Failed", "Please try again");
    } finally {
      setIsPurchasing(false);
    }
  };

  const monitorPurchaseFlow = async (flowId: string) => {
    const interval = setInterval(async () => {
      try {
        const flow = await getPurchaseStatus(flowId);
        setPurchaseFlow(flow);

        if (flow.status === "completed") {
          clearInterval(interval);
          onComplete?.(flow);
        } else if (flow.status === "failed") {
          clearInterval(interval);
          Alert.alert("Purchase Failed", flow.error || "Unknown error");
        }
      } catch (error) {
        console.error("Failed to monitor purchase flow:", error);
      }
    }, 2000);
  };

  const getSelectedCurrencyPrice = (): string => {
    if (!assetPricing) return "0";

    const currencyPrice = assetPricing.currencyPrices.find(
      (cp: any) => cp.currency.id === selectedCurrency,
    );

    return currencyPrice?.price || "0";
  };

  const getSelectedCurrencySymbol = (): string => {
    const currency = currencies.find((c) => c.id === selectedCurrency);
    return currency?.symbol || "PYUSD";
  };

  const getPurchaseStatusText = (): string => {
    if (!purchaseFlow) return "";

    const statusMap: Record<string, string> = {
      initiated: "Initializing purchase...",
      pricing_calculated: "Calculating pricing...",
      intent_created: "Creating payment intent...",
      transaction_signed: "Signing transaction...",
      bridging: "Bridging to Base network...",
      executed: "Executing purchase...",
      attestation_created: "Creating license receipt...",
      access_granted: "Granting asset access...",
      completed: "Purchase completed!",
      failed: "Purchase failed",
    };

    return statusMap[purchaseFlow.status] || "Processing...";
  };

  const getPurchaseStatusColor = (): string => {
    if (!purchaseFlow) return tokens.color.fg.muted;

    if (purchaseFlow.status === "completed") return tokens.color.palette.semantic.success;
    if (purchaseFlow.status === "failed") return tokens.color.palette.semantic.danger;
    return tokens.color.brand.primary;
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.color.bg.default,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={tokens.color.brand.primary} />
        <Text
          style={{
            color: tokens.color.fg.muted,
            marginTop: tokens.space["4"],
          }}
        >
          Loading pricing...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: tokens.color.bg.default,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            padding: tokens.space["4"],
            borderBottomColor: tokens.color.border.subtle,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: tokens.text["display-sm"].size,
              fontWeight: "bold",
              color: tokens.color.fg.default,
              marginBottom: tokens.space["2"],
            }}
          >
            {assetTitle}
          </Text>
          <Text
            style={{
              fontSize: tokens.text.lg.size,
              color: tokens.color.fg.muted,
            }}
          >
            by {assetArtist}
          </Text>
        </View>

        {/* PYUSD Anchor Price */}
        <View
          style={{
            padding: tokens.space["4"],
            backgroundColor: tokens.color.brand.primary + "10",
            margin: tokens.space["4"],
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: tokens.color.brand.primary + "30",
          }}
        >
          <Text
            style={{
              fontSize: tokens.text.sm.size,
              color: tokens.color.brand.primary,
              fontWeight: "600",
              marginBottom: tokens.space["2"],
            }}
          >
            PYUSD Anchor Price
          </Text>
          <Text
            style={{
              fontSize: tokens.text["display-sm"].size,
              fontWeight: "bold",
              color: tokens.color.fg.default,
            }}
          >
            ${assetPricing?.pyusdPrice || "0.00"} PYUSD
          </Text>
          <Text
            style={{
              fontSize: tokens.text.sm.size,
              color: tokens.color.fg.muted,
              marginTop: tokens.space["1"],
            }}
          >
            Stable pricing anchor for all currencies
          </Text>
        </View>

        {/* Currency Selection */}
        <View style={{ padding: tokens.space["4"] }}>
          <Text
            style={{
              fontSize: tokens.text.lg.size,
              fontWeight: "600",
              color: tokens.color.fg.default,
              marginBottom: tokens.space["4"],
            }}
          >
            Choose Payment Currency
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: tokens.space["2"] }}>
            {currencies.map((currency) => (
              <TouchableOpacity
                key={currency.id}
                onPress={() => setSelectedCurrency(currency.id)}
                style={{
                  backgroundColor:
                    selectedCurrency === currency.id
                      ? tokens.color.brand.primary
                      : tokens.color.bg.default,
                  paddingVertical: tokens.space["3"],
                  paddingHorizontal: tokens.space["4"],
                  borderRadius: tokens.radius.lg,
                  borderWidth: 1,
                  borderColor:
                    selectedCurrency === currency.id
                      ? tokens.color.brand.primary
                      : tokens.color.border.subtle,
                  flexDirection: "row",
                  alignItems: "center",
                  minWidth: 100,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: tokens.space["2"],
                  }}
                >
                  {currency.icon}
                </Text>
                <View>
                  <Text
                    style={{
                      color:
                        selectedCurrency === currency.id
                          ? tokens.color.fg.inverse
                          : tokens.color.fg.default,
                      fontWeight: "600",
                      fontSize: tokens.text.sm.size,
                    }}
                  >
                    {currency.symbol}
                  </Text>
                  <Text
                    style={{
                      color:
                        selectedCurrency === currency.id
                          ? tokens.color.fg.inverse
                          : tokens.color.fg.muted,
                      fontSize: tokens.text.xs.size,
                    }}
                  >
                    {getSelectedCurrencyPrice()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Purchase Button */}
        <View style={{ padding: tokens.space["4"] }}>
          <TouchableOpacity
            onPress={handlePurchase}
            disabled={isPurchasing || !isWalletConnected}
            style={{
              backgroundColor:
                isPurchasing || !isWalletConnected
                  ? tokens.color.fg.muted
                  : tokens.color.brand.primary,
              paddingVertical: tokens.space["4"],
              paddingHorizontal: tokens.space["6"],
              borderRadius: tokens.radius.lg,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {isPurchasing && (
              <ActivityIndicator
                size="small"
                color={tokens.color.fg.inverse}
                style={{ marginRight: tokens.space["2"] }}
              />
            )}
            <Text
              style={{
                color: tokens.color.fg.inverse,
                fontSize: tokens.text.lg.size,
                fontWeight: "600",
              }}
            >
              {isPurchasing
                ? "Processing..."
                : `Buy for ${getSelectedCurrencyPrice()} ${getSelectedCurrencySymbol()}`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Purchase Flow Status */}
        {purchaseFlow && (
          <View
            style={{
              padding: tokens.space["4"],
              backgroundColor: tokens.color.bg.default,
              borderTopColor: tokens.color.border.subtle,
              borderTopWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: tokens.text.lg.size,
                fontWeight: "600",
                color: tokens.color.fg.default,
                marginBottom: tokens.space["4"],
              }}
            >
              Purchase Status
            </Text>

            <View
              style={{
                backgroundColor: tokens.color.bg.default,
                padding: tokens.space["4"],
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: tokens.color.border.subtle,
              }}
            >
              <Text
                style={{
                  color: getPurchaseStatusColor(),
                  fontSize: tokens.text.lg.size,
                  fontWeight: "600",
                  marginBottom: tokens.space["2"],
                }}
              >
                {getPurchaseStatusText()}
              </Text>

              {purchaseFlow.transaction?.hash && (
                <TouchableOpacity
                  onPress={() => {
                    const explorerUrl = getExplorerUrl(purchaseFlow.transaction.hash);
                    // TODO: Open explorer URL
                    console.log("Explorer URL:", explorerUrl);
                  }}
                  style={{
                    backgroundColor: tokens.color.brand.primary + "10",
                    padding: tokens.space["3"],
                    borderRadius: tokens.radius.md,
                    marginTop: tokens.space["2"],
                  }}
                >
                  <Text
                    style={{
                      color: tokens.color.brand.primary,
                      fontSize: tokens.text.sm.size,
                      textAlign: "center",
                    }}
                  >
                    View on Blockscout
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        visible={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletConnected={(walletInfo) => {
          console.log("Wallet connected:", walletInfo);
          setShowWalletModal(false);
          // Retry purchase after wallet connection
          setTimeout(() => handlePurchase(), 1000);
        }}
        title="Connect Wallet to Purchase"
        description={`Connect your wallet to purchase "${assetTitle}" by ${assetArtist}`}
        showSkipOption={false}
      />
    </SafeAreaView>
  );
}
