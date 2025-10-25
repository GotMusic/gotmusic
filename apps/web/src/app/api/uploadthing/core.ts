import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/server/db";
import { assets } from "@/server/db/schema";
import { generateIdAtTime } from "@/lib/ulid";

const f = createUploadthing();

// Authentication middleware
const auth = async (req: Request) => {
  // TODO: Implement proper authentication
  // For now, return a mock user ID
  return { id: "mock-user-123" };
};

// FileRouter for GotMusic app
export const ourFileRouter = {
  // Audio file uploader for music assets
  audioUploader: f({
    audio: {
      maxFileSize: "100MB", // Large audio files for high-quality music
      maxFileCount: 1,
      allowedMimeTypes: [
        "audio/wav",
        "audio/aiff", 
        "audio/mp3",
        "audio/flac",
        "audio/ogg"
      ],
    },
  })
    .middleware(async ({ req }) => {
      // Authenticate user before upload
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Store audio file metadata in database
      const assetId = generateIdAtTime();
      
      await db.insert(assets).values({
        id: assetId,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        artist: "Unknown Artist", // TODO: Get from form data
        bpm: 120, // TODO: Get from form data
        keySig: null, // TODO: Get from form data
        priceAmount: "0.00", // TODO: Get from form data
        priceCurrency: "USD",
        priceCredits: 0,
        durationSec: 0, // TODO: Calculate from audio file
        status: "processing",
        ownerId: metadata.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        assetType: "track", // TODO: Get from form data
        isNew: true,
        isFeatured: false,
        isExclusive: false,
        genre: "Electronic", // TODO: Get from form data
        tags: JSON.stringify(["uploaded"]),
        // Store UploadThing URL
        audioUrl: file.url,
        previewUrl: file.url, // Same as audio for now
        coverUrl: null,
        heroUrl: null,
        thumbUrl: null,
        waveUrl: null,
        fileSize: file.size,
      });

      console.log("Audio uploaded successfully:", {
        assetId,
        fileName: file.name,
        fileSize: file.size,
        fileUrl: file.url,
        userId: metadata.userId,
      });

      return { 
        assetId,
        uploadedBy: metadata.userId,
        fileUrl: file.url 
      };
    }),

  // Image uploader for cover art, thumbnails, etc.
  imageUploader: f({
    image: {
      maxFileSize: "10MB",
      maxFileCount: 5,
      allowedMimeTypes: [
        "image/jpeg",
        "image/png", 
        "image/webp",
        "image/avif"
      ],
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image uploaded successfully:", {
        fileName: file.name,
        fileSize: file.size,
        fileUrl: file.url,
        userId: metadata.userId,
      });

      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url 
      };
    }),

  // Waveform image uploader for audio visualizations
  waveformUploader: f({
    image: {
      maxFileSize: "5MB",
      maxFileCount: 1,
      allowedMimeTypes: [
        "image/png",
        "image/svg+xml"
      ],
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Waveform uploaded successfully:", {
        fileName: file.name,
        fileSize: file.size,
        fileUrl: file.url,
        userId: metadata.userId,
      });

      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url 
      };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
