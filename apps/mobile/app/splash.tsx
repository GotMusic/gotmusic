import { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { router } from 'expo-router';
import { tokens } from '@gotmusic/tokens/native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-navigate after animation
    setTimeout(() => {
      router.replace('/auth-check');
    }, 2500);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: tokens.color.bg.default,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [
          { scale: scaleAnim },
          { rotate: rotate }
        ]
      }}>
        <Text style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: tokens.color.brand.primary,
          textAlign: 'center',
          marginBottom: tokens.space['4']
        }}>
          🎵
        </Text>
        <Text style={{
          fontSize: tokens.text['display-sm'].size,
          fontWeight: 'bold',
          color: tokens.color.fg.default,
          textAlign: 'center'
        }}>
          GotMusic
        </Text>
        <Text style={{
          fontSize: tokens.text.sm.size,
          color: tokens.color.fg.muted,
          textAlign: 'center',
          marginTop: tokens.space['2']
        }}>
          Decentralized Music Marketplace
        </Text>
      </Animated.View>
    </View>
  );
}
