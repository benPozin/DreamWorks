"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Section } from "@/components/site/section";
import {
  type Order,
  type OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  ALL_STATUSES,
  rowToOrder,
} from "@/lib/orders";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

async function downloadFile(path: string) {
  const { data, error } = await supabase.storage
    .from("case-files")
    .createSignedUrl(path, 60 * 60); // link valid for 1 hour
  if (error || !data) {
    alert("Could not generate download link. Try again.");
    return;
  }
  window.open(data.signedUrl, "_blank");
}

export default function AdminPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    // Not logged in → send to login
    if (!user) { router.replace("/login"); return; }
    // Logged in but not admin → send home
    if (!user.isAdmin) { router.replace("/"); return; }

    // Fetch ALL orders (admin policy allows this)
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data ? data.map(rowToOrder) : []);
        setLoading(false);
      });
  }, [ready, user, router]);

  // Update a single order's status.
  // Optimistic: update the UI instantly, revert + log if Supabase rejects it.
  const updateStatus = async (orderId: string, status: OrderStatus) => {
    const snapshot = orders;
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );

    const { error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      console.error("Status update failed:", error);
      setOrders(snapshot); // revert
    }
  };

  if (!ready || !user?.isAdmin) return null;

  return (
    <Section className="pt-28! pb-10!">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-blue font-semibold">
            Lab Admin
          </div>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
            All Orders
          </h1>
        </div>
        <p className="text-sm text-fg-subtle pb-1">
          {orders.length} {orders.length === 1 ? "case" : "cases"} total
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-fg-subtle">Loading orders…</p>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-bg-muted/40">
              <tr>
                {["Date", "Doctor", "Service", "Total", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-fg-subtle"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-bg-muted/20 transition-colors"
                >
                  {/* Date */}
                  <td className="px-4 py-3 text-fg-subtle whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Doctor */}
                  <td className="px-4 py-3">
                    <div className="font-medium text-fg">{order.doctorName}</div>
                    <div className="text-xs text-fg-subtle">{order.doctorEmail}</div>
                  </td>

                  {/* Service */}
                  <td className="px-4 py-3">
                    <div className="font-medium text-fg">{order.serviceName}</div>
                    <div className="text-xs text-fg-subtle">
                      {order.tier === "vip" ? "VIP" : "Regular"} ·{" "}
                      {order.quantity} {order.quantity === 1 ? "unit" : "units"}
                      {order.isRush && (
                        <span className="ml-1.5 text-orange-600 font-medium">
                          · Rush
                        </span>
                      )}
                      {order.shade && (
                        <span className="ml-1.5">· {order.shade}</span>
                      )}
                    </div>
                    {order.notes && (
                      <div className="mt-1 text-xs text-fg-subtle italic max-w-xs truncate">
                        "{order.notes}"
                      </div>
                    )}
                  </td>

                  {/* Total + file */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-fg">${order.total.toLocaleString()}</div>
                    {order.filePath && (
                      <button
                        type="button"
                        onClick={() => downloadFile(order.filePath!)}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] text-blue hover:text-blue-deep transition-colors cursor-pointer"
                      >
                        <Download className="size-3" />
                        Download file
                      </button>
                    )}
                  </td>

                  {/* Status — dropdown to change it */}
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value as OrderStatus)
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold cursor-pointer focus:outline-none appearance-none",
                        STATUS_COLORS[order.status],
                      )}
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
