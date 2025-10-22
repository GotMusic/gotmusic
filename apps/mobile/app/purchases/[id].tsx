import { fetchAssetDownloadUrl, useAsset } from "@gotmusic/api";
import { type AVPlaybackStatus, Audio } from "expo-audio";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

const PREVIEW_DURATION_MS = 30_000; // 30 seconds

export default function PurchaseDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: asset, isLoading, error } = useAsset(id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Configure audio mode on mount
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true, // Play even when device is muted
      staysActiveInBackground: false,
      shouldDuckAndroid: true, // Lower other audio when playing
    });

    return () => {
      // Cleanup on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Fetch download URL when asset loads
  useEffect(() => {
    if (asset?.id) {
      fetchAssetDownloadUrl(asset.id)
        .then((result) => setAudioUrl(result.url))
        .catch((err) => console.error("Failed to fetch audio URL:", err));
    }
  }, [asset?.id]);

  const handlePlayPause = async () => {
    if (!audioUrl) return;

    try {
      if (!soundRef.current) {
        // Load audio
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true, positionMillis: 0 },
          onPlaybackStatusUpdate,
        );
        soundRef.current = sound;
        setIsPlaying(true);
      } else {
        // Toggle play/pause
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await soundRef.current.pauseAsync();
            setIsPlaying(false);
          } else {
            await soundRef.current.playAsync();
            setIsPlaying(true);
          }
        }
      }
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);

      // Stop at 30s preview limit
      if (status.positionMillis >= PREVIEW_DURATION_MS) {
        soundRef.current?.pauseAsync();
        setIsPlaying(false);
      }

      // Handle natural end
      if (status.didJustFinish) {
        setIsPlaying(false);
        soundRef.current?.setPositionAsync(0);
      }
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-bg items-center justify-center p-4">
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text className="text-fg/70 mt-2">Loading asset...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-bg items-center justify-center p-4">
        <Text className="text-red-500 text-center text-lg">Error loading asset</Text>
        <Text className="text-fg/70 text-sm mt-2">{error.message}</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-fg/10 px-6 py-3 rounded-md">
          <Text className="text-fg">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  if (!asset) {
    return (
      <View className="flex-1 bg-bg items-center justify-center p-4">
        <Text className="text-fg/70">Asset not found</Text>
      </View>
    );
  }

  const previewDuration = Math.min(duration, PREVIEW_DURATION_MS);
  const progress = previewDuration > 0 ? (position / previewDuration) * 100 : 0;

  return (
    <View className="flex-1 bg-bg p-4">
      {/* Header */}
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-brand-primary">← Back</Text>
      </Pressable>

      {/* Asset Details */}
      <View className="rounded-lg border border-fg/10 bg-bg p-6 mb-6">
        <Text className="text-fg text-2xl font-semibold mb-2">{asset.title}</Text>
        <Text className="text-fg/70 text-lg mb-4">{asset.artist}</Text>
        <View className="flex-row gap-4">
          <Text className="text-fg/70">BPM: {asset.bpm ?? "—"}</Text>
          <Text className="text-fg/70">Key: {asset.keySig ?? "—"}</Text>
        </View>
        <View className="mt-4 pt-4 border-t border-fg/10">
          <Text className="text-brand-primary text-xl font-semibold">
            ${asset.priceAmount} {asset.priceCurrency}
          </Text>
        </View>
      </View>

      {/* Audio Player */}
      <View className="rounded-lg border border-fg/10 bg-bg p-6">
        <Text className="text-fg/70 text-sm mb-4">30-Second Preview</Text>

        {/* Progress Bar */}
        <View className="h-2 bg-fg/10 rounded-full mb-4 overflow-hidden">
          <View
            className="h-full bg-brand-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>

        {/* Time Display */}
        <View className="flex-row justify-between mb-4">
          <Text className="text-fg/70 text-sm">{formatTime(position)}</Text>
          <Text className="text-fg/70 text-sm">{formatTime(previewDuration)}</Text>
        </View>

        {/* Play/Pause Button */}
        <Pressable
          onPress={handlePlayPause}
          disabled={!audioUrl}
          className="bg-brand-primary py-4 rounded-md items-center active:opacity-80"
        >
          <Text className="text-white text-lg font-semibold">
            {isPlaying ? "⏸ Pause" : "▶ Play Preview"}
          </Text>
        </Pressable>

        {!audioUrl && <Text className="text-fg/70 text-sm text-center mt-2">Loading audio...</Text>}
      </View>

      {/* Info */}
      <Text className="text-fg/70 text-xs text-center mt-6">
        Preview is limited to 30 seconds. Purchase to access full track.
      </Text>
    </View>
  );
}
