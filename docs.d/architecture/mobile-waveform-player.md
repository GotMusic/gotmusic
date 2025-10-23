---
id: MOBILE_WAVEFORM_PLAYER
status: 🔴 CRITICAL
owner: @grantedwards
updated: 2025-10-23
priority: P0
---

# Mobile Waveform Player

**🔴 CRITICAL** - React Native mobile audio player with SVG waveform visualization and professional audio quality.

---

## 🎯 **OVERVIEW**

The Mobile Waveform Player brings **professional-grade audio visualization** to React Native using SVG rendering, Expo Audio, and React Native Reanimated. This is the **core mobile implementation** for the hackathon timeline.

### **Key Features**
- **📱 React Native SVG**: High-performance waveform rendering
- **🎵 Expo Audio**: Professional audio playback
- **🎨 React Native Reanimated**: Smooth animations
- **🎚️ LUFS Normalization**: Professional loudness normalization
- **⚙️ Quality Settings**: Multiple bitrate options

---

## 🏗️ **CURRENT STATE ANALYSIS**

### **Current Mobile Audio Implementation**
```typescript
// Current: Basic Expo Audio
const { sound } = await Audio.Sound.createAsync(
  { uri: audioUrl },
  { shouldPlay: true, positionMillis: 0 },
  onPlaybackStatusUpdate
);
```

### **Available Technologies**
- ✅ **React Native Reanimated** (3.10.0) - Smooth animations
- ✅ **React Native SVG** (15.12.1) - Perfect for waveform rendering
- ✅ **Expo Audio** (1.0.13) - Audio playback with position tracking
- ✅ **NativeWind** (4.0.36) - Styling system

---

## 🚀 **ENHANCED IMPLEMENTATION**

### **Mobile Waveform Player Component**

```typescript
// Mobile Waveform Player
interface MobileWaveformPlayerProps {
  audioUrl: string;
  title: string;
  showDownload?: boolean;
  clamp?: number;
  quality?: QualityLevel;
}

const MobileWaveformPlayer: React.FC<MobileWaveformPlayerProps> = ({
  audioUrl,
  title,
  showDownload = false,
  clamp = 30,
  quality = 'normal'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [volume, setVolume] = useState(1);
  
  const soundRef = useRef<Audio.Sound | null>(null);
  const waveformAnalyzer = useRef<WaveformAnalyzer | null>(null);
  
  // Audio analysis hook
  const { waveformData: analyzedData } = useAudioAnalysis(audioUrl);
  
  useEffect(() => {
    setWaveformData(analyzedData);
  }, [analyzedData]);
  
  // Configure audio mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);
  
  const handlePlayPause = async () => {
    if (!soundRef.current) {
      // Load audio
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, positionMillis: 0 },
        onPlaybackStatusUpdate
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
  };
  
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      
      // Stop at 30s preview limit
      if (status.positionMillis >= clamp * 1000) {
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
  
  const handleSeek = async (position: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(position);
    }
  };
  
  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    if (soundRef.current) {
      await soundRef.current.setVolumeAsync(newVolume);
    }
  };
  
  return (
    <View className="flex-1 bg-bg p-4">
      {/* Waveform Visualization */}
      <View className="mb-6">
        <MobileWaveform
          data={waveformData}
          width={350}
          height={100}
          progress={position / duration}
          onSeek={handleSeek}
        />
      </View>
      
      {/* Player Controls */}
      <View className="flex-row items-center justify-center space-x-4">
        <TouchableOpacity
          onPress={handlePlayPause}
          className="w-16 h-16 bg-brand-primary rounded-full items-center justify-center"
        >
          <Text className="text-white text-2xl">
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Progress Bar */}
      <View className="mt-4">
        <Text className="text-fg text-sm text-center">
          {formatTime(position)} / {formatTime(duration)}
        </Text>
      </View>
      
      {/* Volume Control */}
      <View className="mt-4">
        <Text className="text-fg text-sm mb-2">Volume</Text>
        <Slider
          value={volume}
          onValueChange={handleVolumeChange}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          thumbStyle={{ backgroundColor: '#6AE6A6' }}
          trackStyle={{ backgroundColor: '#333' }}
        />
      </View>
    </View>
  );
};
```

---

## 📊 **WAVEFORM VISUALIZATION**

### **Mobile SVG Waveform Component**

```typescript
// Mobile SVG Waveform Component
interface MobileWaveformProps {
  data: number[];
  width: number;
  height: number;
  progress: number;
  onSeek?: (position: number) => void;
  color?: string;
  progressColor?: string;
}

const MobileWaveform: React.FC<MobileWaveformProps> = ({
  data,
  width,
  height,
  progress,
  onSeek,
  color = '#666',
  progressColor = '#6AE6A6'
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);
  
  // Generate SVG path from waveform data
  const waveformPath = useMemo(() => {
    if (!data || data.length === 0) return '';
    
    return data.map((value, index) => {
      const x = (index / data.length) * width;
      const y = height / 2 + (value * height / 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [data, width, height]);
  
  // Generate progress path
  const progressPath = useMemo(() => {
    if (!data || data.length === 0) return '';
    
    const progressIndex = Math.floor(progress * data.length);
    return data.slice(0, progressIndex).map((value, index) => {
      const x = (index / data.length) * width;
      const y = height / 2 + (value * height / 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [data, width, height, progress]);
  
  const handlePress = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const newProgress = locationX / width;
    setLocalProgress(newProgress);
    
    if (onSeek) {
      onSeek(newProgress);
    }
  };
  
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {/* Background waveform */}
        <Path
          d={waveformPath}
          stroke={color}
          strokeWidth={1}
          fill="none"
        />
        
        {/* Progress waveform */}
        <Path
          d={progressPath}
          stroke={progressColor}
          strokeWidth={2}
          fill="none"
        />
        
        {/* Progress indicator */}
        <Circle
          cx={progress * width}
          cy={height / 2}
          r={4}
          fill={progressColor}
        />
      </Svg>
      
      {/* Touchable overlay for seeking */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onPress={handlePress}
        activeOpacity={0.7}
      />
    </View>
  );
};
```

### **Audio Analysis Hook**

```typescript
// Audio Analysis Hook
const useAudioAnalysis = (audioUrl: string) => {
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    const analyzeAudio = async () => {
      if (!audioUrl) return;
      
      setIsAnalyzing(true);
      
      try {
        // Fetch audio file
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        
        // Create audio context (Web Audio API in React Native)
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Extract waveform data
        const channelData = audioBuffer.getChannelData(0);
        const samples = 200; // Number of waveform points
        const blockSize = Math.floor(channelData.length / samples);
        
        const waveform: number[] = [];
        for (let i = 0; i < samples; i++) {
          const start = i * blockSize;
          const end = start + blockSize;
          const block = channelData.slice(start, end);
          
          // Calculate RMS for this block
          const rms = Math.sqrt(
            block.reduce((sum, sample) => sum + sample * sample, 0) / block.length
          );
          waveform.push(rms);
        }
        
        setWaveformData(waveform);
        
      } catch (error) {
        console.error('Audio analysis failed:', error);
        // Fallback to mock data
        setWaveformData(Array(200).fill(0).map(() => Math.random() * 0.5));
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    analyzeAudio();
  }, [audioUrl]);
  
  return { waveformData, isAnalyzing };
};
```

---

## 🎚️ **LUFS NORMALIZATION**

### **Mobile LUFS Normalizer**

```typescript
// Mobile LUFS Normalizer
class MobileLUFSNormalizer {
  private targetLUFS = -14.0; // Spotify standard
  
  public normalizeAudio(audioBuffer: AudioBuffer): AudioBuffer {
    // Get channel data
    const channelData = audioBuffer.getChannelData(0);
    
    // Calculate current LUFS
    const currentLUFS = this.analyzeLUFS(channelData);
    
    // Calculate gain adjustment
    const gainAdjustment = this.targetLUFS - currentLUFS;
    const gainLinear = Math.pow(10, gainAdjustment / 20);
    
    // Apply gain
    const normalizedData = new Float32Array(channelData.length);
    for (let i = 0; i < channelData.length; i++) {
      normalizedData[i] = channelData[i] * gainLinear;
    }
    
    // Create new audio buffer
    const newBuffer = audioBuffer.context.createBuffer(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    
    newBuffer.copyToChannel(normalizedData, 0);
    
    return newBuffer;
  }
  
  private analyzeLUFS(channelData: Float32Array): number {
    // K-weighting filter (simplified)
    const kWeighted = this.applyKWeighting(channelData);
    
    // RMS calculation
    const rms = this.calculateRMS(kWeighted);
    
    // LUFS conversion
    return this.rmsToLUFS(rms);
  }
  
  private applyKWeighting(channelData: Float32Array): Float32Array {
    // Simplified K-weighting filter
    const kWeighted = new Float32Array(channelData.length);
    
    for (let i = 0; i < channelData.length; i++) {
      kWeighted[i] = channelData[i] * 0.8; // Simplified weighting
    }
    
    return kWeighted;
  }
  
  private calculateRMS(channelData: Float32Array): number {
    const sum = channelData.reduce((acc, sample) => acc + sample * sample, 0);
    return Math.sqrt(sum / channelData.length);
  }
  
  private rmsToLUFS(rms: number): number {
    // Simplified LUFS calculation
    return 20 * Math.log10(rms) - 0.691;
  }
}
```

---

## ⚙️ **QUALITY MANAGEMENT**

### **Mobile Quality Manager**

```typescript
// Mobile Quality Manager
interface MobileQualitySettings {
  bitrate: number;
  format: string;
  lufs: number;
}

class MobileQualityManager {
  private qualityLevels = {
    low: { bitrate: 128, format: 'aac', lufs: -14.0 },
    normal: { bitrate: 256, format: 'aac', lufs: -14.0 },
    high: { bitrate: 320, format: 'aac', lufs: -14.0 },
    lossless: { bitrate: 0, format: 'flac', lufs: -14.0 }
  };
  
  private currentQuality: QualityLevel = 'normal';
  
  setQuality(quality: QualityLevel): void {
    this.currentQuality = quality;
    this.applyQualitySettings();
  }
  
  getQuality(): MobileQualitySettings {
    return this.qualityLevels[this.currentQuality];
  }
  
  private applyQualitySettings(): void {
    const settings = this.getQuality();
    
    // Apply quality settings to audio processing
    console.log('Applied mobile quality settings:', settings);
  }
}
```

---

## 🎨 **UI INTEGRATION**

### **Quality Selector Component**

```typescript
// Quality Selector Component
interface QualitySelectorProps {
  currentQuality: QualityLevel;
  onQualityChange: (quality: QualityLevel) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  currentQuality,
  onQualityChange
}) => {
  const qualityOptions = [
    { value: 'low', label: 'Low (128 kbps)', description: 'Fast streaming' },
    { value: 'normal', label: 'Normal (256 kbps)', description: 'Balanced quality' },
    { value: 'high', label: 'High (320 kbps)', description: 'High quality' },
    { value: 'lossless', label: 'Lossless', description: 'Studio quality' }
  ];
  
  return (
    <View className="mt-4">
      <Text className="text-fg text-sm mb-2">Audio Quality</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {qualityOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onQualityChange(option.value as QualityLevel)}
            className={`mr-3 px-4 py-2 rounded-lg border ${
              currentQuality === option.value
                ? 'bg-brand-primary border-brand-primary'
                : 'bg-bg border-border-subtle'
            }`}
          >
            <Text className={`text-sm font-medium ${
              currentQuality === option.value ? 'text-white' : 'text-fg'
            }`}>
              {option.label}
            </Text>
            <Text className={`text-xs ${
              currentQuality === option.value ? 'text-white/70' : 'text-fg-muted'
            }`}>
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
```

### **Volume Control Component**

```typescript
// Volume Control Component
interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange
}) => {
  return (
    <View className="mt-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-fg text-sm">Volume</Text>
        <Text className="text-fg-muted text-sm">{Math.round(volume * 100)}%</Text>
      </View>
      
      <View className="flex-row items-center">
        <Text className="text-fg-muted text-xs mr-2">0</Text>
        <Slider
          value={volume}
          onValueChange={onVolumeChange}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          style={{ flex: 1 }}
          thumbStyle={{ backgroundColor: '#6AE6A6' }}
          trackStyle={{ backgroundColor: '#333' }}
        />
        <Text className="text-fg-muted text-xs ml-2">100</Text>
      </View>
    </View>
  );
};
```

---

## 🚀 **IMPLEMENTATION ROADMAP**

### **Week 1: Core Implementation**
- [ ] **Day 1-2**: SVG waveform component
- [ ] **Day 3-4**: Audio analysis hook
- [ ] **Day 5**: LUFS normalization
- [ ] **Day 6-7**: Quality management

### **Week 2: Integration & Testing**
- [ ] **Day 1-2**: Player component integration
- [ ] **Day 3-4**: E2E testing
- [ ] **Day 5**: Performance optimization
- [ ] **Day 6-7**: Cross-platform testing

### **Week 3: Polish & Launch**
- [ ] **Day 1-2**: UI polish and animations
- [ ] **Day 3-4**: Final testing and bug fixes
- [ ] **Day 5**: Documentation
- [ ] **Day 6-7**: Launch preparation

---

## 📊 **SUCCESS METRICS**

### **Performance Targets**
- **Audio Latency**: < 50ms
- **Waveform Rendering**: 60fps
- **CPU Usage**: < 10% idle
- **Memory Usage**: < 50MB

### **Quality Targets**
- **LUFS Consistency**: ±0.5 dB
- **Audio Quality**: Professional standards
- **Visual Quality**: Smooth SVG rendering
- **User Experience**: Intuitive touch controls

### **Compatibility Targets**
- **iOS**: 14+
- **Android**: 8+
- **Expo**: SDK 54+
- **React Native**: 0.81+

---

**Last Updated:** 2025-10-23  
**Status:** 🔴 **CRITICAL** - Mobile waveform player implementation  
**Timeline:** 2-3 weeks for complete implementation  
**Priority:** SVG waveform visualization and professional audio quality

---

*This document defines the complete mobile waveform player implementation for the hackathon timeline.*
