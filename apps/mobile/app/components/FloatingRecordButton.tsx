import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { tokens } from '@gotmusic/tokens/native';
import { RecordIcon } from '@gotmusic/icons';

interface FloatingRecordButtonProps {
  onPress: () => void;
  isRecording?: boolean;
}

export default function FloatingRecordButton({ onPress, isRecording = false }: FloatingRecordButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      // Pulse animation when recording
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      // Rotation animation
      const rotate = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      );
      rotate.start();

      return () => {
        pulse.stop();
        rotate.stop();
      };
    } else {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [isRecording]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: isRecording 
            ? tokens.color.palette.semantic.danger 
            : tokens.color.brand.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -30,
          shadowColor: isRecording 
            ? tokens.color.palette.semantic.danger 
            : tokens.color.brand.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          transform: [
            { scale: scaleAnim },
            { scale: pulseAnim },
            { rotate: isRecording ? rotate : '0deg' }
          ],
        }}
      >
        <RecordIcon 
          size={24}
          stroke="inverse"
          fill={isRecording ? "danger" : "brand"}
          style={{ 
            color: 'white',
            transform: [{ scale: isRecording ? 1.1 : 1 }]
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
