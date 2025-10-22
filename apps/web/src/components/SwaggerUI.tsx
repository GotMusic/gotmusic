"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load SwaggerUI to reduce initial bundle size
const SwaggerUIRaw = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      <span className="ml-2 text-gray-600">Loading API Documentation...</span>
    </div>
  ),
});

// Import SwaggerUI CSS
import "swagger-ui-react/swagger-ui.css";

interface SwaggerUIProps {
  url: string;
  deepLinking?: boolean;
  tryItOutEnabled?: boolean;
}

export function SwaggerUI({ url, deepLinking = true, tryItOutEnabled = true }: SwaggerUIProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <span className="ml-2 text-gray-600">Loading API Documentation...</span>
        </div>
      }
    >
      <SwaggerUIRaw
        url={url}
        deepLinking={deepLinking}
        tryItOutEnabled={tryItOutEnabled}
        requestInterceptor={(request) => {
          // Add any custom request headers if needed
          return request;
        }}
        responseInterceptor={(response) => {
          // Handle responses if needed
          return response;
        }}
      />
    </Suspense>
  );
}
