/**
 * Multi-Currency Service
 *
 * Implements the core multi-currency pricing system with PYUSD as the stable anchor
 * Handles currency conversion, pricing display, and payment processing
 *
 * Core Value Proposition:
 * - Producers can set prices in multiple currencies (ETH, BTC, USDC, etc.)
 * - PYUSD serves as the stable pricing anchor for consistent value
 * - Buyers can pay in their preferred currency
 * - Avail Nexus handles cross-chain conversion to PYUSD for settlement
 */

import { createContext, useContext, useEffect, useState } from "react";

// Types for multi-currency system
export interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  chainId: number;
  contractAddress: string;
  decimals: number;
  isStable: boolean;
  isAnchor: boolean; // PYUSD is the anchor
}

export interface CurrencyPrice {
  currency: Currency;
  price: string;
  usdValue: string;
  pyusdValue: string; // Always calculated from PYUSD anchor
  lastUpdated: number;
}

export interface AssetPricing {
  assetId: string;
  pyusdPrice: string; // Anchor price in PYUSD
  currencyPrices: CurrencyPrice[];
  producerCurrency: string; // Producer's preferred currency
  lastUpdated: number;
}

export interface PaymentIntent {
  assetId: string;
  buyerCurrency: string;
  producerCurrency: string;
  amount: string;
  pyusdAmount: string;
  conversionRate: string;
  fees: {
    bridgeFee: string;
    conversionFee: string;
    totalFee: string;
  };
}

export interface MultiCurrencyServiceContextType {
  // Currency management
  getSupportedCurrencies: () => Currency[];
  getCurrencyPrice: (currencyId: string) => Promise<CurrencyPrice>;
  getCurrencyPrices: () => Promise<CurrencyPrice[]>;

  // Asset pricing
  getAssetPricing: (assetId: string) => Promise<AssetPricing>;
  updateAssetPricing: (assetId: string, pyusdPrice: string) => Promise<AssetPricing>;

  // Payment processing
  createPaymentIntent: (assetId: string, buyerCurrency: string) => Promise<PaymentIntent>;
  calculateConversion: (
    fromCurrency: string,
    toCurrency: string,
    amount: string,
  ) => Promise<string>;

  // PYUSD anchor system
  getPYUSDPrice: () => Promise<string>;
  convertToPYUSD: (currency: string, amount: string) => Promise<string>;
  convertFromPYUSD: (currency: string, pyusdAmount: string) => Promise<string>;

  // Status
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock implementation for development
// TODO: Replace with real price feed integration (Pyth, Chainlink, etc.)
class MultiCurrencyService {
  private currencies: Map<string, Currency> = new Map();
  private prices: Map<string, CurrencyPrice> = new Map();
  private assetPricing: Map<string, AssetPricing> = new Map();

  constructor() {
    this.initializeCurrencies();
  }

  private initializeCurrencies(): void {
    // PYUSD - The anchor currency
    this.currencies.set("pyusd", {
      id: "pyusd",
      name: "PayPal USD",
      symbol: "PYUSD",
      icon: "💰",
      chainId: 1, // Ethereum
      contractAddress: "0x6c3ea9036406852006290770bedfcaba0e23b0e0",
      decimals: 6,
      isStable: true,
      isAnchor: true,
    });

    // Ethereum
    this.currencies.set("eth", {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      icon: "⟠",
      chainId: 1,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      isStable: false,
      isAnchor: false,
    });

    // Bitcoin
    this.currencies.set("btc", {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      chainId: 1,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 8,
      isStable: false,
      isAnchor: false,
    });

    // USDC
    this.currencies.set("usdc", {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      icon: "💵",
      chainId: 1,
      contractAddress: "0xA0b86a33E6441b8C4C8C0C4C8C0C4C8C0C4C8C0C4",
      decimals: 6,
      isStable: true,
      isAnchor: false,
    });

    // Base
    this.currencies.set("base", {
      id: "base",
      name: "Base",
      symbol: "BASE",
      icon: "🔵",
      chainId: 8453,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      isStable: false,
      isAnchor: false,
    });
  }

  async getSupportedCurrencies(): Promise<Currency[]> {
    return Array.from(this.currencies.values());
  }

  async getCurrencyPrice(currencyId: string): Promise<CurrencyPrice> {
    // TODO: Implement real price feed integration
    // This would use Pyth, Chainlink, or other price feeds

    const currency = this.currencies.get(currencyId);
    if (!currency) {
      throw new Error(`Currency ${currencyId} not supported`);
    }

    // Mock price data
    const mockPrices: Record<string, { price: string; usdValue: string }> = {
      pyusd: { price: "1.00", usdValue: "1.00" },
      eth: { price: "3500.00", usdValue: "3500.00" },
      btc: { price: "65000.00", usdValue: "65000.00" },
      usdc: { price: "1.00", usdValue: "1.00" },
      base: { price: "0.0001", usdValue: "0.35" },
    };

    const priceData = mockPrices[currencyId] || { price: "1.00", usdValue: "1.00" };

    const currencyPrice: CurrencyPrice = {
      currency,
      price: priceData.price,
      usdValue: priceData.usdValue,
      pyusdValue: priceData.usdValue, // PYUSD is 1:1 with USD
      lastUpdated: Date.now(),
    };

    this.prices.set(currencyId, currencyPrice);
    return currencyPrice;
  }

  async getCurrencyPrices(): Promise<CurrencyPrice[]> {
    const prices: CurrencyPrice[] = [];

    for (const currencyId of this.currencies.keys()) {
      try {
        const price = await this.getCurrencyPrice(currencyId);
        prices.push(price);
      } catch (err) {
        console.error(`Failed to get price for ${currencyId}:`, err);
      }
    }

    return prices;
  }

  async getAssetPricing(assetId: string): Promise<AssetPricing> {
    // TODO: Implement real asset pricing retrieval
    // This would fetch from the marketplace contract or database

    const existing = this.assetPricing.get(assetId);
    if (existing) {
      return existing;
    }

    // Mock asset pricing
    const pyusdPrice = "10.00"; // $10 in PYUSD
    const currencyPrices: CurrencyPrice[] = [];

    for (const currency of this.currencies.values()) {
      if (currency.id === "pyusd") {
        currencyPrices.push({
          currency,
          price: pyusdPrice,
          usdValue: pyusdPrice,
          pyusdValue: pyusdPrice,
          lastUpdated: Date.now(),
        });
      } else {
        const price = await this.getCurrencyPrice(currency.id);
        const convertedPrice = this.convertPrice(pyusdPrice, "pyusd", currency.id);

        currencyPrices.push({
          currency,
          price: convertedPrice,
          usdValue: price.usdValue,
          pyusdValue: pyusdPrice,
          lastUpdated: Date.now(),
        });
      }
    }

    const assetPricing: AssetPricing = {
      assetId,
      pyusdPrice,
      currencyPrices,
      producerCurrency: "eth", // Producer prefers ETH
      lastUpdated: Date.now(),
    };

    this.assetPricing.set(assetId, assetPricing);
    return assetPricing;
  }

  async updateAssetPricing(assetId: string, pyusdPrice: string): Promise<AssetPricing> {
    // TODO: Implement real asset pricing update
    // This would update the marketplace contract or database

    const existing = this.assetPricing.get(assetId);
    if (!existing) {
      throw new Error(`Asset ${assetId} not found`);
    }

    // Update PYUSD price and recalculate all currency prices
    const updatedPricing: AssetPricing = {
      ...existing,
      pyusdPrice,
      currencyPrices: await Promise.all(
        existing.currencyPrices.map(async (cp) => {
          if (cp.currency.id === "pyusd") {
            return { ...cp, price: pyusdPrice, pyusdValue: pyusdPrice };
          }
          const convertedPrice = this.convertPrice(pyusdPrice, "pyusd", cp.currency.id);
          return { ...cp, price: convertedPrice, pyusdValue: pyusdPrice };
        }),
      ),
      lastUpdated: Date.now(),
    };

    this.assetPricing.set(assetId, updatedPricing);
    return updatedPricing;
  }

  async createPaymentIntent(assetId: string, buyerCurrency: string): Promise<PaymentIntent> {
    // TODO: Implement real payment intent creation
    // This would calculate fees, conversion rates, etc.

    const assetPricing = await this.getAssetPricing(assetId);
    const pyusdAmount = assetPricing.pyusdPrice;

    // Calculate conversion
    const buyerAmount = await this.convertFromPYUSD(buyerCurrency, pyusdAmount);
    const conversionRate = await this.calculateConversion("pyusd", buyerCurrency, "1.00");

    // Calculate fees (mock)
    const bridgeFee = "0.50"; // $0.50 bridge fee
    const conversionFee = "0.25"; // $0.25 conversion fee
    const totalFee = (Number.parseFloat(bridgeFee) + Number.parseFloat(conversionFee)).toString();

    return {
      assetId,
      buyerCurrency,
      producerCurrency: assetPricing.producerCurrency,
      amount: buyerAmount,
      pyusdAmount,
      conversionRate,
      fees: {
        bridgeFee,
        conversionFee,
        totalFee,
      },
    };
  }

  async calculateConversion(
    fromCurrency: string,
    toCurrency: string,
    amount: string,
  ): Promise<string> {
    // TODO: Implement real conversion calculation
    // This would use price feeds and conversion rates

    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Mock conversion logic
    const fromPrice = await this.getCurrencyPrice(fromCurrency);
    const toPrice = await this.getCurrencyPrice(toCurrency);

    const fromUsdValue = Number.parseFloat(fromPrice.usdValue);
    const toUsdValue = Number.parseFloat(toPrice.usdValue);
    const amountValue = Number.parseFloat(amount);

    const convertedAmount = (amountValue * fromUsdValue) / toUsdValue;
    return convertedAmount.toFixed(6);
  }

  async getPYUSDPrice(): Promise<string> {
    const pyusdPrice = await this.getCurrencyPrice("pyusd");
    return pyusdPrice.price;
  }

  async convertToPYUSD(currency: string, amount: string): Promise<string> {
    if (currency === "pyusd") {
      return amount;
    }

    return this.calculateConversion(currency, "pyusd", amount);
  }

  async convertFromPYUSD(currency: string, pyusdAmount: string): Promise<string> {
    if (currency === "pyusd") {
      return pyusdAmount;
    }

    return this.calculateConversion("pyusd", currency, pyusdAmount);
  }

  private convertPrice(pyusdPrice: string, fromCurrency: string, toCurrency: string): string {
    // Mock conversion logic
    const mockRates: Record<string, number> = {
      pyusd: 1.0,
      eth: 0.000286, // 1 PYUSD = 0.000286 ETH (at $3500 ETH)
      btc: 0.000015, // 1 PYUSD = 0.000015 BTC (at $65000 BTC)
      usdc: 1.0,
      base: 0.0001,
    };

    const pyusdValue = Number.parseFloat(pyusdPrice);
    const rate = mockRates[toCurrency] || 1.0;
    const convertedPrice = pyusdValue * rate;

    return convertedPrice.toFixed(6);
  }
}

// Context for React integration
const MultiCurrencyServiceContext = createContext<MultiCurrencyServiceContextType | undefined>(
  undefined,
);

export function MultiCurrencyServiceProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize multi-currency service
  const [multiCurrencyService] = useState(() => new MultiCurrencyService());

  useEffect(() => {
    // Initialize connection
    setIsLoading(true);

    // TODO: Implement real connection logic
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getSupportedCurrencies = (): Currency[] => {
    return multiCurrencyService.getSupportedCurrencies();
  };

  const getCurrencyPrice = async (currencyId: string): Promise<CurrencyPrice> => {
    try {
      setIsLoading(true);
      setError(null);

      const price = await multiCurrencyService.getCurrencyPrice(currencyId);
      return price;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get currency price";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrencyPrices = async (): Promise<CurrencyPrice[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const prices = await multiCurrencyService.getCurrencyPrices();
      return prices;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get currency prices";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetPricing = async (assetId: string): Promise<AssetPricing> => {
    try {
      setError(null);
      return await multiCurrencyService.getAssetPricing(assetId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get asset pricing";
      setError(errorMessage);
      throw err;
    }
  };

  const updateAssetPricing = async (assetId: string, pyusdPrice: string): Promise<AssetPricing> => {
    try {
      setIsLoading(true);
      setError(null);

      const pricing = await multiCurrencyService.updateAssetPricing(assetId, pyusdPrice);
      return pricing;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update asset pricing";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createPaymentIntent = async (
    assetId: string,
    buyerCurrency: string,
  ): Promise<PaymentIntent> => {
    try {
      setIsLoading(true);
      setError(null);

      const intent = await multiCurrencyService.createPaymentIntent(assetId, buyerCurrency);
      return intent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create payment intent";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const calculateConversion = async (
    fromCurrency: string,
    toCurrency: string,
    amount: string,
  ): Promise<string> => {
    try {
      setError(null);
      return await multiCurrencyService.calculateConversion(fromCurrency, toCurrency, amount);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to calculate conversion";
      setError(errorMessage);
      throw err;
    }
  };

  const getPYUSDPrice = async (): Promise<string> => {
    try {
      setError(null);
      return await multiCurrencyService.getPYUSDPrice();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get PYUSD price";
      setError(errorMessage);
      throw err;
    }
  };

  const convertToPYUSD = async (currency: string, amount: string): Promise<string> => {
    try {
      setError(null);
      return await multiCurrencyService.convertToPYUSD(currency, amount);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to convert to PYUSD";
      setError(errorMessage);
      throw err;
    }
  };

  const convertFromPYUSD = async (currency: string, pyusdAmount: string): Promise<string> => {
    try {
      setError(null);
      return await multiCurrencyService.convertFromPYUSD(currency, pyusdAmount);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to convert from PYUSD";
      setError(errorMessage);
      throw err;
    }
  };

  return (
    <MultiCurrencyServiceContext.Provider
      value={{
        getSupportedCurrencies,
        getCurrencyPrice,
        getCurrencyPrices,
        getAssetPricing,
        updateAssetPricing,
        createPaymentIntent,
        calculateConversion,
        getPYUSDPrice,
        convertToPYUSD,
        convertFromPYUSD,
        isConnected,
        isLoading,
        error,
      }}
    >
      {children}
    </MultiCurrencyServiceContext.Provider>
  );
}

export function useMultiCurrencyService(): MultiCurrencyServiceContextType {
  const context = useContext(MultiCurrencyServiceContext);
  if (context === undefined) {
    throw new Error("useMultiCurrencyService must be used within a MultiCurrencyServiceProvider");
  }
  return context;
}
