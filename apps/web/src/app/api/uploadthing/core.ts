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
      maxFileSize: "32MB", // UploadThing's maximum file size
      maxFileCount: 1,
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
      const assetId = generateIdAtTime(Date.now());
      
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
        // Store UploadThing information
        uploadThingFileId: file.name, // Use filename as ID for now
        uploadThingUrl: file.url,
        uploadThingKey: file.name, // Use filename as key for now
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
      maxFileSize: "4MB",
      maxFileCount: 5,
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
      maxFileSize: "4MB",
      maxFileCount: 1,
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
