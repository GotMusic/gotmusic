import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Upload/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A drag-and-drop file upload component with validation, progress tracking, and multiple file support.",
      },
    },
  },
  argTypes: {
    accept: {
      control: "text",
      description: "Accepted file types (MIME types)",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files",
    },
    multiple: {
      control: "boolean",
      description: "Whether multiple files are allowed",
    },
    disabled: {
      control: "boolean",
      description: "Whether the upload area is disabled",
    },
    status: {
      control: "select",
      options: ["idle", "uploading", "processing", "success", "error"],
      description: "Upload status",
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Upload progress (0-100)",
    },
    variant: {
      control: "select",
      options: ["default", "minimal", "success", "error"],
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
    accept: "audio/*",
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 1,
    multiple: false,
    disabled: false,
    status: "idle",
    progress: 0,
    variant: "default",
    size: "md",
  },
};

export const MultipleFiles: Story = {
  args: {
    ...Primary.args,
    multiple: true,
    maxFiles: 5,
    accept: "audio/*,image/*",
  },
};

export const Uploading: Story = {
  args: {
    ...Primary.args,
    status: "uploading",
    progress: 45,
    files: [storybookFixtures.uploads.audioFile as any],
  },
};

export const Processing: Story = {
  args: {
    ...Primary.args,
    status: "processing",
    progress: 100,
    files: [storybookFixtures.uploads.audioFile as any],
  },
};

export const Success: Story = {
  args: {
    ...Primary.args,
    status: "success",
    progress: 100,
    files: [storybookFixtures.uploads.audioFile as any],
    success: "Upload complete!",
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    status: "error",
    progress: 0,
    error: "Upload failed. Please try again.",
  },
};

export const WithFiles: Story = {
  args: {
    ...Primary.args,
    files: [
      storybookFixtures.uploads.audioFile as any,
      storybookFixtures.uploads.largeAudioFile as any,
    ],
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Minimal: Story = {
  args: {
    ...Primary.args,
    variant: "minimal",
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

export const CustomAccept: Story = {
  args: {
    ...Primary.args,
    accept: "image/*",
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

export const LargeFileLimit: Story = {
  args: {
    ...Primary.args,
    maxSize: 100 * 1024 * 1024, // 100MB
    maxFiles: 3,
  },
};

export const A11y: Story = {
  args: {
    ...Primary.args,
    files: [storybookFixtures.uploads.audioFile as any],
  },
  parameters: {
    docs: {
      description: {
        story: "Accessible file upload with proper ARIA labels and keyboard navigation.",
      },
    },
  },
};

export const Performance: Story = {
  args: {
    ...Primary.args,
    files: Array.from({ length: 10 }, (_, i) => ({
      ...storybookFixtures.uploads.audioFile,
      name: `track_${i + 1}.wav`,
    })) as any,
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with multiple files to ensure smooth rendering.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const handleFilesChange = (files: File[]) => {
      // Handle file changes
    };

    const handleDrop = (files: File[]) => {
      // Handle file drop
    };

    const handleUpload = (files: File[]) => {
      // Handle upload start
    };

    const handleComplete = (files: File[]) => {
      // Handle upload completion
    };

    const handleError = (error: string) => {
      // Handle upload error
    };

    return (
      <div className="space-y-4">
        <FileUpload
          accept="audio/*"
          maxSize={50 * 1024 * 1024}
          maxFiles={3}
          multiple={true}
          onChange={handleFilesChange}
          onDrop={handleDrop}
          onUpload={handleUpload}
          onComplete={handleComplete}
          onError={handleError}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive file upload with all event handlers. Use this to test drag-and-drop functionality.",
      },
    },
  },
};
