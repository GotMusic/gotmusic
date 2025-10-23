---
id: THIRTY_SECOND_PREVIEW_LOGIC
status: 🔴 CRITICAL
owner: @grantedwards
updated: 2025-10-23
priority: P0
---

# 30-Second Preview Logic

**🔴 CRITICAL** - Consistent 30-second preview logic across web and mobile platforms with professional audio quality.

---

## 🎯 **OVERVIEW**

The 30-Second Preview Logic ensures **consistent preview behavior** across all platforms while maintaining **professional audio quality** and **seamless user experience**. This is the **core preview implementation** for the hackathon timeline.

### **Key Features**
- **⏱️ 30-Second Limit**: Consistent preview duration
- **🔄 Cross-Platform**: Web and mobile implementation
- **🎵 Professional Quality**: LUFS normalization
- **🎨 Seamless UX**: Smooth preview experience

---

## 🏗️ **CURRENT STATE ANALYSIS**

### **Current Implementation**
```typescript
// Current: Basic 30s limit
const PREVIEW_DURATION_MS = 30_000; // 30 seconds

if (status.positionMillis >= PREVIEW_DURATION_MS) {
  soundRef.current?.pauseAsync();
  setIsPlaying(false);
}
```

### **Limitations**
- ❌ No quality management
- ❌ No LUFS normalization
- ❌ Basic preview experience
- ❌ No cross-platform consistency

---

## 🚀 **ENHANCED IMPLEMENTATION**

### **Preview Logic Interface**

```typescript
// Preview Logic Interface
interface PreviewLogic {
  duration: number; // 30 seconds
  quality: QualityLevel;
  lufs: number; // -14.0 for Spotify standard
  format: string; // 'aac' for previews
  bitrate: number; // 128 kbps for previews
}

interface PreviewSettings {
  duration: number;
  quality: QualityLevel;
  lufs: number;
  format: string;
  bitrate: number;
  fadeOut: boolean;
  fadeOutDuration: number;
}

class PreviewManager {
  private settings: PreviewSettings = {
    duration: 30_000, // 30 seconds
    quality: 'low', // 128 kbps for previews
    lufs: -14.0, // Spotify standard
    format: 'aac',
    bitrate: 128,
    fadeOut: true,
    fadeOutDuration: 1000 // 1 second fade out
  };
  
  private lufsNormalizer: LUFSNormalizer;
  private qualityManager: QualityManager;
  
  constructor() {
    this.lufsNormalizer = new LUFSNormalizer();
    this.qualityManager = new QualityManager();
  }
  
  getPreviewSettings(): PreviewSettings {
    return this.settings;
  }
  
  setPreviewSettings(settings: Partial<PreviewSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }
  
  async processPreviewAudio(audioBuffer: AudioBuffer): Promise<AudioBuffer> {
    // Apply LUFS normalization
    const normalizedBuffer = this.lufsNormalizer.normalizeAudio(audioBuffer);
    
    // Apply quality settings
    const qualityBuffer = this.qualityManager.processAudio(normalizedBuffer, this.settings.quality);
    
    // Apply fade out if enabled
    if (this.settings.fadeOut) {
      return this.applyFadeOut(qualityBuffer);
    }
    
    return qualityBuffer;
  }
  
  private applyFadeOut(audioBuffer: AudioBuffer): AudioBuffer {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const fadeOutSamples = Math.floor(this.settings.fadeOutDuration * sampleRate / 1000);
    
    const newBuffer = audioBuffer.context.createBuffer(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    
    const newChannelData = newBuffer.getChannelData(0);
    
    // Copy original data
    for (let i = 0; i < channelData.length; i++) {
      newChannelData[i] = channelData[i];
    }
    
    // Apply fade out
    const fadeStart = channelData.length - fadeOutSamples;
    for (let i = fadeStart; i < channelData.length; i++) {
      const fadeProgress = (i - fadeStart) / fadeOutSamples;
      const fadeGain = 1 - fadeProgress;
      newChannelData[i] *= fadeGain;
    }
    
    return newBuffer;
  }
}
```

---

## 🌐 **WEB IMPLEMENTATION**

### **Web Preview Player**

```typescript
// Web Preview Player
interface WebPreviewPlayerProps {
  src: string;
  title: string;
  onPreviewEnd?: () => void;
  onPreviewStart?: () => void;
}

const WebPreviewPlayer: React.FC<WebPreviewPlayerProps> = ({
  src,
  title,
  onPreviewEnd,
  onPreviewStart
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  
  const previewManager = useRef<PreviewManager>(new PreviewManager());
  
  useEffect(() => {
    // Initialize Web Audio API
    audioContextRef.current = new AudioContext();
    gainNodeRef.current = audioContextRef.current.createGain();
    analyserNodeRef.current = audioContextRef.current.createAnalyser();
    
    // Configure analyser
    analyserNodeRef.current.fftSize = 2048;
    analyserNodeRef.current.smoothingTimeConstant = 0.8;
    
    // Connect audio nodes
    gainNodeRef.current.connect(analyserNodeRef.current);
    analyserNodeRef.current.connect(audioContextRef.current.destination);
    
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
    };
  }, []);
  
  const loadPreviewAudio = async () => {
    if (!audioContextRef.current) return;
    
    try {
      // Fetch audio data
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      
      // Decode audio
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      // Process preview audio
      const previewBuffer = await previewManager.current.processPreviewAudio(audioBuffer);
      
      // Create source node
      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = previewBuffer;
      sourceNodeRef.current.connect(gainNodeRef.current!);
      
      // Set up event listeners
      sourceNodeRef.current.onended = () => {
        setIsPlaying(false);
        setPosition(0);
        onPreviewEnd?.();
      };
      
      // Generate waveform data
      const waveformData = generateWaveformData(previewBuffer);
      setWaveformData(waveformData);
      
    } catch (error) {
      console.error('Failed to load preview audio:', error);
    }
  };
  
  const handlePlayPause = async () => {
    if (!audioContextRef.current || !sourceNodeRef.current) return;
    
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    if (isPlaying) {
      sourceNodeRef.current.stop();
      setIsPlaying(false);
    } else {
      sourceNodeRef.current.start();
      setIsPlaying(true);
      onPreviewStart?.();
      
      // Start position tracking
      startPositionTracking();
    }
  };
  
  const startPositionTracking = () => {
    const updatePosition = () => {
      if (!sourceNodeRef.current || !audioContextRef.current) return;
      
      const currentTime = audioContextRef.current.currentTime;
      const startTime = sourceNodeRef.current.startTime || 0;
      const elapsed = currentTime - startTime;
      
      setPosition(elapsed * 1000); // Convert to milliseconds
      
      // Check if preview should end
      if (elapsed >= 30) {
        sourceNodeRef.current.stop();
        setIsPlaying(false);
        setPosition(0);
        onPreviewEnd?.();
        return;
      }
      
      requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
  };
  
  return (
    <div className="preview-player">
      {/* Waveform Visualization */}
      <CanvasWaveform
        data={waveformData}
        width={800}
        height={100}
        progress={position / 30000}
      />
      
      {/* Player Controls */}
      <div className="player-controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div className="progress-info">
          <span>{formatTime(position)}</span>
          <span>/</span>
          <span>0:30</span>
        </div>
      </div>
    </div>
  );
};
```

---

## 📱 **MOBILE IMPLEMENTATION**

### **Mobile Preview Player**

```typescript
// Mobile Preview Player
interface MobilePreviewPlayerProps {
  audioUrl: string;
  title: string;
  onPreviewEnd?: () => void;
  onPreviewStart?: () => void;
}

const MobilePreviewPlayer: React.FC<MobilePreviewPlayerProps> = ({
  audioUrl,
  title,
  onPreviewEnd,
  onPreviewStart
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  
  const soundRef = useRef<Audio.Sound | null>(null);
  const previewManager = useRef<PreviewManager>(new PreviewManager());
  
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
      // Load preview audio
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, positionMillis: 0 },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setIsPlaying(true);
      onPreviewStart?.();
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
          onPreviewStart?.();
        }
      }
    }
  };
  
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      
      // Stop at 30s preview limit
      if (status.positionMillis >= 30_000) {
        soundRef.current?.pauseAsync();
        setIsPlaying(false);
        setPosition(0);
        onPreviewEnd?.();
      }
      
      // Handle natural end
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
        onPreviewEnd?.();
      }
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
          progress={position / 30000}
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
          {formatTime(position)} / 0:30
        </Text>
      </View>
    </View>
  );
};
```

---

## 🎚️ **LUFS NORMALIZATION**

### **Preview LUFS Normalizer**

```typescript
// Preview LUFS Normalizer
class PreviewLUFSNormalizer {
  private targetLUFS = -14.0; // Spotify standard
  
  public normalizePreviewAudio(audioBuffer: AudioBuffer): AudioBuffer {
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

### **Preview Quality Manager**

```typescript
// Preview Quality Manager
class PreviewQualityManager {
  private previewSettings = {
    bitrate: 128, // 128 kbps for previews
    format: 'aac',
    lufs: -14.0,
    fadeOut: true,
    fadeOutDuration: 1000
  };
  
  public processPreviewAudio(audioBuffer: AudioBuffer): AudioBuffer {
    // Apply quality settings
    const qualityBuffer = this.applyQualitySettings(audioBuffer);
    
    // Apply fade out if enabled
    if (this.previewSettings.fadeOut) {
      return this.applyFadeOut(qualityBuffer);
    }
    
    return qualityBuffer;
  }
  
  private applyQualitySettings(audioBuffer: AudioBuffer): AudioBuffer {
    // Apply bitrate and format settings
    // This would integrate with the audio processing pipeline
    return audioBuffer;
  }
  
  private applyFadeOut(audioBuffer: AudioBuffer): AudioBuffer {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const fadeOutSamples = Math.floor(this.previewSettings.fadeOutDuration * sampleRate / 1000);
    
    const newBuffer = audioBuffer.context.createBuffer(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    
    const newChannelData = newBuffer.getChannelData(0);
    
    // Copy original data
    for (let i = 0; i < channelData.length; i++) {
      newChannelData[i] = channelData[i];
    }
    
    // Apply fade out
    const fadeStart = channelData.length - fadeOutSamples;
    for (let i = fadeStart; i < channelData.length; i++) {
      const fadeProgress = (i - fadeStart) / fadeOutSamples;
      const fadeGain = 1 - fadeProgress;
      newChannelData[i] *= fadeGain;
    }
    
    return newBuffer;
  }
}
```

---

## 🚀 **IMPLEMENTATION ROADMAP**

### **Week 1: Core Implementation**
- [ ] **Day 1-2**: Preview logic interface
- [ ] **Day 3-4**: Web implementation
- [ ] **Day 5**: Mobile implementation
- [ ] **Day 6-7**: Cross-platform testing

### **Week 2: Quality & Testing**
- [ ] **Day 1-2**: LUFS normalization
- [ ] **Day 3-4**: Quality management
- [ ] **Day 5**: E2E testing
- [ ] **Day 6-7**: Performance optimization

### **Week 3: Polish & Launch**
- [ ] **Day 1-2**: UI polish
- [ ] **Day 3-4**: Final testing
- [ ] **Day 5**: Documentation
- [ ] **Day 6-7**: Launch preparation

---

## 📊 **SUCCESS METRICS**

### **Performance Targets**
- **Preview Latency**: < 100ms
- **Audio Quality**: Professional standards
- **Cross-Platform**: Consistent behavior
- **User Experience**: Seamless preview

### **Quality Targets**
- **LUFS Consistency**: ±0.5 dB
- **Preview Duration**: Exactly 30 seconds
- **Fade Out**: Smooth 1-second fade
- **Audio Quality**: 128 kbps AAC

### **Compatibility Targets**
- **Web**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS 14+, Android 8+
- **Audio**: Web Audio API + Expo Audio
- **Quality**: Professional standards

---

**Last Updated:** 2025-10-23  
**Status:** 🔴 **CRITICAL** - 30-second preview logic implementation  
**Timeline:** 2-3 weeks for complete implementation  
**Priority:** Cross-platform consistency and professional audio quality

---

*This document defines the complete 30-second preview logic implementation for the hackathon timeline.*
