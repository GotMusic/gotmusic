import type { Metadata } from "next";
import { AdminAssetsTable } from "./AdminAssetsTable";

export const metadata: Metadata = {
  title: "Asset Management - GotMusic Admin",
  description: "Manage music assets, view catalog, and track sales in the GotMusic admin panel.",
};

export default function AdminPage() {
  return <AdminAssetsTable />;
}
