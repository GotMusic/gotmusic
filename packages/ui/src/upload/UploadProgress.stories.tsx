import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { UploadProgress } from "./UploadProgress";

const meta: Meta<typeof UploadProgress> = {
  title: "Upload/UploadProgress",
  component: UploadProgress,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A progress indicator component for file uploads with speed and time estimates.",
      },
    },
  },
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Upload progress (0-100)",
    },
    status: {
      control: "select",
      options: ["idle", "uploading", "processing", "success", "error"],
      description: "Upload status",
    },
    fileName: {
      control: "text",
      description: "File name being uploaded",
    },
    fileSize: {
      control: "number",
      description: "File size in bytes",
    },
    speed: {
      control: "number",
      description: "Upload speed in bytes per second",
    },
    timeRemaining: {
      control: "number",
      description: "Estimated time remaining in seconds",
    },
    variant: {
      control: "select",
      options: ["default", "minimal", "inline"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    progress: 0,
    status: "idle",
    fileName: "beat_upload.wav",
    fileSize: 15728640, // 15MB
    showDetails: true,
    showEstimates: true,
    variant: "default",
    size: "md",
  },
};

export const Uploading: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 45,
    speed: 1024 * 1024, // 1MB/s
    timeRemaining: 30,
  },
};

export const Processing: Story = {
  args: {
    ...Primary.args,
    status: "processing",
    progress: 100,
  },
};

export const Success: Story = {
  args: {
    ...Primary.args,
    status: "success",
    progress: 100,
    success: "Upload complete!",
  },
};

export const ErrorState: Story = {
  args: {
    ...Primary.args,
    status: "error",
    progress: 0,
    error: "Upload failed. Please try again.",
  },
};

export const FastUpload: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 75,
    speed: 5 * 1024 * 1024, // 5MB/s
    timeRemaining: 5,
  },
};

export const SlowUpload: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 25,
    speed: 100 * 1024, // 100KB/s
    timeRemaining: 120,
  },
};

export const LargeFile: Story = {
  args: {
    ...Primary.args,
    fileName: "full_track_mixdown.wav",
    fileSize: 104857600, // 100MB
    status: "uploading",
    progress: 60,
    speed: 2 * 1024 * 1024, // 2MB/s
    timeRemaining: 20,
  },
};

export const Minimal: Story = {
  args: {
    ...Primary.args,
    variant: "minimal",
    showDetails: false,
    showEstimates: false,
  },
};

export const Inline: Story = {
  args: {
    ...Primary.args,
    variant: "inline",
    size: "sm",
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: "lg",
  },
};

export const NoEstimates: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 50,
    showEstimates: false,
  },
};

export const NoDetails: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 50,
    showDetails: false,
  },
};

export const A11y: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Accessible progress indicator with proper ARIA attributes and screen reader support.",
      },
    },
  },
};

export const Performance: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 50,
    speed: 1024 * 1024,
    timeRemaining: 30,
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with real-time updates to ensure smooth animations.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    // Simulate upload progress
    const [progress, setProgress] = React.useState(0);
    const [status, setStatus] = React.useState<
      "idle" | "uploading" | "processing" | "success" | "error"
    >("idle");

    React.useEffect(() => {
      if (status === "uploading") {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              setStatus("processing");
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }, 200);

        return () => clearInterval(interval);
      }
    }, [status]);

    const startUpload = () => {
      setProgress(0);
      setStatus("uploading");
    };

    const reset = () => {
      setProgress(0);
      setStatus("idle");
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startUpload}
            className="px-4 py-2 bg-brand-primary text-bg-inverse rounded-md"
          >
            Start Upload
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-bg-elevated text-fg-default border border-border-subtle rounded-md"
          >
            Reset
          </button>
        </div>
        <UploadProgress
          progress={progress}
          status={status}
          fileName="demo_track.wav"
          fileSize={15728640}
          speed={1024 * 1024}
          timeRemaining={Math.max(0, 30 - (progress / 100) * 30)}
          showDetails={true}
          showEstimates={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive progress indicator that simulates a real upload. Click 'Start Upload' to see the animation.",
      },
    },
  },
};
