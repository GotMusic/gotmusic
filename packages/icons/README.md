# @gotmusic/icons

**Custom SVG Icon System for GotMusic**

A comprehensive, design-token-driven icon system built specifically for GotMusic's futuristic, music-producer aesthetic.

## 🎯 **Features**

- **Custom SVG Icons** - No more emoji, just beautiful custom icons
- **Design Token Integration** - Consistent with GotMusic's design system
- **Cross-Platform** - Works on both web and mobile
- **TypeScript Support** - Full type safety and IntelliSense
- **Animation Support** - Built-in animations for interactive icons
- **Tree-Shakable** - Import only what you use

## 🚀 **Quick Start**

```bash
# Install the package
yarn add @gotmusic/icons

# Import icons
import { MicrophoneIcon, PlayIcon, RecordIcon } from '@gotmusic/icons';
```

## 📦 **Icon Categories**

### **Music Icons**
- `MicrophoneIcon` - Recording and audio input
- `HeadphonesIcon` - Audio output and listening
- `WaveformIcon` - Audio visualization
- `PlayIcon` - Playback control
- `PauseIcon` - Pause control
- `RecordIcon` - Recording state

### **Navigation Icons**
- `HomeIcon` - Home/Discover tab
- `SearchIcon` - Search/Browse tab
- `StudioIcon` - Studio/Producer tab
- `LibraryIcon` - Library/Assets tab
- `DevelopIcon` - Development/Showcase tab

### **Brand Icons**
- `GotMusicLogoIcon` - GotMusic brand logo
- `BlockchainIcon` - Blockchain/crypto symbols

## 🎨 **Usage Examples**

### **Basic Usage**
```tsx
import { MicrophoneIcon, PlayIcon } from '@gotmusic/icons';

// Simple icon
<MicrophoneIcon size="lg" stroke="brand" />

// With custom styling
<PlayIcon 
  size="xl" 
  stroke="brand" 
  fill="accent"
  style={{ color: '#6AE6A6' }}
/>
```

### **Mobile Tab Navigation**
```tsx
import { HomeIcon, SearchIcon, StudioIcon } from '@gotmusic/icons';

// In your tab navigator
<Tabs.Screen 
  name="home" 
  options={{ 
    title: "Discover",
    tabBarIcon: ({ focused, color, size }) => (
      <HomeIcon 
        size={size} 
        stroke={focused ? "brand" : "muted"}
        style={{ color }}
      />
    ),
  }} 
/>
```

### **Animated Icons**
```tsx
import { AnimatedIcon, MicrophoneIcon } from '@gotmusic/icons';

<AnimatedIcon 
  animation="pulse" 
  size="xl" 
  stroke="brand"
  duration={1000}
>
  <MicrophoneIcon size="xl" stroke="brand" />
</AnimatedIcon>
```

## 🎛️ **Icon Props**

### **Size Options**
- `xs` - 12px
- `sm` - 14px  
- `md` - 16px (default)
- `lg` - 20px
- `xl` - 24px
- `xxl` - 32px

### **Stroke Colors**
- `default` - Current color
- `brand` - GotMusic brand color (#6AE6A6)
- `accent` - Accent color (#5BD0FF)
- `muted` - Muted text color
- `subtle` - Subtle text color

### **Fill Colors**
- `default` - None (outline)
- `solid` - Current color
- `brand` - Brand color
- `accent` - Accent color
- `success` - Success color
- `warning` - Warning color
- `danger` - Danger color
- `info` - Info color

## 🎭 **Animation Types**

- `pulse` - Scale in and out
- `spin` - Rotate continuously
- `bounce` - Vertical bounce
- `shake` - Horizontal shake

## 🎨 **Design Tokens**

Icons automatically use GotMusic's design tokens:

```tsx
// These are automatically applied
strokeWidth: 1.5
corner: "miter"
animationDuration: 180ms
animationEasing: "cubic-bezier(0.4, 0, 0.2, 1)"
```

## 📱 **Mobile Integration**

The icon system is fully integrated with React Native and Expo:

```tsx
// Works seamlessly with React Native
import { MicrophoneIcon } from '@gotmusic/icons';

<MicrophoneIcon 
  size="lg" 
  stroke="brand"
  style={{ marginTop: 8 }}
/>
```

## 🌐 **Web Integration**

Icons work perfectly with React and Next.js:

```tsx
// Web usage
import { MicrophoneIcon } from '@gotmusic/icons';

<div className="flex items-center gap-2">
  <MicrophoneIcon size="md" stroke="brand" />
  <span>Recording</span>
</div>
```

## 🎵 **Music-Focused Design**

Every icon is designed specifically for music producers:

- **Sharp, angular lines** - Futuristic aesthetic
- **Music equipment focus** - Microphones, headphones, waveforms
- **Producer workflow** - Play, pause, record, studio controls
- **Brand consistency** - Matches GotMusic's visual identity

## 🔧 **Development**

### **Adding New Icons**
1. Create SVG file in `src/icons/[category]/`
2. Export from `src/index.ts`
3. Add to Storybook stories
4. Update documentation

### **Building**
```bash
yarn build
```

### **Storybook**
```bash
yarn storybook
```

## 📚 **Storybook Documentation**

View all icons in action:
- Icon categories and variants
- Size demonstrations
- Animation examples
- Interactive playground

## 🎯 **Best Practices**

1. **Use semantic sizes** - `sm` for inline, `lg` for buttons, `xl` for headers
2. **Match stroke to context** - `brand` for primary actions, `muted` for secondary
3. **Animate sparingly** - Use animations to draw attention, not distract
4. **Consistent spacing** - Use design tokens for margins and padding

## 🚀 **Future Roadmap**

- [ ] More music equipment icons
- [ ] Audio visualization icons
- [ ] Blockchain/crypto icons
- [ ] Social media icons
- [ ] Accessibility improvements
- [ ] Icon font generation

---

**Built with ❤️ for GotMusic**

*No more emoji - just beautiful, custom SVG icons that perfectly match GotMusic's futuristic, music-producer aesthetic!*
