import { redirect } from "next/navigation";

export default function StudioPage() {
  // Redirect to assets as default studio page
  redirect("/assets");
}
