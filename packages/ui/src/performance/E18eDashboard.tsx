import React, { useState, useEffect } from "react";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  target: number;
  status: "good" | "warning" | "critical";
  description: string;
}

interface E18eDashboardProps {
  title?: string;
  metrics?: PerformanceMetric[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const defaultMetrics: PerformanceMetric[] = [
  {
    name: "First Contentful Paint",
    value: 1.2,
    unit: "s",
    target: 1.8,
    status: "good",
    description: "Time until first content is painted",
  },
  {
    name: "Largest Contentful Paint",
    value: 2.1,
    unit: "s",
    target: 2.5,
    status: "good",
    description: "Time until largest content is painted",
  },
  {
    name: "First Input Delay",
    value: 45,
    unit: "ms",
    target: 100,
    status: "good",
    description: "Time until first user interaction is processed",
  },
  {
    name: "Cumulative Layout Shift",
    value: 0.08,
    unit: "",
    target: 0.1,
    status: "good",
    description: "Visual stability score",
  },
  {
    name: "Time to Interactive",
    value: 3.2,
    unit: "s",
    target: 3.8,
    status: "warning",
    description: "Time until page is fully interactive",
  },
  {
    name: "Total Blocking Time",
    value: 180,
    unit: "ms",
    target: 200,
    status: "good",
    description: "Total time blocked by long tasks",
  },
];

export const E18eDashboard: React.FC<E18eDashboardProps> = ({
  title = "E18e Performance Dashboard",
  metrics = defaultMetrics,
  autoRefresh = false,
  refreshInterval = 5000,
}) => {
  const [currentMetrics, setCurrentMetrics] = useState(metrics);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate metric updates
        setCurrentMetrics((prev) =>
          prev.map((metric) => ({
            ...metric,
            value: metric.value + (Math.random() - 0.5) * 0.1 * metric.value,
          })),
        );
        setLastUpdated(new Date());
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "#28a745";
      case "warning":
        return "#ffc107";
      case "critical":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return "✅";
      case "warning":
        return "⚠️";
      case "critical":
        return "❌";
      default:
        return "📊";
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>{title}</h1>
        <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {currentMetrics.map((metric, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              padding: "1.5rem",
              background: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{metric.name}</h3>
              <span style={{ fontSize: "1.2rem" }}>{getStatusIcon(metric.status)}</span>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: getStatusColor(metric.status),
                  marginBottom: "0.5rem",
                }}
              >
                {metric.value.toFixed(metric.unit === "" ? 3 : 1)}
                {metric.unit}
              </div>
              <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                Target: {metric.target}
                {metric.unit}
              </div>
            </div>

            <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>{metric.description}</div>

            <div style={{ marginTop: "1rem" }}>
              <div
                style={{
                  height: "4px",
                  background: "#e9ecef",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: getStatusColor(metric.status),
                    width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0" }}>Performance Summary</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <strong>Good:</strong> {currentMetrics.filter((m) => m.status === "good").length}
          </div>
          <div>
            <strong>Warning:</strong> {currentMetrics.filter((m) => m.status === "warning").length}
          </div>
          <div>
            <strong>Critical:</strong>{" "}
            {currentMetrics.filter((m) => m.status === "critical").length}
          </div>
        </div>
      </div>
    </div>
  );
};
