import { createLogger } from "@/lib/logger";
import { db } from "@/server/db";
import { assetsPg } from "@/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq, desc, and, sql } from "drizzle-orm";

export const runtime = "nodejs";

// Query parameters schema
const StudioSalesQuerySchema = z.object({
  producerId: z.string().min(1, "Producer ID is required"),
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export async function GET(req: NextRequest) {
  const logger = createLogger();

  try {
    const { searchParams } = new URL(req.url);
    const query = {
      producerId: searchParams.get("producerId"),
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
    };

    // Validate query parameters
    const parseResult = StudioSalesQuerySchema.safeParse(query);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const { producerId, limit, offset } = parseResult.data;

    // For now, return stub sales data since we don't have a sales/transactions table yet
    // This will be replaced with real sales data when the payment system is implemented
    
    // Get producer's published assets for context
    const publishedAssets = await db
      .select({
        id: assetsPg.id,
        title: assetsPg.title,
        artist: assetsPg.artist,
        priceAmount: assetsPg.priceAmount,
        priceCurrency: assetsPg.priceCurrency,
      })
      .from(assetsPg)
      .where(and(eq(assetsPg.ownerId, producerId), eq(assetsPg.status, "published")))
      .orderBy(desc(assetsPg.updatedAt));

    // Generate stub sales data for demo purposes
    const stubSales = publishedAssets.slice(0, 5).map((asset, index) => ({
      id: `sale_${asset.id}_${index}`,
      assetId: asset.id,
      assetTitle: asset.title,
      assetArtist: asset.artist,
      buyerAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      easUid: `0x${Math.random().toString(16).slice(2, 66)}`,
      priceAmount: asset.priceAmount,
      priceCurrency: asset.priceCurrency,
      soldAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).getTime(), // Staggered timestamps
      blockscoutUrl: `https://base-sepolia.blockscout.com/tx/0x${Math.random().toString(16).slice(2, 66)}`,
    }));

    // Calculate summary statistics
    const totalSales = stubSales.length;
    const totalRevenue = stubSales.reduce((sum, sale) => {
      const amount = parseFloat(sale.priceAmount) || 0;
      return sum + amount;
    }, 0);

    const topAsset = stubSales.length > 0 
      ? stubSales.reduce((top, sale) => {
          const currentAmount = parseFloat(sale.priceAmount) || 0;
          const topAmount = parseFloat(top.priceAmount) || 0;
          return currentAmount > topAmount ? sale : top;
        })
      : null;

    logger.info("Studio sales fetched", {
      producerId,
      totalSales,
      totalRevenue,
      publishedAssetsCount: publishedAssets.length,
    });

    return NextResponse.json({
      sales: stubSales,
      summary: {
        totalSales,
        totalRevenue: totalRevenue.toFixed(2),
        currency: "USD", // Will be PYUSD when payments are implemented
        topAsset: topAsset ? {
          id: topAsset.assetId,
          title: topAsset.assetTitle,
          sales: 1, // Stub value
          revenue: topAsset.priceAmount,
        } : null,
      },
      pagination: {
        total: totalSales,
        limit,
        offset,
        hasMore: false, // Stub data is limited
      },
      note: "This is stub data for demo purposes. Real sales data will be available when the payment system is implemented.",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch studio sales";
    logger.error("[studio/sales] Error:", e instanceof Error ? e : new Error(message));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
