import { type Asset, useAssets } from "@gotmusic/api";
import { tokens } from "@gotmusic/tokens/native";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

type ShowcaseDebugState = "loading" | "error";

export type ComponentShowcaseProps = {
  enableQueries?: boolean;
  initialAssets?: Asset[];
  debugState?: ShowcaseDebugState;
};

const now = Date.now();

const FALLBACK_ASSETS: Asset[] = [
  {
    id: "demo-beat-midnight-glass",
    title: "Midnight Glass",
    artist: "Luna Echo",
    bpm: 128,
    keySig: "C minor",
    priceAmount: 24,
    priceCurrency: "PYUSD",
    status: "ready",
    createdAt: now - 1000 * 60 * 60 * 24 * 4,
    updatedAt: now - 1000 * 60 * 30,
  },
  {
    id: "demo-pack-vapor-waves",
    title: "Vapor Waves Pack",
    artist: "Neon Canyon",
    bpm: 122,
    keySig: "E minor",
    priceAmount: 42,
    priceCurrency: "PYUSD",
    status: "published",
    createdAt: now - 1000 * 60 * 60 * 24 * 8,
    updatedAt: now - 1000 * 60 * 60 * 3,
  },
  {
    id: "demo-loop-sunrise-arp",
    title: "Sunrise Arp Loop",
    artist: "Atlas Keys",
    bpm: 110,
    keySig: "A major",
    priceAmount: 12,
    priceCurrency: "PYUSD",
    status: "ready",
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    updatedAt: now - 1000 * 60 * 12,
  },
];

const BUTTON_VARIANTS = [
  {
    id: "primary" as const,
    label: "Primary",
    className: "bg-brand-primary border border-brand-primary",
    textClass: "text-white",
  },
  {
    id: "secondary" as const,
    label: "Secondary",
    className: "border border-fg/20 bg-fg/10",
    textClass: "text-fg",
  },
  {
    id: "destructive" as const,
    label: "Destructive",
    className: "border border-red-500/40 bg-red-500/15",
    textClass: "text-red-400",
  },
] as const;

const COLOR_SWATCHES = [
  { label: "Brand Primary", value: tokens.color.brand.primary },
  { label: "Accent", value: tokens.color.brand.accent },
  { label: "Warning", value: tokens.color.palette.semantic.warning },
] as const;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/record", label: "Record" },
  { href: "/library", label: "Library" },
] as const;

const STATUS_BASE = "flex-1 rounded-lg border p-3";
const STATUS_SUCCESS = "border-green-500/30 bg-green-500/10";
const STATUS_INFO = "border-sky-400/30 bg-sky-400/10";
const STATUS_DANGER = "border-red-500/30 bg-red-500/10";
const STATUS_BRAND = "border-emerald-400/30 bg-emerald-400/10";

export const SHOWCASE_FALLBACK_ASSETS = FALLBACK_ASSETS;

// Component showcase for mobile development
export default function ComponentShowcase({
  enableQueries = true,
  initialAssets = FALLBACK_ASSETS,
  debugState,
}: ComponentShowcaseProps = {}) {
  const [activeButton, setActiveButton] =
    useState<(typeof BUTTON_VARIANTS)[number]["id"]>("primary");
  const [tokenView, setTokenView] = useState<"colors" | "typography">("colors");

  const assetsQuery = useAssets(
    { limit: 3 },
    {
      enabled: enableQueries,
      staleTime: 60_000,
      retry: 1,
    },
  );

  const isDebugLoading = debugState === "loading";
  const isDebugError = debugState === "error";

  const isLoading = isDebugLoading || assetsQuery.isLoading;
  const isFetching = isDebugLoading || assetsQuery.isFetching;
  const isError = isDebugError || assetsQuery.isError;
  const errorMessage = isDebugError
    ? "Unable to connect to API. Showing showcase data."
    : assetsQuery.error?.message;

  const fallbackAssets = useMemo(
    () => (initialAssets?.length ? initialAssets : FALLBACK_ASSETS),
    [initialAssets],
  );

  const assets = useMemo(() => {
    if (!isDebugLoading && assetsQuery.data?.items?.length) {
      return assetsQuery.data.items;
    }

    return fallbackAssets;
  }, [assetsQuery.data?.items, fallbackAssets, isDebugLoading]);

  const highlightedAsset = assets[0];
  const isRefreshing = enableQueries && !isLoading && assetsQuery.isFetching;

  const apiStatusClasses = isError
    ? {
        container: `${STATUS_BASE} ${STATUS_DANGER}`,
        title: "text-red-400 font-semibold",
        body: "text-red-300/80 text-sm",
      }
    : {
        container: `${STATUS_BASE} ${STATUS_INFO}`,
        title: "text-sky-400 font-semibold",
        body: "text-sky-300/80 text-sm",
      };

  const handleRefresh = () => {
    if (!enableQueries) {
      return;
    }

    void assetsQuery.refetch();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: tokens.color.bg.default }}
      contentContainerStyle={{
        padding: tokens.space["4"],
        paddingBottom: tokens.space["10"],
      }}
    >
      <View className="mb-6">
        <Text className="text-fg text-3xl font-bold">🎨 Mobile Component Showcase</Text>
        <Text className="mt-2 text-base text-fg/70">
          Explore live UI states, API data, and design tokens without leaving the app.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-fg text-xl font-semibold">System Status</Text>
        <View className="mt-3 flex-row gap-3">
          <View className={`${STATUS_BASE} ${STATUS_SUCCESS}`}>
            <Text className="text-green-400 font-semibold">Query Client</Text>
            <Text className="text-green-300/80 text-sm">
              {isFetching ? "Fetching data…" : "Connected"}
            </Text>
          </View>
          <View className={apiStatusClasses.container}>
            <Text className={apiStatusClasses.title}>API</Text>
            <Text className={apiStatusClasses.body}>
              {isError ? "Degraded • using showcase data" : `Ready • ${assets.length} assets`}
            </Text>
          </View>
          <View className={`${STATUS_BASE} ${STATUS_BRAND}`}>
            <Text className="text-emerald-400 font-semibold">NativeWind</Text>
            <Text className="text-emerald-300/80 text-sm">ClassName styling active</Text>
          </View>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-fg text-xl font-semibold">Component Examples</Text>
        <Text className="mt-3 text-sm text-fg/70">Button Variants</Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {BUTTON_VARIANTS.map((variant) => (
            <TouchableOpacity
              key={variant.id}
              onPress={() => setActiveButton(variant.id)}
              className={`rounded-md px-4 py-2 ${variant.className} ${
                activeButton === variant.id ? "" : "opacity-80"
              }`}
              activeOpacity={0.9}
            >
              <Text className={`text-sm font-semibold ${variant.textClass}`}>{variant.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="mt-2 text-xs text-fg/60">Selected variant: {activeButton}</Text>

        <View className="mt-4 rounded-lg border border-fg/10 bg-bg p-4">
          <Text className="text-sm font-semibold text-fg/70">Highlighted Asset Card</Text>
          {highlightedAsset ? (
            <>
              <Text className="mt-2 text-lg font-semibold text-fg">{highlightedAsset.title}</Text>
              <Text className="text-sm text-fg/70">
                {highlightedAsset.artist} · {highlightedAsset.bpm ?? "—"} BPM ·{" "}
                {highlightedAsset.keySig ?? "Unknown"}
              </Text>
              <View className="mt-3 flex-row gap-2">
                <TouchableOpacity className="rounded-full border border-brand-primary bg-brand-primary/10 px-3 py-1">
                  <Text className="text-xs font-semibold text-brand-primary">Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full border border-fg/15 px-3 py-1">
                  <Text className="text-xs font-semibold text-fg/70">Details</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text className="mt-2 text-sm text-fg/60">Showcase data unavailable.</Text>
          )}
        </View>

        <View className="mt-4">
          <Text className="text-sm text-fg/70">Loading States</Text>
          <View className="mt-3 flex-row items-center gap-4">
            <ActivityIndicator size="small" color={tokens.color.brand.primary} />
            <Text className="text-sm text-fg/70">Fetching preview…</Text>
            <ActivityIndicator size="large" color={tokens.color.brand.accent} />
            <Text className="text-sm text-fg/70">Processing upload…</Text>
          </View>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-fg text-xl font-semibold">Live Asset Data</Text>
        <View className="mt-3 rounded-lg border border-fg/10 bg-bg p-4">
          {isLoading ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator size="small" color={tokens.color.brand.primary} />
              <Text className="text-sm text-fg/70">Loading latest assets…</Text>
            </View>
          ) : null}

          {assets.map((asset) => (
            <View key={asset.id} className="mt-3 rounded-md border border-fg/15 bg-fg/10 p-3">
              <Text className="text-base font-semibold text-fg">{asset.title}</Text>
              <Text className="mt-1 text-xs text-fg/70">
                {asset.artist} · {asset.bpm ?? "—"} BPM · {asset.keySig ?? "Unknown"}
              </Text>
              <Text className="mt-1 text-xs text-fg/70">
                {asset.priceAmount} {asset.priceCurrency} · {asset.status.toUpperCase()}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            className={`mt-3 flex-row items-center justify-center rounded-md border border-fg/15 bg-fg/10 px-4 py-2 ${
              enableQueries ? "" : "opacity-60"
            } ${isRefreshing ? "opacity-70" : ""}`}
            onPress={handleRefresh}
            disabled={!enableQueries || isRefreshing}
            activeOpacity={0.9}
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color={tokens.color.brand.primary} />
            ) : null}
            <Text className={`text-sm font-semibold text-fg ${isRefreshing ? "ml-2" : ""}`}>
              {enableQueries ? (isRefreshing ? "Refreshing…" : "Refresh Data") : "Queries disabled"}
            </Text>
          </TouchableOpacity>

          {isError ? (
            <Text className="mt-2 text-xs font-medium text-red-400">
              {errorMessage ?? "Unable to reach the API. Showing showcase data instead."}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-fg text-xl font-semibold">Navigation</Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} asChild>
              <TouchableOpacity
                className="rounded-md border border-fg/15 bg-fg/10 px-4 py-2"
                activeOpacity={0.9}
              >
                <Text className="text-sm font-semibold text-fg">{link.label}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-fg text-xl font-semibold">Design Tokens</Text>
        <View className="mt-3 rounded-lg border border-fg/10 bg-bg p-4">
          <View className="mb-3 flex-row">
            <TouchableOpacity
              onPress={() => setTokenView("colors")}
              className={`mr-2 rounded-full border border-fg/15 px-3 py-1 ${
                tokenView === "colors" ? "border-brand-primary bg-brand-primary" : ""
              }`}
              activeOpacity={0.9}
            >
              <Text
                className={`text-xs font-semibold ${
                  tokenView === "colors" ? "text-white" : "text-fg/70"
                }`}
              >
                Color tokens
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTokenView("typography")}
              className={`rounded-full border border-fg/15 px-3 py-1 ${
                tokenView === "typography" ? "border-brand-primary bg-brand-primary" : ""
              }`}
              activeOpacity={0.9}
            >
              <Text
                className={`text-xs font-semibold ${
                  tokenView === "typography" ? "text-white" : "text-fg/70"
                }`}
              >
                Typography
              </Text>
            </TouchableOpacity>
          </View>

          {tokenView === "colors" ? (
            COLOR_SWATCHES.map((swatch) => (
              <View key={swatch.label} className="mb-2 flex-row items-center">
                <View
                  className="mr-3 h-10 w-10 rounded-md border border-fg/15"
                  style={{ backgroundColor: swatch.value }}
                />
                <View>
                  <Text className="text-sm font-semibold text-fg">{swatch.label}</Text>
                  <Text className="text-xs text-fg/70">{swatch.value}</Text>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text className="text-3xl font-bold text-fg">Display heading</Text>
              <Text className="mt-2 text-base leading-6 text-fg/70">
                {tokens.text["display-sm"].size}px / {tokens.text["display-sm"].line}px line height
              </Text>
              <Text className="mt-4 text-sm font-semibold text-fg">Body copy</Text>
              <Text className="mt-1 text-base leading-6 text-fg/70">
                {tokens.text.md.size}px / {tokens.text.md.line}px line height for comfortable{" "}
                reading.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
