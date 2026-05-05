// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "submitted"
  | "in_progress"
  | "ready"
  | "shipped"
  | "delivered";

export type Order = {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorEmail: string;
  serviceId: string;
  serviceName: string;
  category: string;
  tier: "regular" | "vip";
  teeth: number[] | null;
  shade: string | null;
  dueDate: string | null;
  isRush: boolean;
  patientInitials: string | null;
  notes: string | null;
  unitPrice: number;
  quantity: number;
  total: number;
  status: OrderStatus;
  filePath: string | null;
  createdAt: string;
};

// ─── Status display config ────────────────────────────────────────────────────

/** Human-readable labels for each status */
export const STATUS_LABELS: Record<OrderStatus, string> = {
  submitted: "Submitted",
  in_progress: "In Progress",
  ready: "Ready",
  shipped: "Shipped",
  delivered: "Delivered",
};

/** Tailwind classes for the coloured status badge */
export const STATUS_COLORS: Record<OrderStatus, string> = {
  submitted: "text-blue-600 bg-blue-50 border-blue-200",
  in_progress: "text-orange-600 bg-orange-50 border-orange-200",
  ready: "text-purple-600 bg-purple-50 border-purple-200",
  shipped: "text-indigo-600 bg-indigo-50 border-indigo-200",
  delivered: "text-green-600 bg-green-50 border-green-200",
};

export const ALL_STATUSES: OrderStatus[] = [
  "submitted",
  "in_progress",
  "ready",
  "shipped",
  "delivered",
];

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Convert a raw Supabase row (snake_case) into a typed Order (camelCase). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToOrder(row: any): Order {
  return {
    id: row.id,
    doctorId: row.doctor_id,
    doctorName: row.doctor_name,
    doctorEmail: row.doctor_email,
    serviceId: row.service_id,
    serviceName: row.service_name,
    category: row.category,
    tier: row.tier,
    teeth: row.teeth ?? null,
    shade: row.shade ?? null,
    dueDate: row.due_date ?? null,
    isRush: row.is_rush ?? false,
    patientInitials: row.patient_initials ?? null,
    notes: row.notes ?? null,
    unitPrice: row.unit_price,
    quantity: row.quantity,
    total: row.total,
    status: row.status,
    filePath: row.file_path ?? null,
    createdAt: row.created_at,
  };
}
