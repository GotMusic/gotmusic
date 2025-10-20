"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  artist: string;
  priceAmount: number;
  priceCurrency: string;
  status: "draft" | "published" | "archived" | "processing" | "ready" | "error";
  bpm?: number;
  keySig?: string;
};

export function AssetFormIsland({ assetId }: { assetId: string }) {
  const qc = useQueryClient();

  const { data: asset, isLoading, isError } = useQuery({
    queryKey: ["admin-asset", assetId],
    queryFn: async () => {
      const r = await fetch(`/api/assets/${assetId}`, { headers: { "x-e2e-auth": "bypass" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    },
    staleTime: 10_000,
  });

  const form = useForm<FormData>({
    defaultValues: {
      title: asset?.title ?? "",
      artist: asset?.artist ?? "",
      priceAmount: asset?.priceAmount ?? 0,
      priceCurrency: asset?.priceCurrency ?? "USD",
      status: asset?.status ?? "ready",
      bpm: asset?.bpm ?? undefined,
      keySig: asset?.keySig ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (updates: Partial<FormData>) => {
      const r = await fetch(`/api/assets/${assetId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json", "x-e2e-auth": "bypass" },
        body: JSON.stringify({ updates }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    },
    // optimistic update
    onMutate: async (updates) => {
      await qc.cancelQueries({ queryKey: ["asset", assetId] });
      const prev = qc.getQueryData<FormData>(["asset", assetId]);
      qc.setQueryData(["asset", assetId], (current: FormData) => ({ ...current, ...updates }));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["asset", assetId], ctx.prev); // rollback
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["asset", assetId] });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // strip empties to keep schema clean
    const { bpm, keySig, ...rest } = data;
    mutation.mutate({
      ...rest,
      ...(bpm ? { bpm } : {}),
      ...(keySig ? { keySig } : {}),
    });
  });

  if (isLoading) return <div data-testid="asset-edit-form">Loading…</div>;
  if (isError) return <div data-testid="asset-edit-form">Error loading asset</div>;

  return (
    <form data-testid="asset-edit-form" onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-fg">
            Title
          </label>
          <input
            {...form.register("title")}
            id="title"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          />
          {form.formState.errors.title && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-fg">
            Artist
          </label>
          <input
            {...form.register("artist")}
            id="artist"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          />
          {form.formState.errors.artist && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.artist.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="priceAmount" className="block text-sm font-medium text-fg">
            Price Amount
          </label>
          <input
            {...form.register("priceAmount", { valueAsNumber: true })}
            id="priceAmount"
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          />
          {form.formState.errors.priceAmount && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.priceAmount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="priceCurrency" className="block text-sm font-medium text-fg">
            Currency
          </label>
          <select
            {...form.register("priceCurrency")}
            id="priceCurrency"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          >
            <option value="USD">USD</option>
            <option value="PYUSD">PYUSD</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-fg">
            Status
          </label>
          <select
            {...form.register("status")}
            id="status"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
            <option value="processing">Processing</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div>
          <label htmlFor="bpm" className="block text-sm font-medium text-fg">
            BPM (optional)
          </label>
          <input
            {...form.register("bpm", { valueAsNumber: true })}
            id="bpm"
            type="number"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="keySig" className="block text-sm font-medium text-fg">
            Key Signature (optional)
          </label>
          <input
            {...form.register("keySig")}
            id="keySig"
            className="mt-1 block w-full rounded-md border border-fg/20 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-3 py-2 text-sm text-white hover:bg-brand-700"
        >
          {mutation.isPending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
