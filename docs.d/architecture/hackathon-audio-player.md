---
id: HACKATHON_AUDIO_PLAYER
status: 🔴 CRITICAL
owner: @grantedwards
updated: 2025-10-23
priority: P0
---

# Hackathon Audio Player Implementation

**🔴 CRITICAL** - Focused audio player implementation for hackathon timeline with waveform visualization priority.

---

## 🎯 **HACKATHON SCOPE & PRIORITIES**

### **✅ WHAT WE'RE BUILDING (HACKATHON)**
1. **🎵 Enhanced Web Player** - Waveform + LUFS normalization
2. **📱 Mobile Waveform Player** - React Native SVG waveforms
3. **🔄 30s Preview Logic** - Consistent across platforms
4. **🎨 Professional UI** - Design system integration

### **⏰ TIMELINE: 2-3 WEEKS**
- **Week 1**: Web player enhancement + mobile waveform
- **Week 2**: Quality pipeline + testing
- **Week 3**: Polish + performance optimization

### **🚫 SAVING FOR LATER**
- Desktop standalone (JUCE C++)
- Advanced DAW integration
- Professional mastering tools
- Complex spatial audio

---

## 🌐 **WEB PLAYER ENHANCEMENT**

### **Current State Analysis**
```typescript
// Current: Basic HTML5 Audio
<audio ref={audioRef} src={src} preload="metadata" />
```

### **Enhanced Web Player**
```typescript
// Enhanced: Web Audio API + Canvas Waveform
interface EnhancedWebPlayer {
  // Audio Processing
  audioContext: AudioContext;
  gainNode: GainNode;
  analyserNode: AnalyserNode;
  
  // Waveform Visualization
  canvas: HTMLCanvasElement;
  waveformData: Float32Array;
  
  // Quality Control
  lufsNormalizer: LUFSNormalizer;
  qualityManager: QualityManager;
}
```

### **Implementation Steps**
1. **Replace HTML5 Audio** with Web Audio API
2. **Add Canvas Waveform** rendering
3. **Implement LUFS normalization**
4. **Add quality settings** (128k/256k/320k)
5. **Integrate with existing Player component**

---

## 📱 **MOBILE WAVEFORM PLAYER**

### **React Native Implementation**
```typescript
// Mobile Waveform Player Component
interface MobileWaveformPlayer {
  // Audio
  sound: Audio.Sound;
  position: number;
  duration: number;
  
  // Waveform
  waveformData: number[];
  waveformSvg: React.ReactElement;
  
  // Controls
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (position: number) => void;
}
```

### **Waveform Rendering with SVG**
```typescript
// Waveform SVG Component
const WaveformSvg = ({ data, width, height, progress }: WaveformProps) => {
  const path = useMemo(() => {
    return data.map((value, index) => {
      const x = (index / data.length) * width;
      const y = height / 2 + (value * height / 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [data, width, height]);
  
  return (
    <Svg width={width} height={height}>
      {/* Background waveform */}
      <Path d={path} stroke="#666" strokeWidth={1} fill="none" />
      
      {/* Progress waveform */}
      <Path 
        d={path} 
        stroke="#00ff00" 
        strokeWidth={2} 
        fill="none"
        strokeDasharray={`${progress * width} ${width}`}
      />
    </Svg>
  );
};
```

### **Audio Analysis for Waveform**
```typescript
// Audio Analysis Hook
const useAudioAnalysis = (audioUri: string) => {
  const [waveformData, setWaveformData] = useState<number[]>([]);
  
  useEffect(() => {
    const analyzeAudio = async () => {
      // Load audio file
      const response = await fetch(audioUri);
      const arrayBuffer = await response.arrayBuffer();
      
      // Create audio context
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Extract waveform data
      const channelData = audioBuffer.getChannelData(0);
      const samples = 200; // Number of waveform points
      const blockSize = Math.floor(channelData.length / samples);
      
      const waveform = [];
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
    };
    
    analyzeAudio();
  }, [audioUri]);
  
  return waveformData;
};
```

---

## 🎵 **AUDIO QUALITY PIPELINE**

### **LUFS Normalization (Simplified)**
```typescript
// Simplified LUFS Normalizer for Hackathon
class SimpleLUFSNormalizer {
  private targetLUFS = -14.0;
  
  public normalizeAudio(audioBuffer: Float32Array): Float32Array {
    // Calculate current loudness (simplified)
    const rms = this.calculateRMS(audioBuffer);
    const currentLUFS = this.rmsToLUFS(rms);
    
    // Calculate gain adjustment
    const gainAdjustment = this.targetLUFS - currentLUFS;
    const gainLinear = Math.pow(10, gainAdjustment / 20);
    
    // Apply gain
    return audioBuffer.map(sample => sample * gainLinear);
  }
  
  private calculateRMS(buffer: Float32Array): number {
    const sum = buffer.reduce((acc, sample) => acc + sample * sample, 0);
    return Math.sqrt(sum / buffer.length);
  }
  
  private rmsToLUFS(rms: number): number {
    // Simplified LUFS calculation
    return 20 * Math.log10(rms) - 0.691;
  }
}
```

### **Quality Settings**
```typescript
// Quality Settings Interface
interface QualitySettings {
  preview: {
    bitrate: 128;
    format: 'aac';
    lufs: -14.0;
  };
  streaming: {
    bitrate: 256;
    format: 'aac';
    lufs: -14.0;
  };
  download: {
    bitrate: 0; // Lossless
    format: 'flac';
    lufs: -14.0;
  };
}
```

---

## 🎨 **UI COMPONENTS**

### **Web Waveform Component**
```typescript
// Web Canvas Waveform
const WebWaveform = ({ audioBuffer, width, height, progress }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !audioBuffer) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw waveform
    const samples = audioBuffer.getChannelData(0);
    const samplesPerPixel = samples.length / width;
    
    ctx.beginPath();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < width; x++) {
      const start = Math.floor(x * samplesPerPixel);
      const end = Math.floor((x + 1) * samplesPerPixel);
      const block = samples.slice(start, end);
      
      const rms = Math.sqrt(
        block.reduce((sum, sample) => sum + sample * sample, 0) / block.length
      );
      
      const y = height / 2 + (rms * height / 2);
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw progress
    if (progress > 0) {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(progress * width, height / 2);
      ctx.stroke();
    }
  }, [audioBuffer, width, height, progress]);
  
  return <canvas ref={canvasRef} width={width} height={height} />;
};
```

### **Mobile Waveform Component**
```typescript
// Mobile SVG Waveform
const MobileWaveform = ({ data, width, height, progress }: WaveformProps) => {
  const path = useMemo(() => {
    return data.map((value, index) => {
      const x = (index / data.length) * width;
      const y = height / 2 + (value * height / 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [data, width, height]);
  
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {/* Background waveform */}
        <Path d={path} stroke="#666" strokeWidth={1} fill="none" />
        
        {/* Progress waveform */}
        <Path 
          d={path} 
          stroke="#00ff00" 
          strokeWidth={2} 
          fill="none"
          strokeDasharray={`${progress * width} ${width}`}
        />
      </Svg>
    </View>
  );
};
```

---

## 🔄 **30s PREVIEW LOGIC**

### **Consistent Preview Implementation**
```typescript
// 30s Preview Logic (Both Platforms)
const PREVIEW_DURATION_MS = 30_000; // 30 seconds

const usePreviewLogic = () => {
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const onPlaybackStatusUpdate = (status: PlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      
      // Stop at 30s preview limit
      if (status.positionMillis >= PREVIEW_DURATION_MS) {
        soundRef.current?.pauseAsync();
        setIsPlaying(false);
      }
    }
  };
  
  return { position, isPlaying, onPlaybackStatusUpdate };
};
```

---

## 🚀 **IMPLEMENTATION ROADMAP**

### **Week 1: Core Implementation**
- [ ] **Day 1-2**: Web Audio API integration
- [ ] **Day 3-4**: Mobile SVG waveform
- [ ] **Day 5**: 30s preview logic
- [ ] **Day 6-7**: Basic UI integration

### **Week 2: Quality & Testing**
- [ ] **Day 1-2**: LUFS normalization
- [ ] **Day 3-4**: Quality settings
- [ ] **Day 5**: E2E testing
- [ ] **Day 6-7**: Performance optimization

### **Week 3: Polish & Launch**
- [ ] **Day 1-2**: UI polish
- [ ] **Day 3-4**: Final testing
- [ ] **Day 5**: Documentation
- [ ] **Day 6-7**: Launch preparation

---

## 📊 **SUCCESS METRICS**

### **Hackathon Targets**
- **Waveform Visualization**: ✅ Working on both web and mobile
- **30s Preview**: ✅ Consistent across platforms
- **Audio Quality**: ✅ LUFS normalization
- **Performance**: ✅ Smooth 60fps waveforms
- **UI/UX**: ✅ Professional design system integration

### **Technical Targets**
- **Web**: Canvas-based waveform rendering
- **Mobile**: SVG-based waveform rendering
- **Audio**: Web Audio API + Expo Audio
- **Quality**: -14 LUFS normalization
- **Performance**: < 100ms latency

---

## 🎯 **FOCUSED FEATURES**

### **✅ HACKATHON FEATURES**
1. **Waveform Visualization** - Both web and mobile
2. **30s Preview Logic** - Consistent across platforms
3. **LUFS Normalization** - Professional audio quality
4. **Quality Settings** - 128k/256k/320k options
5. **Professional UI** - Design system integration

### **🚫 SAVING FOR LATER**
1. **Desktop Standalone** - JUCE C++ implementation
2. **DAW Integration** - VST3/AU plugin support
3. **Advanced EQ** - Professional mastering tools
4. **Spatial Audio** - 3D positioning and movement
5. **Motion System** - Brauer-style autopan

---

**Last Updated:** 2025-10-23  
**Status:** 🔴 **CRITICAL** - Hackathon audio player implementation  
**Timeline:** 2-3 weeks for complete implementation  
**Priority:** Waveform visualization on both web and mobile

---

*This document defines the focused audio player implementation for the hackathon timeline with waveform visualization as the primary goal.*
