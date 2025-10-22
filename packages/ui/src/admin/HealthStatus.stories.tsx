import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HealthStatus } from "./HealthStatus";
import type { HealthCheck } from "./HealthStatus";

const meta: Meta<typeof HealthStatus> = {
  title: "Admin/HealthStatus",
  component: HealthStatus,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Health status component for monitoring system health and service status in the admin dashboard.",
      },
    },
  },
  argTypes: {
    checks: {
      control: "object",
      description: "Array of health check results",
    },
    overallStatus: {
      control: "select",
      options: ["healthy", "warning", "critical", "unknown"],
      description: "Overall system health status",
    },
    lastUpdated: {
      control: "date",
      description: "When the health status was last updated",
    },
    autoRefresh: {
      control: "boolean",
      description: "Whether to automatically refresh the health status",
    },
    refreshInterval: {
      control: "number",
      description: "Refresh interval in milliseconds",
    },
    showResponseTime: {
      control: "boolean",
      description: "Whether to show response times",
    },
    showLastChecked: {
      control: "boolean",
      description: "Whether to show when each check was last performed",
    },
    compact: {
      control: "boolean",
      description: "Whether to use compact layout",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HealthStatus>;

// Sample health checks
const healthyChecks: HealthCheck[] = [
  {
    id: "database",
    name: "Database",
    status: "healthy",
    message: "All database connections are stable",
    lastChecked: new Date(Date.now() - 1000 * 30), // 30 seconds ago
    responseTime: 45,
    details: { connections: 12, maxConnections: 100 },
  },
  {
    id: "api",
    name: "API Server",
    status: "healthy",
    message: "API responding normally",
    lastChecked: new Date(Date.now() - 1000 * 15), // 15 seconds ago
    responseTime: 120,
    details: { requests: 1250, errors: 0 },
  },
  {
    id: "storage",
    name: "File Storage",
    status: "healthy",
    message: "Storage system operational",
    lastChecked: new Date(Date.now() - 1000 * 45), // 45 seconds ago
    responseTime: 85,
    details: { used: "2.1GB", total: "10GB" },
  },
];

const warningChecks: HealthCheck[] = [
  {
    id: "database",
    name: "Database",
    status: "healthy",
    message: "All database connections are stable",
    lastChecked: new Date(Date.now() - 1000 * 30),
    responseTime: 45,
  },
  {
    id: "api",
    name: "API Server",
    status: "warning",
    message: "High response times detected",
    lastChecked: new Date(Date.now() - 1000 * 15),
    responseTime: 2500,
  },
  {
    id: "storage",
    name: "File Storage",
    status: "warning",
    message: "Storage usage approaching limit",
    lastChecked: new Date(Date.now() - 1000 * 45),
    responseTime: 85,
  },
];

const criticalChecks: HealthCheck[] = [
  {
    id: "database",
    name: "Database",
    status: "critical",
    message: "Database connection failed",
    lastChecked: new Date(Date.now() - 1000 * 60),
    responseTime: undefined,
  },
  {
    id: "api",
    name: "API Server",
    status: "critical",
    message: "API server is down",
    lastChecked: new Date(Date.now() - 1000 * 30),
    responseTime: undefined,
  },
  {
    id: "storage",
    name: "File Storage",
    status: "healthy",
    message: "Storage system operational",
    lastChecked: new Date(Date.now() - 1000 * 45),
    responseTime: 85,
  },
];

const mixedChecks: HealthCheck[] = [
  {
    id: "database",
    name: "Database",
    status: "healthy",
    message: "All database connections are stable",
    lastChecked: new Date(Date.now() - 1000 * 30),
    responseTime: 45,
  },
  {
    id: "api",
    name: "API Server",
    status: "warning",
    message: "High response times detected",
    lastChecked: new Date(Date.now() - 1000 * 15),
    responseTime: 2500,
  },
  {
    id: "storage",
    name: "File Storage",
    status: "critical",
    message: "Storage system failure",
    lastChecked: new Date(Date.now() - 1000 * 60),
    responseTime: undefined,
  },
  {
    id: "cache",
    name: "Redis Cache",
    status: "unknown",
    message: "Cache status unknown",
    lastChecked: new Date(Date.now() - 1000 * 120),
    responseTime: undefined,
  },
];

export const Healthy: Story = {
  args: {
    checks: healthyChecks,
    overallStatus: "healthy",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    showResponseTime: true,
    showLastChecked: true,
  },
};

export const Warning: Story = {
  args: {
    checks: warningChecks,
    overallStatus: "warning",
    lastUpdated: new Date(Date.now() - 1000 * 15),
    showResponseTime: true,
    showLastChecked: true,
  },
};

export const Critical: Story = {
  args: {
    checks: criticalChecks,
    overallStatus: "critical",
    lastUpdated: new Date(Date.now() - 1000 * 60),
    showResponseTime: true,
    showLastChecked: true,
  },
};

export const Mixed: Story = {
  args: {
    checks: mixedChecks,
    overallStatus: "critical",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    showResponseTime: true,
    showLastChecked: true,
  },
};

export const Compact: Story = {
  args: {
    checks: healthyChecks,
    overallStatus: "healthy",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    compact: true,
    showResponseTime: true,
    showLastChecked: true,
  },
};

export const WithoutResponseTime: Story = {
  args: {
    checks: healthyChecks,
    overallStatus: "healthy",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    showResponseTime: false,
    showLastChecked: true,
  },
};

export const WithoutLastChecked: Story = {
  args: {
    checks: healthyChecks,
    overallStatus: "healthy",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    showResponseTime: true,
    showLastChecked: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checks, setChecks] = useState(healthyChecks);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
      setIsRefreshing(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Randomly update some checks
      setChecks((prevChecks) =>
        prevChecks.map((check) => {
          const random = Math.random();
          if (random < 0.3) {
            const statuses = ["healthy", "warning", "critical", "unknown"] as const;
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return {
              ...check,
              status: randomStatus,
              lastChecked: new Date(),
              responseTime:
                randomStatus === "healthy" ? Math.floor(Math.random() * 200) + 50 : undefined,
            };
          }
          return check;
        }),
      );

      setIsRefreshing(false);
    };

    const addRandomCheck = () => {
      const services = ["Email Service", "Payment Gateway", "CDN", "Monitoring"];
      const randomService = services[Math.floor(Math.random() * services.length)];
      const statuses = ["healthy", "warning", "critical", "unknown"] as const;
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      const newCheck: HealthCheck = {
        id: `service-${Date.now()}`,
        name: randomService,
        status: randomStatus,
        message: `Status check for ${randomService}`,
        lastChecked: new Date(),
        responseTime: randomStatus === "healthy" ? Math.floor(Math.random() * 200) + 50 : undefined,
      };

      setChecks((prev) => [newCheck, ...prev]);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 disabled:opacity-50"
          >
            {isRefreshing ? "Refreshing..." : "Refresh Status"}
          </button>
          <button
            type="button"
            onClick={addRandomCheck}
            className="px-3 py-1 bg-secondary-600 text-white rounded text-sm hover:bg-secondary-700"
          >
            Add Random Check
          </button>
        </div>

        <HealthStatus
          checks={checks}
          overallStatus={
            checks.some((c) => c.status === "critical")
              ? "critical"
              : checks.some((c) => c.status === "warning")
                ? "warning"
                : "healthy"
          }
          lastUpdated={new Date()}
          onRefresh={handleRefresh}
          showResponseTime={true}
          showLastChecked={true}
        />
      </div>
    );
  },
};

export const AutoRefresh: Story = {
  render: () => {
    const [checks, setChecks] = useState(healthyChecks);
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefresh = async () => {
      setRefreshCount((prev) => prev + 1);

      // Simulate random health changes
      setChecks((prevChecks) =>
        prevChecks.map((check) => {
          const random = Math.random();
          if (random < 0.2) {
            const statuses = ["healthy", "warning", "critical"] as const;
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return {
              ...check,
              status: randomStatus,
              lastChecked: new Date(),
              responseTime:
                randomStatus === "healthy" ? Math.floor(Math.random() * 200) + 50 : undefined,
            };
          }
          return {
            ...check,
            lastChecked: new Date(),
          };
        }),
      );
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-fg-muted">
          Auto-refresh enabled (every 5 seconds). Refresh count: {refreshCount}
        </div>

        <HealthStatus
          checks={checks}
          overallStatus={
            checks.some((c) => c.status === "critical")
              ? "critical"
              : checks.some((c) => c.status === "warning")
                ? "warning"
                : "healthy"
          }
          lastUpdated={new Date()}
          autoRefresh={true}
          refreshInterval={5000}
          onRefresh={handleRefresh}
          showResponseTime={true}
          showLastChecked={true}
        />
      </div>
    );
  },
};

export const LongList: Story = {
  args: {
    checks: [
      ...healthyChecks,
      {
        id: "email",
        name: "Email Service",
        status: "healthy",
        message: "Email delivery working normally",
        lastChecked: new Date(Date.now() - 1000 * 60),
        responseTime: 150,
      },
      {
        id: "payment",
        name: "Payment Gateway",
        status: "warning",
        message: "Payment processing delays detected",
        lastChecked: new Date(Date.now() - 1000 * 45),
        responseTime: 3000,
      },
      {
        id: "cdn",
        name: "CDN",
        status: "healthy",
        message: "Content delivery network operational",
        lastChecked: new Date(Date.now() - 1000 * 30),
        responseTime: 75,
      },
      {
        id: "monitoring",
        name: "Monitoring",
        status: "unknown",
        message: "Monitoring service status unknown",
        lastChecked: new Date(Date.now() - 1000 * 300),
        responseTime: undefined,
      },
    ],
    overallStatus: "warning",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    showResponseTime: true,
    showLastChecked: true,
  },
};

export const Accessibility: Story = {
  args: {
    checks: healthyChecks,
    overallStatus: "healthy",
    lastUpdated: new Date(Date.now() - 1000 * 30),
    showResponseTime: true,
    showLastChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the accessibility features of the HealthStatus component, including proper ARIA labels and keyboard navigation.",
      },
    },
  },
};
