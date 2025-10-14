"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

/**
 * API Documentation Page
 * Swagger UI for GotMusic API
 * Only available in development
 */
export default function APIDocsPage() {
  // Only show docs in development
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-fg mb-4">API Documentation</h1>
          <p className="text-fg/70">API docs are not available in production.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI
        url="/api/docs"
        deepLinking={true}
        displayOperationId={false}
        defaultModelsExpandDepth={1}
        defaultModelExpandDepth={1}
        docExpansion="list"
        supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
        tryItOutEnabled={true}
        requestInterceptor={(request) => {
          // Add any custom request headers if needed
          return request;
        }}
        responseInterceptor={(response) => {
          // Handle responses if needed
          return response;
        }}
      />
    </div>
  );
}
