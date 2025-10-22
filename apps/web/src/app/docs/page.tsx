import { SwaggerUI } from "@/components/SwaggerUI";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation - GotMusic",
  description: "Interactive API documentation for GotMusic",
};

/**
 * API Documentation page with Swagger UI
 * Uses lazy-loaded React component for better performance
 */
export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GotMusic API Documentation</h1>
          <p className="text-gray-600">Interactive API documentation powered by Swagger UI</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <SwaggerUI url="/api/openapi" deepLinking={true} tryItOutEnabled={true} />
        </div>
      </div>
    </div>
  );
}
