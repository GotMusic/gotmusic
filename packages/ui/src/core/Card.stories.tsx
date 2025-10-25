import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  CardIcon, 
  CardBadge 
} from "./Card";
import { Button } from "./Button";

const meta: Meta<typeof Card> = {
  title: "Core/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Premium Glass-Neumorphic hybrid card components with advanced animations and music app styling.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["glass", "neumorphic", "hybrid", "music", "waveform", "interactive", "disabled"],
      description: "Card visual variant",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Card size",
    },
    glow: {
      control: { type: "select" },
      options: ["none", "soft", "medium", "strong"],
      description: "Glow effect",
    },
    loading: {
      control: { type: "boolean" },
      description: "Loading state with shimmer effect",
    },
    animated: {
      control: { type: "boolean" },
      description: "Enable/disable animations",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card Variants
export const Glass: Story = {
  args: {
    variant: "glass",
    size: "md",
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>Frosted glass effect with backdrop blur</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card features a beautiful glass morphism effect with subtle transparency and blur.</p>
        </CardContent>
      </>
    ),
  },
};

export const Neumorphic: Story = {
  args: {
    variant: "neumorphic",
    size: "md",
    children: (
      <>
        <CardHeader>
          <CardTitle>Neumorphic Card</CardTitle>
          <CardDescription>Soft, tactile design with subtle shadows</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card uses neumorphic design principles with inset and outset shadows.</p>
        </CardContent>
      </>
    ),
  },
};

export const Hybrid: Story = {
  args: {
    variant: "hybrid",
    size: "md",
    children: (
      <>
        <CardHeader>
          <CardTitle>Hybrid Card</CardTitle>
          <CardDescription>Combines glass and neumorphic effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">The best of both worlds - glass transparency with neumorphic depth.</p>
        </CardContent>
      </>
    ),
  },
};

// Music App Variants
export const Music: Story = {
  args: {
    variant: "music",
    size: "lg",
    glow: "medium",
    children: (
      <>
        <CardHeader>
          <CardIcon>🎵</CardIcon>
          <CardTitle>Epic Beat 2025</CardTitle>
          <CardDescription>Grant Edwards • 128 BPM • C Minor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-fg-muted">Duration</span>
              <span className="text-sm font-medium">3:45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-fg-muted">Key</span>
              <span className="text-sm font-medium">C Minor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-fg-muted">Genre</span>
              <span className="text-sm font-medium">Electronic</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <CardBadge>New</CardBadge>
          <Button size="sm" variant="primary">Play</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Waveform: Story = {
  args: {
    variant: "waveform",
    size: "lg",
    glow: "soft",
    children: (
      <>
        <CardHeader>
          <CardIcon>🌊</CardIcon>
          <CardTitle>Waveform Analysis</CardTitle>
          <CardDescription>Real-time audio visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-16 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg flex items-end justify-center space-x-1 p-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-sm"
                  style={{
                    width: "3px",
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-fg-muted">Peak: -3.2dB</span>
              <span className="text-fg-muted">RMS: -12.8dB</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">Analyze</Button>
          <Button size="sm" variant="primary">Export</Button>
        </CardFooter>
      </>
    ),
  },
};

// Interactive States
export const Interactive: Story = {
  args: {
    variant: "interactive",
    size: "md",
    onClick: () => alert("Card clicked!"),
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click me to see the interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card responds to hover and click events with smooth animations.</p>
        </CardContent>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    variant: "hybrid",
    size: "md",
    loading: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Loading Card</CardTitle>
          <CardDescription>Shimmer effect while loading</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card shows a loading state with shimmer animation.</p>
        </CardContent>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: "disabled",
    size: "md",
    children: (
      <>
        <CardHeader>
          <CardTitle>Disabled Card</CardTitle>
          <CardDescription>This card is disabled</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card is in a disabled state and cannot be interacted with.</p>
        </CardContent>
      </>
    ),
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Card key={size} variant="hybrid" size={size}>
          <CardHeader>
            <CardTitle>{size.toUpperCase()} Card</CardTitle>
            <CardDescription>Size variant: {size}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-fg-muted">This is a {size} sized card with hybrid styling.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

// Glow Effects
export const GlowEffects: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(["none", "soft", "medium", "strong"] as const).map((glow) => (
        <Card key={glow} variant="music" glow={glow}>
          <CardHeader>
            <CardTitle>{glow.charAt(0).toUpperCase() + glow.slice(1)} Glow</CardTitle>
            <CardDescription>Glow effect: {glow}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-fg-muted">This card demonstrates the {glow} glow effect.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

// Music Production Showcase
export const MusicProductionShowcase: Story = {
  render: () => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          variant="music" 
          size="lg" 
          glow={selectedCard === "track" ? "medium" : "none"}
          onClick={() => setSelectedCard(selectedCard === "track" ? null : "track")}
        >
          <CardHeader>
            <CardIcon>🎵</CardIcon>
            <CardTitle>Track 1</CardTitle>
            <CardDescription>Main Mix • 128 BPM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-fg-muted">Volume</span>
                <span className="text-fg-default">-6.2dB</span>
              </div>
              <div className="w-full bg-bg-subtle rounded-full h-2">
                <div className="bg-brand-primary h-2 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CardBadge>Active</CardBadge>
            <Button size="sm" variant="primary">Edit</Button>
          </CardFooter>
        </Card>

        <Card 
          variant="waveform" 
          size="lg" 
          glow={selectedCard === "waveform" ? "medium" : "none"}
          onClick={() => setSelectedCard(selectedCard === "waveform" ? null : "waveform")}
        >
          <CardHeader>
            <CardIcon>🌊</CardIcon>
            <CardTitle>Waveform</CardTitle>
            <CardDescription>Real-time Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg flex items-end justify-center space-x-1 p-2">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-sm"
                  style={{
                    width: "2px",
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 30}ms`,
                  }}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">Analyze</Button>
            <Button size="sm" variant="primary">Export</Button>
          </CardFooter>
        </Card>

        <Card 
          variant="hybrid" 
          size="lg" 
          glow={selectedCard === "effects" ? "medium" : "none"}
          onClick={() => setSelectedCard(selectedCard === "effects" ? null : "effects")}
        >
          <CardHeader>
            <CardIcon>🎛️</CardIcon>
            <CardTitle>Effects Rack</CardTitle>
            <CardDescription>Audio Processing Chain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-fg-muted">Reverb</span>
                <span className="text-fg-default">25%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-fg-muted">Compression</span>
                <span className="text-fg-default">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-fg-muted">EQ</span>
                <span className="text-fg-default">3 Bands</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CardBadge>Processing</CardBadge>
            <Button size="sm" variant="primary">Configure</Button>
          </CardFooter>
        </Card>
      </div>
    );
  },
};

// Animation Showcase
export const AnimationShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card variant="glass" size="lg" animated={true}>
        <CardHeader>
          <CardTitle>Animated Glass Card</CardTitle>
          <CardDescription>Smooth transitions and hover effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card has all animations enabled for smooth, premium interactions.</p>
        </CardContent>
      </Card>

      <Card variant="neumorphic" size="lg" animated={false}>
        <CardHeader>
          <CardTitle>Static Neumorphic Card</CardTitle>
          <CardDescription>No animations for performance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-fg-muted">This card has animations disabled for better performance on lower-end devices.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// FULL-SCREEN LAYOUT STORIES
export const FullScreenMusicStudio: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-bg-default via-bg-subtle to-bg-elevated">
      {/* Header */}
      <header className="p-6 border-b border-border-default bg-bg-elevated/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              GotMusic Studio
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">Settings</Button>
            <Button variant="primary" size="sm">New Project</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Track Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-default mb-4">Active Tracks</h2>
            <Card variant="music" size="lg" glow="medium">
              <CardHeader>
                <CardIcon>🎵</CardIcon>
                <CardTitle>Epic Beat 2025</CardTitle>
                <CardDescription>Grant Edwards • 128 BPM • C Minor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Volume</span>
                    <span className="text-sm font-medium">-6.2dB</span>
                  </div>
                  <div className="w-full bg-bg-subtle rounded-full h-2">
                    <div className="bg-brand-primary h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-fg-muted">Duration</span>
                    <span className="text-fg-default">3:45</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CardBadge>Active</CardBadge>
                <Button size="sm" variant="primary">Edit</Button>
              </CardFooter>
            </Card>

            <Card variant="music" size="lg" glow="soft">
              <CardHeader>
                <CardIcon>🎶</CardIcon>
                <CardTitle>Ambient Pad</CardTitle>
                <CardDescription>Synth Layer • 128 BPM • F Major</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Volume</span>
                    <span className="text-sm font-medium">-12.1dB</span>
                  </div>
                  <div className="w-full bg-bg-subtle rounded-full h-2">
                    <div className="bg-brand-accent h-2 rounded-full" style={{ width: "45%" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-fg-muted">Duration</span>
                    <span className="text-fg-default">4:12</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CardBadge>Muted</CardBadge>
                <Button size="sm" variant="outline">Unmute</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Waveform Analysis */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-default mb-4">Audio Analysis</h2>
            <Card variant="waveform" size="lg" glow="medium">
              <CardHeader>
                <CardIcon>🌊</CardIcon>
                <CardTitle>Master Waveform</CardTitle>
                <CardDescription>Real-time Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg flex items-end justify-center space-x-1 p-3">
                    {Array.from({ length: 40 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-sm"
                        style={{
                          width: "2px",
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 25}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-fg-muted">Peak</span>
                      <span className="text-fg-default">-3.2dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-fg-muted">RMS</span>
                      <span className="text-fg-default">-12.8dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-fg-muted">Dynamic Range</span>
                      <span className="text-fg-default">9.6dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-fg-muted">Clipping</span>
                      <span className="text-red-400">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">Analyze</Button>
                <Button size="sm" variant="primary">Export</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Effects Rack */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-fg-default mb-4">Effects Chain</h2>
            <Card variant="hybrid" size="lg" glow="medium">
              <CardHeader>
                <CardIcon>🎛️</CardIcon>
                <CardTitle>Master Effects</CardTitle>
                <CardDescription>Audio Processing Chain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-muted">Reverb</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">25%</span>
                        <div className="w-16 bg-bg-subtle rounded-full h-1">
                          <div className="bg-brand-primary h-1 rounded-full" style={{ width: "25%" }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-muted">Compression</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Active</span>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-muted">EQ</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">3 Bands</span>
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-muted">Limiter</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">-0.1dB</span>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CardBadge>Processing</CardBadge>
                <Button size="sm" variant="primary">Configure</Button>
              </CardFooter>
            </Card>

            <Card variant="glass" size="lg">
              <CardHeader>
                <CardIcon>🎚️</CardIcon>
                <CardTitle>Send Effects</CardTitle>
                <CardDescription>Auxiliary Processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Delay</span>
                    <span className="text-sm font-medium">1/4 Note</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Chorus</span>
                    <span className="text-sm font-medium">Off</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-fg-muted">Distortion</span>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">Add Effect</Button>
                <Button size="sm" variant="primary">Bypass</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Transport Controls */}
        <Card variant="neumorphic" size="lg" className="mt-8">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button size="lg" variant="primary" className="w-16 h-16 rounded-full">
                  ▶️
                </Button>
                <div className="text-center">
                  <div className="text-2xl font-bold">128 BPM</div>
                  <div className="text-sm text-fg-muted">Tempo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4/4</div>
                  <div className="text-sm text-fg-muted">Time Signature</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold">00:45</div>
                  <div className="text-sm text-fg-muted">Position</div>
                </div>
                <div className="w-64 bg-bg-subtle rounded-full h-2">
                  <div className="bg-brand-primary h-2 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  ),
};

export const MobileMusicApp: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="h-screen bg-gradient-to-b from-bg-default to-bg-subtle overflow-y-auto">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 p-4 bg-bg-elevated/80 backdrop-blur-md border-b border-border-default">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
            GotMusic
          </h1>
          <Button size="sm" variant="outline">Menu</Button>
        </div>
      </header>

      {/* Mobile Content */}
      <div className="p-4 space-y-4">
        <Card variant="music" size="lg" glow="medium">
          <CardHeader>
            <CardIcon>🎵</CardIcon>
            <CardTitle>Epic Beat 2025</CardTitle>
            <CardDescription>Grant Edwards • 128 BPM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-fg-muted">Volume</span>
                <span className="text-fg-default">-6.2dB</span>
              </div>
              <div className="w-full bg-bg-subtle rounded-full h-3">
                <div className="bg-brand-primary h-3 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CardBadge>Active</CardBadge>
            <Button size="sm" variant="primary">Play</Button>
          </CardFooter>
        </Card>

        <Card variant="waveform" size="lg">
          <CardHeader>
            <CardIcon>🌊</CardIcon>
            <CardTitle>Waveform</CardTitle>
            <CardDescription>Real-time Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg flex items-end justify-center space-x-1 p-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-sm"
                  style={{
                    width: "3px",
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="hybrid" size="lg">
          <CardHeader>
            <CardIcon>🎛️</CardIcon>
            <CardTitle>Effects</CardTitle>
            <CardDescription>Audio Processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg-muted">Reverb</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-fg-muted">Compression</span>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="primary">Configure</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
};