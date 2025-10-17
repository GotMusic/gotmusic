import { Audio } from "expo-av";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function RecordScreen() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [durationMs, setDurationMs] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { granted } = await Audio.requestPermissionsAsync();
        setPermissionGranted(granted);
        if (granted) {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
        }
      } catch (error) {
        console.error("Permission request failed:", error);
        setPermissionGranted(false);
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      setIsLoading(true);
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
      setDurationMs(0);

      // Update duration live
      rec.setOnRecordingStatusUpdate((status) => {
        if (status.durationMillis) {
          setDurationMs(status.durationMillis);
        }
      });
    } catch (error) {
      console.error("Failed to start recording:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      // Clean up
      setRecording(null);
      setDurationMs(0);

      // Navigate to library after stop (temp behavior per issue)
      router.push("/library");
    } catch (error) {
      console.error("Failed to stop recording:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Permission denied state
  if (permissionGranted === false) {
    return (
      <View className="flex-1 bg-bg items-center justify-center p-6">
        <Text className="text-6xl mb-4">🎤</Text>
        <Text className="text-fg text-xl font-semibold mb-2 text-center">
          Microphone Access Required
        </Text>
        <Text className="text-fg/70 text-center">
          GotMusic needs microphone access to record audio. Please enable it in your device
          settings.
        </Text>
      </View>
    );
  }

  // Permission loading state
  if (permissionGranted === null) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator size="large" color="#6AE6A6" />
        <Text className="text-fg/70 mt-2">Checking permissions...</Text>
      </View>
    );
  }

  const isRecording = !!recording;
  const durationSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <View className="flex-1 bg-bg">
      {/* Header */}
      <View className="p-4 border-b border-border-hairline">
        <Text className="text-fg text-2xl font-semibold">Record</Text>
        <Text className="text-fg/70 text-sm mt-1">
          {isRecording ? "Recording in progress..." : "Tap to start recording"}
        </Text>
      </View>

      {/* Recording UI */}
      <View className="flex-1 items-center justify-center p-6">
        {/* Duration Display */}
        <View className="mb-8">
          <Text
            className={`text-6xl font-mono font-bold ${
              isRecording ? "text-brand-primary" : "text-fg/50"
            }`}
          >
            {formattedTime}
          </Text>
          {isRecording && (
            <View className="flex-row items-center justify-center mt-2">
              <View className="w-3 h-3 rounded-full bg-danger mr-2 animate-pulse" />
              <Text className="text-fg/70 text-sm">Recording...</Text>
            </View>
          )}
        </View>

        {/* Record/Stop Button */}
        {!isRecording ? (
          <TouchableOpacity
            onPress={startRecording}
            disabled={isLoading}
            className="w-24 h-24 rounded-full bg-brand-primary items-center justify-center shadow-glow-brand"
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#0B0D12" />
            ) : (
              <Text className="text-6xl">🎤</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={stopRecording}
            disabled={isLoading}
            className="w-24 h-24 rounded-full bg-danger items-center justify-center"
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <View className="w-10 h-10 bg-white rounded-sm" />
            )}
          </TouchableOpacity>
        )}

        {/* Instructions */}
        <View className="mt-8 px-6">
          <Text className="text-fg/70 text-center text-sm">
            {!isRecording
              ? "Tap the microphone to start recording high-quality audio"
              : "Tap the stop button when finished. Your recording will be saved to your library."}
          </Text>
        </View>
      </View>
    </View>
  );
}
