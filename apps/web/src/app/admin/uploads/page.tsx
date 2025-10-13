"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export default function AdminUploadsPage() {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">Uploads</h1>

      <div className="mt-6 flex items-center gap-3">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button disabled={!file}>Upload</Button>
      </div>
    </main>
  );
}


