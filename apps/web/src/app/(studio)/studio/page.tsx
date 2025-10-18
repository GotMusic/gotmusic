import { redirect } from "next/navigation";

export default function StudioPage() {
  // Redirect to studio assets as default studio page
  redirect("/studio/assets");
}
