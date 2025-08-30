import { redirect } from "next/navigation";

export default function Canceled() {
  // Server-side redirect to home
  redirect("/?canceled=1");
}