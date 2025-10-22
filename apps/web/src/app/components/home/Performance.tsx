"use client";

import { useState, useEffect } from "react";

interface PerformanceMetric {
  label: string;
  value: string;
  description: string;
  color: "primary" | "accent" | "success" | "warning";
}

const METRICS: PerformanceMetric[] = [
  {
    label: "API Response Time",
    value: "< 50ms",
    description: "Average response time across all endpoints",
    color: "primary",
  },
  {
    label: "Uptime",
    value: "99.9%",
    description: "Service availability over the last 30 days",
    color: "success",
  },
  {
    label: "Throughput",
    value: "10k+",
    description: "Requests processed per second",
    color: "accent",
  },
  {
    label: "Error Rate",
    value: "< 0.1%",
    description: "Failed requests across all services",
    color: "warning",
  },
];

const COLOR_CLASSES = {
  primary: "text-[var(--color-brand-primary,#6AE6A6)]",
  accent: "text-[var(--color-brand-accent,#5BD0FF)]",
  success: "text-green-500",
  warning: "text-yellow-500",
};

export default function Performance() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)]"
      aria-labelledby="performance-heading"
      data-testid="performance-section"
    >
      <header className="mb-8 sm:mb-10 text-center">
        <h2 id="performance-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Performance Metrics
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[var(--color-fg-muted,#A9B1C1)]">
          Real-time performance data across our infrastructure stack
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className={[
              "rounded-[var(--radius-md,12px)] border border-[var(--border-soft)] bg-[var(--color-bg,#0B0D12)] p-4 sm:p-6 text-center transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`text-2xl sm:text-3xl font-bold ${COLOR_CLASSES[metric.color]}`}>
              {metric.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-[var(--color-fg,#E6EAF2)]">
              {metric.label}
            </div>
            <div className="mt-1 text-xs text-[var(--color-fg-muted,#A9B1C1)]">
              {metric.description}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-8 sm:mt-10">
        <div className="rounded-[var(--radius-md,12px)] border border-[var(--border-soft)] bg-[var(--color-bg,#0B0D12)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-fg,#E6EAF2)] mb-4">
            Response Time Trends
          </h3>
          <div className="h-32 bg-[var(--color-bg-elevated,#121520)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm text-[var(--color-fg-muted,#A9B1C1)]">
                Performance chart would be rendered here
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-[var(--color-fg-muted,#A9B1C1)]">All systems operational</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-pulse"></div>
          <span className="text-[var(--color-fg-muted,#A9B1C1)]">Real-time monitoring</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[var(--color-brand-accent,#5BD0FF)] rounded-full"></div>
          <span className="text-[var(--color-fg-muted,#A9B1C1)]">99.9% SLA</span>
        </div>
      </div>
    </section>
  );
}
