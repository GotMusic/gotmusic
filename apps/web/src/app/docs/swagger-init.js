// Load Swagger UI dynamically
(() => {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js";
  script.onload = () => {
    if (window.SwaggerUIBundle) {
      window.SwaggerUIBundle({
        url: "/api/openapi",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [window.SwaggerUIBundle.presets.apis, window.SwaggerUIBundle.presets.standalone],
        plugins: [window.SwaggerUIBundle.plugins.DownloadUrl],
        layout: "StandaloneLayout",
        tryItOutEnabled: true,
        requestInterceptor: (request) => {
          // Add any custom request headers if needed
          return request;
        },
        responseInterceptor: (response) => {
          // Handle responses if needed
          return response;
        },
      });
    }
  };
  document.head.appendChild(script);

  // Load CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css";
  document.head.appendChild(link);
})();
