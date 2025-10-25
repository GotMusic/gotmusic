import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next.js App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Optional: Apply custom configuration
  // config: { 
  //   callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing`,
  //   uploadthingId: process.env.UPLOADTHING_APP_ID,
  // },
});
