import { tokens } from "@gotmusic/tokens/native";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../src/contexts/AuthContext";

const { width } = Dimensions.get("window");

const ONBOARDING_STEPS = [
  {
    title: "Welcome to GotMusic",
    description:
      "The decentralized marketplace for music creators and buyers. Buy, sell, and discover music with cryptocurrency.",
    icon: "🎵",
    color: tokens.color.brand.primary,
  },
  {
    title: "Buy & Sell Music",
    description:
      "Purchase beats, loops, and tracks with PYUSD cryptocurrency. Set your own prices and earn from your creations.",
    icon: "💰",
    color: tokens.color.palette.semantic.success,
  },
  {
    title: "Cross-Chain Payments",
    description:
      "Seamlessly pay with PYUSD across Ethereum and Base networks. Secure, fast, and decentralized.",
    icon: "🔗",
    color: tokens.color.palette.semantic.info,
  },
  {
    title: "Start Creating",
    description:
      "Upload your music and start earning from your creations. Join the decentralized music revolution.",
    icon: "🎤",
    color: tokens.color.palette.semantic.warning,
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setFirstTimeComplete } = useAuth();

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await setFirstTimeComplete();
    router.replace("/auth");
  };

  const skipOnboarding = () => {
    handleComplete();
  };

  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.color.bg.default,
      }}
    >
      {/* Progress Indicator */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: tokens.space["8"],
          paddingBottom: tokens.space["4"],
        }}
      >
        {ONBOARDING_STEPS.map((step, index) => (
          <View
            key={`step-${index}-${step.title}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                index === currentStep ? tokens.color.brand.primary : `${tokens.color.fg.muted}30`,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: tokens.space["6"],
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 80,
              textAlign: "center",
              marginBottom: tokens.space["8"],
            }}
          >
            {currentStepData.icon}
          </Text>

          <Text
            style={{
              fontSize: tokens.text["display-sm"].size,
              fontWeight: "bold",
              color: tokens.color.fg.default,
              textAlign: "center",
              marginBottom: tokens.space["6"],
              lineHeight: 32,
            }}
          >
            {currentStepData.title}
          </Text>

          <Text
            style={{
              fontSize: tokens.text.lg.size,
              color: tokens.color.fg.muted,
              textAlign: "center",
              lineHeight: 24,
              maxWidth: width * 0.8,
            }}
          >
            {currentStepData.description}
          </Text>
        </View>
      </ScrollView>

      {/* Navigation */}
      <View
        style={{
          padding: tokens.space["6"],
          borderTopColor: tokens.color.border.subtle,
          borderTopWidth: 1,
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={skipOnboarding}
            style={{
              paddingVertical: tokens.space["3"],
              paddingHorizontal: tokens.space["4"],
            }}
          >
            <Text
              style={{
                color: tokens.color.fg.muted,
                fontSize: tokens.text.lg.size,
                fontWeight: "500",
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextStep}
            style={{
              backgroundColor: tokens.color.brand.primary,
              paddingVertical: tokens.space["4"],
              paddingHorizontal: tokens.space["8"],
              borderRadius: tokens.radius.lg,
              minWidth: 120,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: tokens.color.fg.inverse,
                fontSize: tokens.text.lg.size,
                fontWeight: "600",
              }}
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
