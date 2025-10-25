import { AdminAssetsTable } from "@/app/studio/AdminAssetsTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminAssetsPage() {
  return <AdminAssetsTable />;
}
