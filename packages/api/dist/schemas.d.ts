import { z } from "zod";
export declare const AssetSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    artist: z.ZodString;
    bpm: z.ZodNullable<z.ZodNumber>;
    keySig: z.ZodNullable<z.ZodString>;
    priceAmount: z.ZodNumber;
    priceCurrency: z.ZodString;
    status: z.ZodEnum<{
        error: "error";
        draft: "draft";
        published: "published";
        archived: "archived";
        processing: "processing";
        ready: "ready";
    }>;
    updatedAt: z.ZodNumber;
    createdAt: z.ZodNumber;
}, z.core.$strip>;
export declare const AssetsResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        artist: z.ZodString;
        bpm: z.ZodNullable<z.ZodNumber>;
        keySig: z.ZodNullable<z.ZodString>;
        priceAmount: z.ZodNumber;
        priceCurrency: z.ZodString;
        status: z.ZodEnum<{
            error: "error";
            draft: "draft";
            published: "published";
            archived: "archived";
            processing: "processing";
            ready: "ready";
        }>;
        updatedAt: z.ZodNumber;
        createdAt: z.ZodNumber;
    }, z.core.$strip>>;
    nextCursor: z.ZodNullable<z.ZodString>;
    pagination: z.ZodOptional<z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        totalCount: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNextPage: z.ZodBoolean;
        hasPrevPage: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Asset = z.infer<typeof AssetSchema>;
export type AssetsResponse = z.infer<typeof AssetsResponseSchema>;
