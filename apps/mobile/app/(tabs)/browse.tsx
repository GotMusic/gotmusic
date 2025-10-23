import { useAssets } from "@gotmusic/api";
import { tokens } from "@gotmusic/tokens/native";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Browse() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: assets, isLoading, error, refetch } = useAssets();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderAsset = ({
    item,
  }: { item: { id: string; title: string; artist: string; priceAmount: number; priceCurrency: string; status: string; bpm?: number; keySig?: string } }) => (
    <View
      className="rounded-lg border border-fg/10 bg-bg p-4 mb-3"
      style={{
        borderColor: tokens.color.border.subtle,
        backgroundColor: tokens.color.bg.default,
        padding: tokens.space["4"],
        marginBottom: tokens.space["3"],
        borderRadius: tokens.radius.lg,
      }}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text
            className="text-fg font-semibold text-lg"
            style={{
              color: tokens.color.fg.default,
              fontSize: tokens.text.lg.size,
              fontWeight: "600",
            }}
          >
            {item.title}
          </Text>
          <Text
            className="text-fg/70 text-sm"
            style={{
              color: tokens.color.fg.muted,
              fontSize: tokens.text.sm.size,
            }}
          >
            {item.artist}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className="text-brand-primary font-semibold"
            style={{
              color: tokens.color.brand.primary,
              fontWeight: "600",
            }}
          >
            {item.priceAmount} {item.priceCurrency}
          </Text>
          <Text
            className="text-fg/50 text-xs"
            style={{
              color: tokens.color.fg.subtle,
              fontSize: tokens.text.xs.size,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 mb-3">
        <Text
          className="text-fg/70 text-sm"
          style={{
            color: tokens.color.fg.muted,
            fontSize: tokens.text.sm.size,
          }}
        >
          BPM: {item.bpm ?? "—"}
        </Text>
        <Text
          className="text-fg/70 text-sm"
          style={{
            color: tokens.color.fg.muted,
            fontSize: tokens.text.sm.size,
          }}
        >
          Key: {item.keySig ?? "—"}
        </Text>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 bg-brand-primary py-2 px-4 rounded-md items-center"
          style={{
            backgroundColor: tokens.color.brand.primary,
            paddingVertical: tokens.space["2"],
            paddingHorizontal: tokens.space["4"],
            borderRadius: tokens.radius.md,
          }}
        >
          <Text
            className="text-white font-medium"
            style={{
              color: tokens.color.fg.inverse,
              fontWeight: "500",
            }}
          >
            Preview
          </Text>
        </TouchableOpacity>
        <Link
          href={`/purchases/${item.id}`}
          className="bg-fg/10 py-2 px-4 rounded-md items-center"
          style={{
            backgroundColor: `${tokens.color.fg.muted}20`,
            paddingVertical: tokens.space["2"],
            paddingHorizontal: tokens.space["4"],
            borderRadius: tokens.radius.md,
          }}
        >
          <Text
            className="text-fg font-medium"
            style={{
              color: tokens.color.fg.default,
              fontWeight: "500",
            }}
          >
            Details
          </Text>
        </Link>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View
      className="flex-1 items-center justify-center p-8"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: tokens.space["8"],
      }}
    >
      <View className="items-center">
        <Text className="text-6xl mb-4" style={{ fontSize: 48, marginBottom: tokens.space["4"] }}>
          🎵
        </Text>
        <Text
          className="text-fg text-xl font-semibold mb-2"
          style={{
            color: tokens.color.fg.default,
            fontSize: tokens.text.xl.size,
            fontWeight: "600",
            marginBottom: tokens.space["2"],
          }}
        >
          No Assets Found
        </Text>
        <Text
          className="text-fg/70 text-center mb-6"
          style={{
            color: tokens.color.fg.muted,
            textAlign: "center",
            marginBottom: tokens.space["6"],
          }}
        >
          Check back later for new music releases
        </Text>
        <TouchableOpacity
          className="bg-brand-primary py-3 px-6 rounded-md"
          style={{
            backgroundColor: tokens.color.brand.primary,
            paddingVertical: tokens.space["3"],
            paddingHorizontal: tokens.space["6"],
            borderRadius: tokens.radius.md,
          }}
        >
          <Text
            className="text-white font-semibold"
            style={{
              color: tokens.color.fg.inverse,
              fontWeight: "600",
            }}
          >
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.color.bg.default,
        }}
      >
        <ActivityIndicator size="large" color={tokens.color.brand.primary} />
        <Text
          className="text-fg/70 mt-2"
          style={{
            color: tokens.color.fg.muted,
            marginTop: tokens.space["2"],
          }}
        >
          Loading assets...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: tokens.space["6"],
          backgroundColor: tokens.color.bg.default,
        }}
      >
        <Text className="text-6xl mb-4" style={{ fontSize: 48, marginBottom: tokens.space["4"] }}>
          ⚠️
        </Text>
        <Text
          className="text-fg text-xl font-semibold mb-2 text-center"
          style={{
            color: tokens.color.fg.default,
            fontSize: tokens.text.xl.size,
            fontWeight: "600",
            marginBottom: tokens.space["2"],
            textAlign: "center",
          }}
        >
          Error Loading Assets
        </Text>
        <Text
          className="text-fg/70 text-center mb-4"
          style={{
            color: tokens.color.fg.muted,
            textAlign: "center",
            marginBottom: tokens.space["4"],
          }}
        >
          {error.message || "Something went wrong"}
        </Text>
        <TouchableOpacity
          className="bg-brand-primary py-3 px-6 rounded-md"
          style={{
            backgroundColor: tokens.color.brand.primary,
            paddingVertical: tokens.space["3"],
            paddingHorizontal: tokens.space["6"],
            borderRadius: tokens.radius.md,
          }}
          onPress={() => refetch()}
        >
          <Text
            className="text-white font-semibold"
            style={{
              color: tokens.color.fg.inverse,
              fontWeight: "600",
            }}
          >
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      style={{
        flex: 1,
        backgroundColor: tokens.color.bg.default,
      }}
    >
      <View
        className="p-4 border-b border-fg/10"
        style={{
          padding: tokens.space["4"],
          borderBottomColor: tokens.color.border.subtle,
          borderBottomWidth: 1,
        }}
      >
        <Text
          className="text-fg text-2xl font-semibold"
          style={{
            color: tokens.color.fg.default,
            fontSize: tokens.text["display-sm"].size,
            fontWeight: "600",
          }}
        >
          Browse
        </Text>
        <Text
          className="text-fg/70 text-sm mt-1"
          style={{
            color: tokens.color.fg.muted,
            fontSize: tokens.text.sm.size,
            marginTop: tokens.space["1"],
          }}
        >
          Discover new music and beats
        </Text>
      </View>

      {assets?.items && assets.items.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={assets?.items || []}
          keyExtractor={(item) => item.id}
          renderItem={renderAsset}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={tokens.color.brand.primary}
              colors={[tokens.color.brand.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
