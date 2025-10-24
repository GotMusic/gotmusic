"use client";

import { zodResolverV4 } from "@/lib/zodResolverV4";
import { useAsset, useUpdateAsset } from "@gotmusic/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Simple toast utility
const toast = {
  success: (message: string) => {
    // In a real app, use a proper toast library like react-hot-toast
    // For now, we'll just show an alert or use a proper toast system
    alert(`✅ ${message}`);
  },
  error: (message: string) => {
    alert(`❌ ${message}`);
  },
};

// Form validation schema
const AssetEditSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  artist: z.string().min(1, "Artist is required").max(200, "Artist name too long"),
  bpm: z.number().int().positive("BPM must be positive").optional().or(z.literal("")),
  keySig: z.string().max(10, "Key signature too long").optional().or(z.literal("")),
  priceAmount: z.number().positive("Price must be positive"),
  priceCurrency: z.string().length(3, "Currency must be 3 characters"),
  status: z.enum(["draft", "published", "archived", "processing", "ready", "error"]),
});

type AssetEditForm = z.infer<typeof AssetEditSchema>;

interface AssetEditFormProps {
  assetId: string;
}

export default function AssetEditForm({ assetId }: AssetEditFormProps) {
  const router = useRouter();
  const { data: asset, isLoading, error } = useAsset(assetId);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<AssetEditForm>({
    resolver: zodResolverV4(AssetEditSchema),
    defaultValues: {
      title: "",
      artist: "",
      bpm: undefined,
      keySig: "",
      priceAmount: 0,
      priceCurrency: "USD",
      status: "ready",
    },
  });

  // Reset form when asset data loads
  useEffect(() => {
    if (asset) {
      reset({
        title: asset.title,
        artist: asset.artist,
        bpm: asset.bpm ?? undefined,
        keySig: asset.keySig ?? "",
        priceAmount: asset.priceAmount,
        priceCurrency: asset.priceCurrency,
        status: asset.status,
      });
    }
  }, [asset, reset]);

  const updateAsset = useUpdateAsset({
    onSuccess: (data) => {
      toast.success("Asset updated successfully");
      setIsEditing(false);
      // Form will auto-update via React Query cache invalidation
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
      // Form will auto-revert via React Query cache invalidation
    },
  });

  const onSubmit = (data: AssetEditForm) => {
    // Clean up empty strings for optional fields
    const updates = {
      title: data.title,
      artist: data.artist,
      priceAmount: data.priceAmount,
      priceCurrency: data.priceCurrency,
      status: data.status,
      ...(data.bpm !== undefined && data.bpm !== "" ? { bpm: data.bpm } : {}),
      ...(data.keySig && data.keySig !== "" ? { keySig: data.keySig } : {}),
    };

    // Generate idempotency key
    const idempotencyKey = `edit-${assetId}-${Date.now()}`;

    updateAsset.mutate({
      id: assetId,
      updates,
      idempotencyKey,
    });
  };

  const handleCancel = () => {
    if (asset) {
      reset({
        title: asset.title,
        artist: asset.artist,
        bpm: asset.bpm ?? undefined,
        keySig: asset.keySig ?? "",
        priceAmount: asset.priceAmount,
        priceCurrency: asset.priceCurrency,
        status: asset.status,
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-fg/70">Loading asset...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-500/20 bg-red-500/10 p-4">
        <div className="text-red-400">Error loading asset: {error.message}</div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="rounded-md border border-red-500/20 bg-red-500/10 p-4">
        <div className="text-red-400">Asset not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Asset Details</h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-fg/20 bg-transparent px-3 py-2 text-sm font-medium text-fg hover:bg-fg/5"
                disabled={updateAsset.isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || updateAsset.isPending}
                className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
              >
                {updateAsset.isPending ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-fg">
              Title *
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg placeholder-fg/50 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
              placeholder="Enter asset title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
          </div>

          {/* Artist */}
          <div>
            <label htmlFor="artist" className="block text-sm font-medium text-fg">
              Artist *
            </label>
            <input
              {...register("artist")}
              type="text"
              id="artist"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg placeholder-fg/50 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
              placeholder="Enter artist name"
            />
            {errors.artist && <p className="mt-1 text-sm text-red-400">{errors.artist.message}</p>}
          </div>

          {/* BPM */}
          <div>
            <label htmlFor="bpm" className="block text-sm font-medium text-fg">
              BPM
            </label>
            <input
              {...register("bpm", { valueAsNumber: true })}
              type="number"
              id="bpm"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg placeholder-fg/50 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
              placeholder="120"
            />
            {errors.bpm && <p className="mt-1 text-sm text-red-400">{errors.bpm.message}</p>}
          </div>

          {/* Key Signature */}
          <div>
            <label htmlFor="keySig" className="block text-sm font-medium text-fg">
              Key Signature
            </label>
            <input
              {...register("keySig")}
              type="text"
              id="keySig"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg placeholder-fg/50 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
              placeholder="C Major"
            />
            {errors.keySig && <p className="mt-1 text-sm text-red-400">{errors.keySig.message}</p>}
          </div>

          {/* Price Amount */}
          <div>
            <label htmlFor="priceAmount" className="block text-sm font-medium text-fg">
              Price Amount *
            </label>
            <input
              {...register("priceAmount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              id="priceAmount"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg placeholder-fg/50 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
              placeholder="29.99"
            />
            {errors.priceAmount && (
              <p className="mt-1 text-sm text-red-400">{errors.priceAmount.message}</p>
            )}
          </div>

          {/* Price Currency */}
          <div>
            <label htmlFor="priceCurrency" className="block text-sm font-medium text-fg">
              Currency *
            </label>
            <select
              {...register("priceCurrency")}
              id="priceCurrency"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
            >
              <option value="USD">USD</option>
              <option value="PYUSD">PYUSD</option>
              <option value="ETH">ETH</option>
            </select>
            {errors.priceCurrency && (
              <p className="mt-1 text-sm text-red-400">{errors.priceCurrency.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-fg">
              Status *
            </label>
            <select
              {...register("status")}
              id="status"
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border border-fg/20 bg-bg px-3 py-2 text-fg focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-fg/5 disabled:text-fg/70"
            >
              <option value="processing">Processing</option>
              <option value="ready">Ready</option>
              <option value="error">Error</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status.message}</p>}
          </div>
        </div>

        {/* Form Status */}
        {updateAsset.isPending && (
          <div className="rounded-md border border-blue-500/20 bg-blue-500/10 p-3">
            <div className="text-blue-400">Updating asset...</div>
          </div>
        )}

        {updateAsset.error && (
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
            <div className="text-red-400">Update failed: {updateAsset.error.message}</div>
          </div>
        )}
      </form>
    </div>
  );
}
