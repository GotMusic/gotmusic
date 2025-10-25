import { type Asset, useAssets } from "@gotmusic/api";
import { tokens } from "@gotmusic/tokens/native";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

const STATUS_TONES = {
  success: {
    backgroundColor: "rgba(57, 217, 138, 0.12)",
    borderColor: "rgba(57, 217, 138, 0.35)",
    textColor: tokens.color.palette.semantic.success,
    mutedColor: "rgba(57, 217, 138, 0.7)",
  },
  info: {
    backgroundColor: "rgba(124, 212, 255, 0.12)",
    borderColor: "rgba(124, 212, 255, 0.32)",
    textColor: tokens.color.palette.semantic.info,
    mutedColor: "rgba(124, 212, 255, 0.7)",
  },
  brand: {
    backgroundColor: "rgba(106, 230, 166, 0.16)",
    borderColor: tokens.color.border.brand,
    textColor: tokens.color.brand.primary,
    mutedColor: "rgba(106, 230, 166, 0.7)",
  },
  danger: {
    backgroundColor: "rgba(249, 112, 102, 0.16)",
    borderColor: tokens.color.border.danger,
    textColor: tokens.color.palette.semantic.danger,
    mutedColor: "rgba(249, 112, 102, 0.75)",
  },
} as const;

const BUTTON_VARIANTS = [
  {
    id: "primary" as const,
    label: "Primary",
    backgroundColor: tokens.color.brand.primary,
    borderColor: tokens.color.border.brand,
    textColor: tokens.color.bg.default,
  },
  {
    id: "secondary" as const,
    label: "Secondary",
    backgroundColor: tokens.color.bg.muted,
    borderColor: tokens.color.border.subtle,
    textColor: tokens.color.fg.default,
  },
  {
    id: "destructive" as const,
    label: "Destructive",
    backgroundColor: "rgba(249, 112, 102, 0.16)",
    borderColor: tokens.color.border.danger,
    textColor: tokens.color.palette.semantic.danger,
  },
] as const;

const COLOR_SWATCHES = [
  { label: "Brand Primary", value: tokens.color.brand.primary },
  { label: "Accent", value: tokens.color.brand.accent },
  { label: "Warning", value: tokens.color.palette.semantic.warning },
] as const;

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
    () => (initialAssets && initialAssets.length > 0 ? initialAssets : FALLBACK_ASSETS),
    [initialAssets],
  );

  const assets = useMemo(() => {
    if (!isDebugLoading && assetsQuery.data?.items?.length) {
      return assetsQuery.data.items;
    }
    return fallbackAssets;
  }, [assetsQuery.data?.items, fallbackAssets, isDebugLoading]);

  const highlightedAsset = assets[0];
  const assetCount = assets.length;
  const apiTone = isError ? STATUS_TONES.danger : STATUS_TONES.info;
  const isRefreshing = !isLoading && assetsQuery.isFetching;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: tokens.color.bg.default }}
      contentContainerStyle={{
        padding: tokens.space["4"],
        paddingBottom: tokens.space["10"],
      }}
    >
      <View style={{ marginBottom: tokens.space["6"] }}>
        <Text
          style={{
            color: tokens.color.fg.default,
            fontSize: tokens.text["display-sm"].size,
            lineHeight: tokens.text["display-sm"].line,
            fontWeight: "700",
          }}
        >
          🎨 Mobile Component Showcase
        </Text>
        <Text
          style={{
            color: tokens.color.fg.muted,
            fontSize: tokens.text.md.size,
            lineHeight: tokens.text.md.line,
            marginTop: tokens.space["2"],
          }}
        >
          Explore live UI states, API data, and design tokens without leaving the app.
        </Text>
      </View>

      <View style={{ marginBottom: tokens.space["6"] }}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={{ flexDirection: "row", marginTop: tokens.space["3"] }}>
          <View
            style={{
              flex: 1,
              marginRight: tokens.space["3"],
              ...styles.statusCard,
              ...STATUS_TONES.success,
            }}
          >
            <Text style={[styles.statusTitle, { color: STATUS_TONES.success.textColor }]}>
              Query Client
            </Text>
            <Text style={[styles.statusBody, { color: STATUS_TONES.success.mutedColor }]}>
              {isFetching ? "Fetching data…" : "Connected"}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginRight: tokens.space["3"],
              ...styles.statusCard,
              ...apiTone,
            }}
          >
            <Text style={[styles.statusTitle, { color: apiTone.textColor }]}>API</Text>
            <Text style={[styles.statusBody, { color: apiTone.mutedColor }]}>
              {isError ? "Degraded • using showcase data" : `Ready • ${assetCount} assets`}
            </Text>
          </View>
          <View style={{ flex: 1, ...styles.statusCard, ...STATUS_TONES.brand }}>
            <Text style={[styles.statusTitle, { color: STATUS_TONES.brand.textColor }]}>
              NativeWind
            </Text>
            <Text style={[styles.statusBody, { color: STATUS_TONES.brand.mutedColor }]}>
              ClassName styling active
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: tokens.space["6"] }}>
        <Text style={styles.sectionTitle}>Component Examples</Text>
        <Text style={[styles.sectionHelperText, { marginTop: tokens.space["3"] }]}>
          Button Variants
        </Text>
        <View style={styles.buttonRow}>
          {BUTTON_VARIANTS.map((variant) => (
            <TouchableOpacity
              key={variant.id}
              onPress={() => setActiveButton(variant.id)}
              style={[
                styles.button,
                {
                  backgroundColor: variant.backgroundColor,
                  borderColor: variant.borderColor,
                  opacity: activeButton === variant.id ? 1 : 0.8,
                },
              ]}
              activeOpacity={0.9}
            >
              <Text style={[styles.buttonText, { color: variant.textColor }]}>{variant.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.buttonHint}>Selected variant: {activeButton}</Text>

        <View style={[styles.card, { marginTop: tokens.space["4"] }]}>
          <Text style={styles.sectionHelperText}>Highlighted Asset Card</Text>
          {highlightedAsset ? (
            <>
              <Text style={styles.cardTitle}>{highlightedAsset.title}</Text>
              <Text style={styles.cardSubtitle}>
                {highlightedAsset.artist} · {highlightedAsset.bpm ?? "—"} BPM ·{" "}
                {highlightedAsset.keySig ?? "Unknown"}
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={[
                    styles.actionChip,
                    {
                      backgroundColor: "rgba(106, 230, 166, 0.16)",
                      borderColor: tokens.color.border.brand,
                    },
                  ]}
                >
                  <Text style={[styles.actionChipText, { color: tokens.color.brand.primary }]}>
                    Preview
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionChip,
                    { backgroundColor: "transparent", borderColor: tokens.color.border.subtle },
                  ]}
                >
                  <Text style={[styles.actionChipText, { color: tokens.color.fg.muted }]}>
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={styles.cardSubtitle}>Showcase data unavailable.</Text>
          )}
        </View>

        <View style={{ marginTop: tokens.space["4"] }}>
          <Text style={styles.sectionHelperText}>Loading States</Text>
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={tokens.color.brand.primary} />
            <Text style={styles.loadingLabel}>Fetching preview…</Text>
            <ActivityIndicator
              size="large"
              color={tokens.color.brand.accent}
              style={{ marginLeft: tokens.space["4"] }}
            />
            <Text style={styles.loadingLabel}>Processing upload…</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: tokens.space["6"] }}>
        <Text style={styles.sectionTitle}>Live Asset Data</Text>
        <View style={styles.assetsCard}>
          {isLoading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={tokens.color.brand.primary} />
              <Text style={styles.loadingLabel}>Loading latest assets…</Text>
            </View>
          ) : null}

          {assets.map((asset, index) => (
            <View
              key={asset.id}
              style={[styles.assetRow, index === 0 ? { marginTop: tokens.space["3"] } : null]}
            >
              <Text style={styles.assetTitle}>{asset.title}</Text>
              <Text style={styles.assetMeta}>
                {asset.artist} · {asset.bpm ?? "—"} BPM · {asset.keySig ?? "Unknown"}
              </Text>
              <Text style={styles.assetMeta}>
                {asset.priceAmount} {asset.priceCurrency} · {asset.status.toUpperCase()}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.refreshButton, isFetching ? { opacity: 0.7 } : null]}
            onPress={() => assetsQuery.refetch()}
            disabled={isFetching}
            activeOpacity={0.9}
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color={tokens.color.brand.primary} />
            ) : null}
            <Text
              style={[styles.refreshLabel, { marginLeft: isRefreshing ? tokens.space["2"] : 0 }]}
            >
              {isRefreshing ? "Refreshing…" : "Refresh Data"}
            </Text>
          </TouchableOpacity>

          {isError ? (
            <Text style={styles.errorText}>
              {errorMessage ?? "Unable to reach the API. Showing showcase data instead."}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ marginBottom: tokens.space["6"] }}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <View style={styles.navigationRow}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.navLink} activeOpacity={0.9}>
              <Text style={styles.navLinkText}>Home</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/record" asChild>
            <TouchableOpacity style={styles.navLink} activeOpacity={0.9}>
              <Text style={styles.navLinkText}>Record</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/library" asChild>
            <TouchableOpacity style={styles.navLink} activeOpacity={0.9}>
              <Text style={styles.navLinkText}>Library</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={{ marginBottom: tokens.space["4"] }}>
        <Text style={styles.sectionTitle}>Design Tokens</Text>
        <View style={styles.tokenCard}>
          <View style={styles.tokenToggleRow}>
            <TouchableOpacity
              onPress={() => setTokenView("colors")}
              style={[styles.tokenToggle, tokenView === "colors" ? styles.tokenToggleActive : null]}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.tokenToggleLabel,
                  tokenView === "colors" ? styles.tokenToggleLabelActive : null,
                ]}
              >
                Color tokens
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTokenView("typography")}
              style={[
                styles.tokenToggle,
                tokenView === "typography" ? styles.tokenToggleActive : null,
              ]}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.tokenToggleLabel,
                  tokenView === "typography" ? styles.tokenToggleLabelActive : null,
                ]}
              >
                Typography
              </Text>
            </TouchableOpacity>
          </View>

          {tokenView === "colors" ? (
            COLOR_SWATCHES.map((swatch) => (
              <View key={swatch.label} style={styles.colorSwatchRow}>
                <View style={[styles.colorSwatch, { backgroundColor: swatch.value }]} />
                <View>
                  <Text style={styles.colorLabel}>{swatch.label}</Text>
                  <Text style={styles.colorValue}>{swatch.value}</Text>
                </View>
              </View>
            ))
          ) : (
            <>
              <Text style={styles.typographySampleTitle}>Display heading</Text>
              <Text style={styles.typographySampleBody}>
                Body text uses tokens.text.md for consistent rhythm across native screens.
              </Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: tokens.color.fg.default,
    fontSize: tokens.text.xl.size,
    lineHeight: tokens.text.xl.line,
    fontWeight: "600",
  },
  sectionHelperText: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.sm.size,
    lineHeight: tokens.text.sm.line,
  },
  statusCard: {
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.space["3"],
  },
  statusTitle: {
    fontSize: tokens.text.sm.size,
    fontWeight: "600",
  },
  statusBody: {
    marginTop: tokens.space["1"],
    fontSize: tokens.text.xs.size,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: tokens.space["3"],
  },
  button: {
    borderWidth: 1,
    borderRadius: tokens.radius.md,
    paddingVertical: tokens.space["2"],
    paddingHorizontal: tokens.space["4"],
    marginRight: tokens.space["2"],
    marginBottom: tokens.space["2"],
  },
  buttonText: {
    fontSize: tokens.text.sm.size,
    fontWeight: "600",
  },
  buttonHint: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.xs.size,
    marginTop: tokens.space["2"],
  },
  card: {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.elevated,
    padding: tokens.space["4"],
  },
  cardTitle: {
    color: tokens.color.fg.default,
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    marginTop: tokens.space["2"],
  },
  cardSubtitle: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.sm.size,
    marginTop: tokens.space["1"],
  },
  cardActions: {
    flexDirection: "row",
    marginTop: tokens.space["3"],
  },
  actionChip: {
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    paddingHorizontal: tokens.space["3"],
    paddingVertical: tokens.space["1"],
    marginRight: tokens.space["2"],
  },
  actionChipText: {
    fontSize: tokens.text.xs.size,
    fontWeight: "600",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: tokens.space["3"],
  },
  loadingLabel: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.sm.size,
    marginLeft: tokens.space["2"],
  },
  assetsCard: {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.elevated,
    padding: tokens.space["4"],
    marginTop: tokens.space["3"],
  },
  assetRow: {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.muted,
    padding: tokens.space["3"],
    marginTop: tokens.space["2"],
  },
  assetTitle: {
    color: tokens.color.fg.default,
    fontSize: tokens.text.md.size,
    fontWeight: "600",
  },
  assetMeta: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.xs.size,
    marginTop: 4,
  },
  refreshButton: {
    marginTop: tokens.space["3"],
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.muted,
    paddingVertical: tokens.space["2"],
    paddingHorizontal: tokens.space["4"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  refreshLabel: {
    color: tokens.color.fg.default,
    fontSize: tokens.text.sm.size,
    fontWeight: "600",
  },
  errorText: {
    color: "rgba(249, 112, 102, 0.9)",
    fontSize: tokens.text.xs.size,
    marginTop: tokens.space["2"],
  },
  navigationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: tokens.space["3"],
  },
  navLink: {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.muted,
    paddingHorizontal: tokens.space["4"],
    paddingVertical: tokens.space["2"],
    marginRight: tokens.space["2"],
    marginBottom: tokens.space["2"],
  },
  navLinkText: {
    color: tokens.color.fg.default,
    fontSize: tokens.text.sm.size,
    fontWeight: "600",
  },
  tokenCard: {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    backgroundColor: tokens.color.bg.elevated,
    padding: tokens.space["4"],
    marginTop: tokens.space["3"],
  },
  tokenToggleRow: {
    flexDirection: "row",
    marginBottom: tokens.space["3"],
  },
  tokenToggle: {
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
    paddingVertical: tokens.space["1"],
    paddingHorizontal: tokens.space["3"],
    marginRight: tokens.space["2"],
  },
  tokenToggleActive: {
    backgroundColor: tokens.color.brand.primary,
    borderColor: tokens.color.border.brand,
  },
  tokenToggleLabel: {
    fontSize: tokens.text.xs.size,
    fontWeight: "600",
    color: tokens.color.fg.muted,
  },
  tokenToggleLabelActive: {
    color: tokens.color.bg.default,
  },
  colorSwatchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: tokens.space["2"],
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: tokens.radius.md,
    marginRight: tokens.space["3"],
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
  },
  colorLabel: {
    color: tokens.color.fg.default,
    fontSize: tokens.text.sm.size,
    fontWeight: "600",
  },
  colorValue: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.xs.size,
    marginTop: 2,
  },
  typographySampleTitle: {
    color: tokens.color.fg.default,
    fontSize: tokens.text["display-sm"].size,
    lineHeight: tokens.text["display-sm"].line,
    fontWeight: "700",
  },
  typographySampleBody: {
    color: tokens.color.fg.muted,
    fontSize: tokens.text.md.size,
    lineHeight: tokens.text.md.line,
    marginTop: tokens.space["2"],
  },
});
