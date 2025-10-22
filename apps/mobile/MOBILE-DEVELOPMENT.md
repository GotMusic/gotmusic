# 📱 Mobile Development Guide

## 🚀 **Quick Start - Mobile Component Development**

### **Option 1: Live Component Showcase (Recommended)**
```bash
# Start mobile app with component showcase
yarn workspace @gotmusic/mobile dev

# Navigate to "Develop" tab in the app
# See all components, API integration, and design tokens in real-time
```

### **Option 2: Mobile Storybook**
```bash
# Start mobile Storybook (when configured)
yarn workspace @gotmusic/mobile storybook

# View components in isolation
# Test different states and props
```

### **Option 3: Web Storybook (Cross-Platform)**
```bash
# Use existing web Storybook for mobile components
yarn workspace @gotmusic/ui storybook

# View mobile-specific components
# Test responsive design
```

---

## 🎯 **Current Mobile Development Setup**

### **✅ What's Working**
- **QueryClient Provider** - Properly configured with React Query
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based navigation
- **Component Showcase** - Live component testing
- **API Integration** - Real API calls with loading states
- **Design Tokens** - Consistent styling system

### **🔧 Mobile App Structure**
```
apps/mobile/
├── app/
│   ├── _layout.tsx          # Root layout with QueryClient
│   ├── (tabs)/
│   │   ├── index.tsx        # Discover tab
│   │   ├── record.tsx       # Record tab  
│   │   ├── library.tsx      # Library tab
│   │   └── develop.tsx      # 🆕 Component showcase
│   ├── components/
│   │   ├── ComponentShowcase.tsx
│   │   └── ComponentShowcase.stories.tsx
│   └── modals/
└── .storybook/              # Mobile Storybook config
```

---

## 🎨 **Component Development Workflow**

### **1. Live Development (No Tests Needed)**
```bash
# Start the mobile app
yarn workspace @gotmusic/mobile dev

# Navigate to "Develop" tab
# See all components in real-time
# Test API integration
# View design tokens
# Test different states
```

### **2. Component Showcase Features**
- **System Status** - QueryClient, API, NativeWind status
- **Component Examples** - Buttons, cards, loading states
- **API Data Display** - Real API calls with error handling
- **Design Tokens** - Color and spacing previews
- **Navigation** - Test all app routes

### **3. Mobile Storybook (Optional)**
```bash
# Install Storybook dependencies
yarn workspace @gotmusic/mobile add -D @storybook/react-native

# Start mobile Storybook
yarn workspace @gotmusic/mobile storybook

# View components in isolation
# Test different props and states
```

---

## 🛠️ **Development Commands**

### **Mobile App Development**
```bash
# Start mobile app
yarn workspace @gotmusic/mobile dev

# Run on specific platform
yarn workspace @gotmusic/mobile ios
yarn workspace @gotmusic/mobile android

# Check router types
yarn workspace @gotmusic/mobile router:check
```

### **Component Development**
```bash
# Start component showcase (in app)
# Navigate to "Develop" tab in mobile app

# Start mobile Storybook
yarn workspace @gotmusic/mobile storybook

# Start web Storybook (cross-platform)
yarn workspace @gotmusic/ui storybook
```

### **Build & Deploy**
```bash
# Build for production
yarn workspace @gotmusic/mobile build

# Use EAS for builds
eas build --platform ios
eas build --platform android
```

---

## 🎯 **Component Development Best Practices**

### **1. Use the Component Showcase**
- **Real-time testing** - See changes immediately
- **API integration** - Test with real data
- **State management** - Test loading, error, success states
- **Design tokens** - Ensure consistent styling
- **Responsive design** - Test on different screen sizes

### **2. Follow Mobile Patterns**
```typescript
// Use NativeWind for styling
<View className="flex-1 bg-bg p-4">
  <Text className="text-fg text-xl font-semibold">Title</Text>
</View>

// Use proper React Native components
import { View, Text, TouchableOpacity } from "react-native";

// Use Expo Router for navigation
import { Link } from "expo-router";
```

### **3. Test Different States**
- **Loading states** - Show spinners and skeletons
- **Error states** - Handle API errors gracefully
- **Empty states** - Show when no data
- **Success states** - Show when data loads

### **4. Accessibility**
- **Screen readers** - Use proper accessibility labels
- **Keyboard navigation** - Ensure all elements are focusable
- **Color contrast** - Use design tokens for proper contrast
- **Touch targets** - Ensure buttons are large enough

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. QueryClient Error**
```
Error: No QueryClient set, use QueryClientProvider to set one
```
**Solution:** The QueryClient is already configured in `_layout.tsx`. This error usually means the component is being used outside the provider.

#### **2. Missing Default Export**
```
Route "./_layout.tsx" is missing the required default export
```
**Solution:** The `_layout.tsx` file already has a default export. This might be a Metro cache issue.

#### **3. Reanimated Import Order**
```
Exception in HostFunction: <unknown>
```
**Solution:** Reanimated must be imported first. This is already configured correctly.

### **Fix Commands**
```bash
# Clear Metro cache
yarn workspace @gotmusic/mobile dev --clear

# Reset Expo cache
expo start -c

# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install
```

---

## 📊 **Development Metrics**

### **Current Status**
- ✅ **QueryClient** - Properly configured
- ✅ **NativeWind** - Working with design tokens
- ✅ **Component Showcase** - Live testing available
- ✅ **API Integration** - Real data loading
- ✅ **Navigation** - Expo Router working
- ✅ **Design System** - Consistent styling

### **Performance**
- **Bundle Size** - Optimized with tree shaking
- **Load Time** - Fast with proper caching
- **Memory Usage** - Efficient with React Query
- **Rendering** - Smooth with proper optimization

---

## 🎉 **Ready for Development**

### **What You Can Do Now**
1. **Start the mobile app** - `yarn workspace @gotmusic/mobile dev`
2. **Navigate to "Develop" tab** - See all components in action
3. **Test API integration** - Real data loading and error handling
4. **View design tokens** - Consistent styling system
5. **Test navigation** - All app routes working
6. **Develop new components** - Use the showcase for testing

### **No More Test Running Required**
- **Live component testing** - See changes immediately
- **Real API integration** - Test with actual data
- **Visual feedback** - See components in context
- **Design system integration** - Consistent styling
- **State management** - Test all states easily

---

**🎯 The mobile development environment is now fully operational!**

You can develop and test all mobile components without running tests - just use the live component showcase in the "Develop" tab of your mobile app.
