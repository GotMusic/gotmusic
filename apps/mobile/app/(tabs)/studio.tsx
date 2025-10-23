import { tokens } from "@gotmusic/tokens/native";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Studio() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setUploading(false);
    Alert.alert("Upload Complete", "Your audio file has been uploaded successfully!");
  };

  const renderUploadSection = () => (
    <View
      className="rounded-lg border border-fg/10 bg-bg p-4 mb-6"
      style={{
        borderRadius: tokens.radius.lg,
        borderColor: tokens.color.border.subtle,
        backgroundColor: tokens.color.bg.default,
        padding: tokens.space["4"],
        marginBottom: tokens.space["6"],
      }}
    >
      <Text
        className="text-fg text-lg font-semibold mb-3"
        style={{
          color: tokens.color.fg.default,
          fontSize: tokens.text.lg.size,
          fontWeight: "600",
          marginBottom: tokens.space["3"],
        }}
      >
        Upload New Asset
      </Text>

      <TouchableOpacity
        className="border-2 border-dashed border-fg/30 bg-fg/5 py-8 px-4 rounded-lg items-center"
        style={{
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: tokens.color.fg.muted,
          backgroundColor: tokens.color.fg.subtle + "10",
          paddingVertical: tokens.space["8"],
          paddingHorizontal: tokens.space["4"],
          borderRadius: tokens.radius.lg,
          alignItems: "center",
        }}
        onPress={handleUpload}
        disabled={uploading}
      >
        {uploading ? (
          <View className="items-center">
            <ActivityIndicator size="large" color={tokens.color.brand.primary} />
            <Text
              className="text-fg mt-2"
              style={{
                color: tokens.color.fg.default,
                marginTop: tokens.space["2"],
              }}
            >
              Uploading... {uploadProgress}%
            </Text>
            <View
              className="w-full bg-fg/20 rounded-full h-2 mt-2"
              style={{
                width: "100%",
                backgroundColor: tokens.color.fg.muted + "30",
                borderRadius: tokens.radius.full,
                height: tokens.space["2"],
                marginTop: tokens.space["2"],
              }}
            >
              <View
                className="bg-brand-primary h-2 rounded-full"
                style={{
                  backgroundColor: tokens.color.brand.primary,
                  height: tokens.space["2"],
                  borderRadius: tokens.radius.full,
                  width: `${uploadProgress}%`,
                }}
              />
            </View>
          </View>
        ) : (
          <View className="items-center">
            <Text
              className="text-4xl mb-2"
              style={{ fontSize: 32, marginBottom: tokens.space["2"] }}
            >
              📁
            </Text>
            <Text
              className="text-fg font-semibold text-center"
              style={{
                color: tokens.color.fg.default,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Tap to Upload Audio
            </Text>
            <Text
              className="text-fg/70 text-sm text-center mt-1"
              style={{
                color: tokens.color.fg.muted,
                fontSize: tokens.text.sm.size,
                textAlign: "center",
                marginTop: tokens.space["1"],
              }}
            >
              WAV, AIFF, FLAC supported
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderDashboard = () => (
    <View
      className="rounded-lg border border-fg/10 bg-bg p-4 mb-6"
      style={{
        borderRadius: tokens.radius.lg,
        borderColor: tokens.color.border.subtle,
        backgroundColor: tokens.color.bg.default,
        padding: tokens.space["4"],
        marginBottom: tokens.space["6"],
      }}
    >
      <Text
        className="text-fg text-lg font-semibold mb-3"
        style={{
          color: tokens.color.fg.default,
          fontSize: tokens.text.lg.size,
          fontWeight: "600",
          marginBottom: tokens.space["3"],
        }}
      >
        Studio Dashboard
      </Text>

      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text
            className="text-fg/70 text-sm"
            style={{
              color: tokens.color.fg.muted,
              fontSize: tokens.text.sm.size,
            }}
          >
            Total Assets
          </Text>
          <Text
            className="text-fg text-2xl font-bold"
            style={{
              color: tokens.color.fg.default,
              fontSize: tokens.text["display-sm"].size,
              fontWeight: "700",
            }}
          >
            12
          </Text>
        </View>

        <View className="flex-1">
          <Text
            className="text-fg/70 text-sm"
            style={{
              color: tokens.color.fg.muted,
              fontSize: tokens.text.sm.size,
            }}
          >
            Total Sales
          </Text>
          <Text
            className="text-brand-primary text-2xl font-bold"
            style={{
              color: tokens.color.brand.primary,
              fontSize: tokens.text["display-sm"].size,
              fontWeight: "700",
            }}
          >
            $247.50
          </Text>
        </View>
      </View>

      <View className="flex-row gap-2">
        <Link
          href="/studio/assets"
          className="flex-1 bg-fg/10 py-2 px-4 rounded-md items-center"
          style={{
            backgroundColor: tokens.color.fg.muted + "20",
            paddingVertical: tokens.space["2"],
            paddingHorizontal: tokens.space["4"],
            borderRadius: tokens.radius.md,
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            className="text-fg font-medium"
            style={{
              color: tokens.color.fg.default,
              fontWeight: "500",
            }}
          >
            Manage Assets
          </Text>
        </Link>

        <Link
          href="/studio/sales"
          className="flex-1 bg-brand-primary/20 py-2 px-4 rounded-md items-center"
          style={{
            backgroundColor: tokens.color.brand.primary + "30",
            paddingVertical: tokens.space["2"],
            paddingHorizontal: tokens.space["4"],
            borderRadius: tokens.radius.md,
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            className="text-brand-primary font-medium"
            style={{
              color: tokens.color.brand.primary,
              fontWeight: "500",
            }}
          >
            View Sales
          </Text>
        </Link>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View
      className="rounded-lg border border-fg/10 bg-bg p-4"
      style={{
        borderRadius: tokens.radius.lg,
        borderColor: tokens.color.border.subtle,
        backgroundColor: tokens.color.bg.default,
        padding: tokens.space["4"],
      }}
    >
      <Text
        className="text-fg text-lg font-semibold mb-3"
        style={{
          color: tokens.color.fg.default,
          fontSize: tokens.text.lg.size,
          fontWeight: "600",
          marginBottom: tokens.space["3"],
        }}
      >
        Recent Activity
      </Text>

      <View className="space-y-3">
        <View className="flex-row items-center gap-3">
          <View
            className="w-2 h-2 bg-brand-primary rounded-full"
            style={{
              width: tokens.space["2"],
              height: tokens.space["2"],
              backgroundColor: tokens.color.brand.primary,
              borderRadius: tokens.radius.full,
            }}
          />
          <View className="flex-1">
            <Text
              className="text-fg text-sm"
              style={{
                color: tokens.color.fg.default,
                fontSize: tokens.text.sm.size,
              }}
            >
              "Midnight Glass" sold for $12.50
            </Text>
            <Text
              className="text-fg/50 text-xs"
              style={{
                color: tokens.color.fg.subtle,
                fontSize: tokens.text.xs.size,
              }}
            >
              2 hours ago
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View
            className="w-2 h-2 bg-fg/30 rounded-full"
            style={{
              width: tokens.space["2"],
              height: tokens.space["2"],
              backgroundColor: tokens.color.fg.muted,
              borderRadius: tokens.radius.full,
            }}
          />
          <View className="flex-1">
            <Text
              className="text-fg text-sm"
              style={{
                color: tokens.color.fg.default,
                fontSize: tokens.text.sm.size,
              }}
            >
              "Neon Dreams" uploaded successfully
            </Text>
            <Text
              className="text-fg/50 text-xs"
              style={{
                color: tokens.color.fg.subtle,
                fontSize: tokens.text.xs.size,
              }}
            >
              1 day ago
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View
            className="w-2 h-2 bg-fg/30 rounded-full"
            style={{
              width: tokens.space["2"],
              height: tokens.space["2"],
              backgroundColor: tokens.color.fg.muted,
              borderRadius: tokens.radius.full,
            }}
          />
          <View className="flex-1">
            <Text
              className="text-fg text-sm"
              style={{
                color: tokens.color.fg.default,
                fontSize: tokens.text.sm.size,
              }}
            >
              "Digital Sunset" published
            </Text>
            <Text
              className="text-fg/50 text-xs"
              style={{
                color: tokens.color.fg.subtle,
                fontSize: tokens.text.xs.size,
              }}
            >
              3 days ago
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      style={{
        flex: 1,
        backgroundColor: tokens.color.bg.default,
      }}
    >
      {/* Header */}
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
          Studio
        </Text>
        <Text
          className="text-fg/70 text-sm mt-1"
          style={{
            color: tokens.color.fg.muted,
            fontSize: tokens.text.sm.size,
            marginTop: tokens.space["1"],
          }}
        >
          Upload and manage your music assets
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 p-4"
        style={{
          flex: 1,
          padding: tokens.space["4"],
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderUploadSection()}
        {renderDashboard()}
        {renderRecentActivity()}
      </ScrollView>
    </SafeAreaView>
  );
}
