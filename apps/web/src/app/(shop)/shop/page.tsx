import { redirect } from "next/navigation";

export default function ShopPage() {
  // Redirect to catalog as default shop page
  redirect("/catalog");
}
