import { tokens } from "@gotmusic/tokens/native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

      // Stop recording and get file URI
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (!uri) {
        throw new Error("Recording URI not available");
      }

      const finalDurationSec = Math.floor(durationMs / 1000);

      // Clean up recording state
      setRecording(null);
      setDurationMs(0);

      // Upload pipeline: sign → PUT → complete
      await uploadRecording(uri, finalDurationSec);
    } catch (error) {
      console.error("Failed to stop/upload recording:", error);
      Alert.alert(
        "Upload Failed",
        error instanceof Error ? error.message : "Failed to upload recording. Please try again.",
        [
          {
            text: "OK",
            style: "default",
          },
        ],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const uploadRecording = async (fileUri: string, durationSec: number) => {
    // Step 1: Get signed upload URL
    const signResponse = await fetch("http://localhost:3000/api/recordings/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: `recording-${Date.now()}.m4a`,
        contentType: "audio/m4a",
        fileSize: (await FileSystem.getInfoAsync(fileUri)).exists
          ? ((await FileSystem.getInfoAsync(fileUri)).size ?? 0)
          : 0,
      }),
    });

    if (!signResponse.ok) {
      const errorData = await signResponse.json();
      throw new Error(errorData.error || "Failed to get upload URL");
    }

    const { url, key, contentType } = await signResponse.json();

    // Step 2: Upload file to signed URL
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error("Recording file not found");
    }

    const uploadResponse = await FileSystem.uploadAsync(url, fileUri, {
      httpMethod: "PUT",
      headers: {
        "Content-Type": contentType,
      },
    });

    if (uploadResponse.status !== 200) {
      throw new Error(`Upload failed with status ${uploadResponse.status}`);
    }

    // Step 3: Notify server to create draft asset
    const completeResponse = await fetch("http://localhost:3000/api/recordings/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "user_mobile_001", // TODO: Replace with actual user ID from auth
        fileKey: key,
        cid: key, // Use key as CID for MVP
        durationSec,
        title: `Recording ${new Date().toLocaleString()}`,
      }),
    });

    if (!completeResponse.ok) {
      const errorData = await completeResponse.json();
      throw new Error(errorData.error || "Failed to create draft asset");
    }

    const { assetId } = await completeResponse.json();

    // Success! Show confirmation and navigate to library
    Alert.alert(
      "Recording Saved",
      "Your recording has been uploaded successfully and saved to your library.",
      [
        {
          text: "View Library",
          onPress: () => router.push("/library"),
        },
      ],
    );
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
    <SafeAreaView className="flex-1 bg-bg">
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

        {/* Record/Stop Button - Large version for the screen */}
        {!isRecording ? (
          <TouchableOpacity
            onPress={startRecording}
            disabled={isLoading}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: tokens.color.brand.primary,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: tokens.color.brand.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 16,
            }}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={{ fontSize: 48 }}>🎤</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={stopRecording}
            disabled={isLoading}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: tokens.color.palette.semantic.danger,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: tokens.color.palette.semantic.danger,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 16,
            }}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 8,
                }}
              />
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
    </SafeAreaView>
  );
}
