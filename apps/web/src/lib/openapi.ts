// Generate OpenAPI spec for GotMusic API

export function generateOpenAPISpec() {
  return {
    openapi: "3.0.3",
    info: {
      title: "GotMusic API",
      description: "Music NFT marketplace API powered by Ethereum",
      version: "1.0.0",
      contact: {
        name: "GotMusic Team",
        url: "https://github.com/GotMusic/gotmusic",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    paths: {
      "/api/assets": {
        get: {
          summary: "List assets",
          description: "Get paginated list of assets with optional filtering",
          tags: ["Assets"],
          parameters: [
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
              description: "Number of assets to return",
            },
            {
              name: "cursor",
              in: "query",
              schema: { type: "string" },
              description: "Cursor for pagination",
            },
            {
              name: "status",
              in: "query",
              schema: { type: "string", enum: ["processing", "ready", "error"] },
              description: "Filter by status",
            },
            {
              name: "q",
              in: "query",
              schema: { type: "string" },
              description: "Search query",
            },
          ],
          responses: {
            "200": {
              description: "List of assets",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Asset" },
                      },
                      nextCursor: { type: "string", nullable: true },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/assets/{id}": {
        get: {
          summary: "Get asset by ID",
          description: "Retrieve a single asset by its ID",
          tags: ["Assets"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Asset ID",
            },
          ],
          responses: {
            "200": {
              description: "Asset details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Asset" },
                },
              },
            },
            "404": {
              description: "Asset not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        patch: {
          summary: "Update asset",
          description: "Update asset fields with idempotency support",
          tags: ["Assets"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Asset ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateAssetInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated asset",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Asset" },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Asset not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/assets/{id}/audit": {
        get: {
          summary: "Get asset audit log",
          description: "Retrieve audit log for an asset",
          tags: ["Assets"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Asset ID",
            },
          ],
          responses: {
            "200": {
              description: "Asset audit log",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuditLogResponse" },
                },
              },
            },
            "404": {
              description: "Asset not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/assets/{id}/download": {
        get: {
          summary: "Get asset download URL",
          description: "Generate signed download URL for an asset",
          tags: ["Assets"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Asset ID",
            },
          ],
          responses: {
            "200": {
              description: "Download URL",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      url: { type: "string", example: "https://cdn.example.com/asset.mp3" },
                      ttlSeconds: { type: "number", example: 3600 },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Asset not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/upload/notify": {
        post: {
          summary: "Notify upload completion",
          description: "Mark asset as processing after upload",
          tags: ["Upload"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UploadNotifyInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Upload notification processed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      ok: { type: "boolean", example: true },
                      fileId: { type: "string", example: "file-beat_001-original-1234567890" },
                      assetId: { type: "string", example: "beat_001" },
                      status: { type: "string", example: "processing" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Asset not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/upload/complete": {
        post: {
          summary: "Complete asset processing",
          description: "Mark asset as ready or error after processing",
          tags: ["Upload"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UploadCompleteInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Processing completion processed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      ok: { type: "boolean", example: true },
                      assetId: { type: "string", example: "beat_001" },
                      status: { type: "string", example: "ready" },
                      message: { type: "string", example: "Asset processing complete" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Asset not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/healthz": {
        get: {
          summary: "Health check",
          description: "Basic health check endpoint for load balancers",
          tags: ["Health"],
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "healthy" },
                      timestamp: { type: "string", example: "2025-10-14T22:30:16.302Z" },
                      service: { type: "string", example: "gotmusic-api" },
                    },
                    required: ["status", "timestamp", "service"],
                  },
                },
              },
            },
          },
        },
      },
      "/api/readiness": {
        get: {
          summary: "Readiness check",
          description: "Readiness check with database connectivity verification",
          tags: ["Health"],
          responses: {
            "200": {
              description: "Service is ready",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ready" },
                      timestamp: { type: "string", example: "2025-10-14T22:30:22.825Z" },
                      service: { type: "string", example: "gotmusic-api" },
                      database: {
                        type: "object",
                        properties: {
                          driver: { type: "string", example: "postgres" },
                          connected: { type: "boolean", example: true },
                          testQuery: { type: "string", example: "success" },
                        },
                        required: ["driver", "connected", "testQuery"],
                      },
                    },
                    required: ["status", "timestamp", "service", "database"],
                  },
                },
              },
            },
            "503": {
              description: "Service not ready",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "not_ready" },
                      timestamp: { type: "string", example: "2025-10-14T22:30:18.325Z" },
                      service: { type: "string", example: "gotmusic-api" },
                      database: {
                        type: "object",
                        properties: {
                          driver: { type: "string", example: "postgres" },
                          connected: { type: "boolean", example: false },
                          error: { type: "string", example: "Database connection failed" },
                        },
                        required: ["driver", "connected", "error"],
                      },
                    },
                    required: ["status", "timestamp", "service", "database"],
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            id: { type: "string", example: "beat_001" },
            title: { type: "string", example: "Night Drive 88" },
            artist: { type: "string", example: "KiloWav" },
            bpm: { type: "number", nullable: true, example: 88 },
            keySig: { type: "string", nullable: true, example: "Am" },
            priceAmount: { type: "number", example: 12.0 },
            priceCurrency: { type: "string", example: "PYUSD" },
            status: { type: "string", enum: ["draft", "published", "archived", "processing", "ready", "error"], example: "published" },
            createdAt: { type: "number", example: 1234567890 },
            updatedAt: { type: "number", example: 1234567890 },
          },
          required: [
            "id",
            "title",
            "artist",
            "priceAmount",
            "priceCurrency",
            "status",
            "createdAt",
            "updatedAt",
          ],
        },
        UpdateAssetInput: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 1, maxLength: 200, example: "Updated Title" },
            artist: { type: "string", minLength: 1, maxLength: 200, example: "Updated Artist" },
            bpm: { type: "number", minimum: 1, example: 120 },
            keySig: { type: "string", maxLength: 10, example: "C Major" },
            priceAmount: { type: "number", minimum: 0, example: 29.99 },
            priceCurrency: { type: "string", minLength: 3, maxLength: 3, example: "USD" },
            status: { type: "string", enum: ["draft", "published", "archived", "processing", "ready", "error"], example: "published" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Asset not found" },
          },
          required: ["error"],
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Validation failed" },
            details: { type: "object", additionalProperties: true },
          },
          required: ["error"],
        },
        UploadNotifyInput: {
          type: "object",
          properties: {
            assetId: { type: "string", example: "beat_001" },
            key: { type: "string", example: "uploads/beat_001.mp3" },
            contentType: { type: "string", example: "audio/mpeg" },
            bytes: { type: "number", example: 1024000 },
          },
          required: ["assetId", "key"],
        },
        UploadCompleteInput: {
          type: "object",
          properties: {
            assetId: { type: "string", example: "beat_001" },
            status: {
              type: "string",
              enum: ["ready", "error"],
              default: "ready",
              example: "ready",
            },
            errorMessage: { type: "string", example: "Processing failed" },
          },
          required: ["assetId"],
        },
        AuditLogEntry: {
          type: "object",
          properties: {
            id: { type: "string", example: "audit-beat_001-1234567890-abc123" },
            assetId: { type: "string", example: "beat_001" },
            operation: { type: "string", example: "update" },
            userId: { type: "string", nullable: true, example: "user123" },
            before: { type: "object", nullable: true },
            after: { type: "object", nullable: true },
            changedFields: {
              type: "array",
              items: { type: "string" },
              example: ["title", "priceAmount"],
            },
            createdAt: { type: "number", example: 1234567890 },
          },
          required: [
            "id",
            "assetId",
            "operation",
            "userId",
            "before",
            "after",
            "changedFields",
            "createdAt",
          ],
        },
        AuditLogResponse: {
          type: "object",
          properties: {
            assetId: { type: "string", example: "beat_001" },
            auditLogs: {
              type: "array",
              items: { $ref: "#/components/schemas/AuditLogEntry" },
            },
            total: { type: "number", example: 5 },
          },
          required: ["assetId", "auditLogs", "total"],
        },
      },
    },
  };
}
