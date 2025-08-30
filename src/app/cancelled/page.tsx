import { redirect } from "next/navigation";

export default function Canceled() {
  redirect("/?canceled=1");
}
