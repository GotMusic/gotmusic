import type { Meta, StoryObj } from "@storybook/react";
import {
  AnimatedIcon,
  BlockchainIcon,
  DevelopIcon,
  GotMusicLogoIcon,
  HeadphonesIcon,
  HomeIcon,
  Icon,
  LibraryIcon,
  MicrophoneIcon,
  PauseIcon,
  PlayIcon,
  RecordIcon,
  SearchIcon,
  StudioIcon,
  WaveformIcon,
} from "../index";

const meta: Meta = {
  title: "Design System/Icons",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

// Music Icons
export const MusicIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xl" stroke="brand" />
        <p>Microphone</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <HeadphonesIcon size="xl" stroke="brand" />
        <p>Headphones</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <WaveformIcon size="xl" stroke="brand" />
        <p>Waveform</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <PlayIcon size="xl" stroke="brand" />
        <p>Play</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <PauseIcon size="xl" stroke="brand" />
        <p>Pause</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <RecordIcon size="xl" stroke="brand" fill="danger" />
        <p>Record</p>
      </div>
    </div>
  ),
};

// Navigation Icons
export const NavigationIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <HomeIcon size="xl" stroke="brand" />
        <p>Home</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <SearchIcon size="xl" stroke="brand" />
        <p>Search</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <StudioIcon size="xl" stroke="brand" />
        <p>Studio</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <LibraryIcon size="xl" stroke="brand" />
        <p>Library</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <DevelopIcon size="xl" stroke="brand" />
        <p>Develop</p>
      </div>
    </div>
  ),
};

// Brand Icons
export const BrandIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <GotMusicLogoIcon size="xxl" stroke="brand" />
        <p>GotMusic Logo</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <BlockchainIcon size="xxl" stroke="brand" />
        <p>Blockchain</p>
      </div>
    </div>
  ),
};

// Icon Sizes
export const IconSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xs" stroke="brand" />
        <p>XS (12px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="sm" stroke="brand" />
        <p>SM (14px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="md" stroke="brand" />
        <p>MD (16px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="lg" stroke="brand" />
        <p>LG (20px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xl" stroke="brand" />
        <p>XL (24px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xxl" stroke="brand" />
        <p>XXL (32px)</p>
      </div>
    </div>
  ),
};

// Icon Variants
export const IconVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xl" stroke="default" />
        <p>Default</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xl" stroke="brand" />
        <p>Brand</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xl" stroke="accent" />
        <p>Accent</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MicrophoneIcon size="xl" stroke="muted" />
        <p>Muted</p>
      </div>
    </div>
  ),
};

// Animated Icons
export const AnimatedIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <AnimatedIcon animation="pulse" size="xl" stroke="brand">
          <MicrophoneIcon size="xl" stroke="brand" />
        </AnimatedIcon>
        <p>Pulse</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AnimatedIcon animation="spin" size="xl" stroke="brand">
          <WaveformIcon size="xl" stroke="brand" />
        </AnimatedIcon>
        <p>Spin</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AnimatedIcon animation="bounce" size="xl" stroke="brand">
          <PlayIcon size="xl" stroke="brand" />
        </AnimatedIcon>
        <p>Bounce</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AnimatedIcon animation="shake" size="xl" stroke="brand">
          <RecordIcon size="xl" stroke="brand" fill="danger" />
        </AnimatedIcon>
        <p>Shake</p>
      </div>
    </div>
  ),
};
