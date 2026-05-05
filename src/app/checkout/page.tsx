"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, Lock, Calendar, Zap, Crown, Sparkles, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { ToothSelector } from "@/components/site/tooth-selector";
import { ShadePicker } from "@/components/site/shade-picker";
import { FileDropzone } from "@/components/site/file-dropzone";
import { useAuth } from "@/lib/auth";
import {
  SERVICES,
  CATEGORIES,
  calcTotal,
  hasTier,
  priceFor,
  type Service,
  type Tier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

function CheckoutInner() {
  const sp = useSearchParams();
  const initialId = sp.get("service");
  const { user } = useAuth();

  const [serviceId, setServiceId] = useState<string>(
    initialId && SERVICES.find((s) => s.id === initialId && !s.unavailable)
      ? initialId
      : SERVICES.find((s) => !s.unavailable && s.popular)?.id ?? SERVICES[0].id,
  );
  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId],
  );

  const [teeth, setTeeth] = useState<number[]>([]);
  const [tier, setTier] = useState<Tier>(() => {
    const init = SERVICES.find((s) => s.id === serviceId);
    return init && hasTier(init, "regular") ? "regular" : "vip";
  });
  const [dueDate, setDueDate] = useState<string>("");
  const [isRush, setIsRush] = useState(false);
  const [shade, setShade] = useState<string>("");
  const [patientInitials, setPatientInitials] = useState("");
  const [notes, setNotes] = useState("");

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done" | "error">("idle");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  // When the service changes, snap tier to a valid one. Done in the handler
  // (not in an effect) so React 19's purity rules stay happy.
  const onServiceChange = (id: string) => {
    setServiceId(id);
    setTeeth([]);
    const next = SERVICES.find((s) => s.id === id);
    if (next && !hasTier(next, tier)) {
      setTier(hasTier(next, "regular") ? "regular" : "vip");
    }
  };

  const onDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setDueDate(v);
    if (!v) {
      setIsRush(false);
      return;
    }
    const days = (new Date(v).getTime() - Date.now()) / 86_400_000;
    setIsRush(days >= 0 && days < 3);
  };

  const handleSubmit = async () => {
    if (!user || !service || total === null) return;

    // Validate required fields
    if (!dueDate) {
      setSubmitError("Please select a due date.");
      return;
    }
    if (requiresToothSelection && multiplier === 0) {
      setSubmitError(
        isPerArch
          ? "Please select at least one arch."
          : "Please select at least one tooth.",
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const { data: insertedOrder, error } = await supabase.from("orders").insert({
        doctor_id: user.id,
        doctor_name: user.name,
        doctor_email: user.email,
        service_id: service.id,
        service_name: service.name,
        category: service.category,
        tier,
        teeth: teeth.length > 0 ? teeth : null,
        shade: shade || null,
        due_date: dueDate || null,
        is_rush: isRush,
        patient_initials: patientInitials || null,
        notes: notes || null,
        unit_price: unitPrice ?? 0,
        quantity: multiplier,
        total,
      }).select().single();

      if (error) {
        console.error("Supabase insert error:", error);
        setSubmitError(error.message);
        return;
      }

      // If a file was attached, upload it now that we have the order ID
      if (file && insertedOrder) {
        setUploadState("uploading");
        const safeName = file.name.replace(/\s+/g, "_");
        const path = `${user.id}/${insertedOrder.id}/${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("case-files")
          .upload(path, file, { upsert: false });

        if (uploadError) {
          console.error("File upload error:", uploadError);
          setUploadState("error");
          // Order was saved — just note the file didn't upload
          setSubmitError("Case submitted, but the file failed to upload. Please contact us.");
        } else {
          // Save the file path on the order
          await supabase.from("orders").update({ file_path: path }).eq("id", insertedOrder.id);
          setUploadState("done");
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Unexpected submit error:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isPerArch = service?.mode.kind === "perArch";
  const requiresToothSelection = service?.mode.kind !== "flat";
  const showSelectAll =
    service?.category === "AllOnX" || service?.category === "Removables";

  const archFromTeeth = useMemo(() => ({
    upper: Array.from({ length: 16 }, (_, i) => i + 1).every((n) => teeth.includes(n)),
    lower: Array.from({ length: 16 }, (_, i) => i + 17).every((n) => teeth.includes(n)),
  }), [teeth]);

  const { total, multiplier } = useMemo(
    () =>
      calcTotal({
        service,
        tier,
        teeth: teeth.length,
        archSelection: archFromTeeth,
      }),
    [service, tier, teeth, archFromTeeth],
  );

  const unitPrice = service ? priceFor(service, tier) : null;

  return (
    <>
      <PageHeader
        compact
        eyebrow="Submit a case"
        title={
          <>
            Checkout, <span className="blue-text font-serif italic font-light">simplified.</span>
          </>
        }
        description="One clean form for service, files, and final submission."
      />

      <Section className="py-6! sm:py-8!">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-white p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            <div>
              <Label>Service</Label>
              <div className="mt-1.5">
                <ServicePicker value={serviceId} onChange={onServiceChange} />
              </div>
            </div>
            <div>
              <Label>Due date</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-subtle pointer-events-none" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={onDueDateChange}
                  className="w-full rounded-xl border border-border bg-white pl-10 pr-3.5 py-3 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
                />
              </div>
            </div>
            <div>
              <Label>Patient initials (optional)</Label>
              <input
                placeholder="J.S."
                value={patientInitials}
                onChange={(e) => setPatientInitials(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
              />
            </div>
          </div>

          {isRush && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
              <Zap className="size-3" />
              Rush case: priority handling applied
            </div>
          )}

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 rounded-xl border border-border bg-bg-muted/30 p-3.5 sm:p-4">
              {requiresToothSelection && (
                <div>
                  <Label>Select teeth</Label>
                  <p className="mt-1 text-xs text-fg-subtle">
                    {service?.category === "AllOnX"
                      ? "Select full arches for All-on-X cases."
                      : service?.category === "Removables"
                      ? "Use arch buttons for removable appliances."
                      : "Tap the teeth included in this case."}
                  </p>
                  <div className="mt-2">
                    <ToothSelector
                      key={serviceId}
                      onChange={setTeeth}
                      showSelectAll={showSelectAll}
                      compact
                    />
                  </div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label>Service tier</Label>
                  <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                        tier === "regular"
                          ? "border-blue bg-blue-haze/60 text-blue-deep"
                          : "border-border bg-white text-fg",
                        !service || !hasTier(service, "regular")
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer hover:border-blue/40",
                      )}
                      onClick={() => setTier("regular")}
                      disabled={!service || !hasTier(service, "regular")}
                    >
                      <Sparkles className="size-4" />
                      Regular
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                        tier === "vip"
                          ? "border-vip-gold bg-vip-bg text-vip-gold-soft"
                          : "border-border bg-white text-fg",
                        !service || !hasTier(service, "vip")
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer hover:border-vip-gold/50",
                      )}
                      onClick={() => setTier("vip")}
                      disabled={!service || !hasTier(service, "vip")}
                    >
                      <Crown className="size-4" />
                      VIP
                    </button>
                  </div>
                  {service && (!hasTier(service, "regular") || !hasTier(service, "vip")) && (
                    <p className="mt-2 text-xs text-fg-subtle">
                      {!hasTier(service, "regular")
                        ? "This service is offered in VIP only."
                        : "This service is offered in Regular only."}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Shade</Label>
                  <div className="mt-1.5">
                    <ShadePicker value={shade} onChange={setShade} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="rounded-xl border border-border bg-bg-muted/40 p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] text-blue font-semibold">
                  Case summary
                </div>
                <div className="mt-1 font-display text-lg font-semibold tracking-tight">
                  {service?.name ?? "No service selected"}
                </div>
                <div className="mt-0.5 text-xs text-fg-subtle">
                  {service?.category === "AllOnX" ? "All-on-X" : service?.category} ·{" "}
                  {tier === "vip" ? "VIP" : "Regular"}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-fg-subtle">Quantity</div>
                    <div className="font-medium text-fg">
                      {multiplier} {multiplier === 1 ? "unit" : "units"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-fg-subtle">Shade</div>
                    <div className="font-medium text-fg">{shade || "None"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-fg-subtle">{isPerArch ? "Per arch" : "Unit price"}</div>
                    {user ? (
                      <div className="font-medium text-fg">
                        {unitPrice != null ? `$${unitPrice.toLocaleString()}` : "N/A"}
                      </div>
                    ) : (
                      <div className="text-fg-subtle">Sign in</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-fg-subtle">Rush</div>
                    <div className={cn("font-medium", isRush ? "text-orange-700" : "text-fg-subtle")}>
                      {isRush ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label>Notes for the lab</Label>
                <textarea
                  rows={3}
                  placeholder="Specific occlusion, contact, contour, or shade notes…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm placeholder:text-fg-subtle focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 resize-none"
                />
              </div>
              <div>
                <Label>3D case file</Label>
                <p className="mt-1 text-xs text-fg-subtle">Up to 500MB.</p>
                <div className="mt-2">
                  <FileDropzone
                  compact
                  onFileChange={setFile}
                  uploadState={uploadState}
                />
                </div>
              </div>
            </div>
          </div>

          {submitted ? (
            // ── Success state ──────────────────────────────────────────────
            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5 text-green-700">
                <CheckCircle className="size-5 shrink-0" />
                <div>
                  <div className="font-semibold">Case submitted!</div>
                  <div className="text-sm text-green-600">We&apos;ll get started right away.</div>
                </div>
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button asChild variant="primary" size="sm">
                  <Link href="/account">View order history</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setTeeth([]);
                    setShade("");
                    setPatientInitials("");
                    setNotes("");
                    setDueDate("");
                    setIsRush(false);
                    setFile(null);
                    setUploadState("idle");
                  }}
                >
                  Submit another
                </Button>
              </div>
            </div>
          ) : (
            // ── Normal action bar ──────────────────────────────────────────
            <>
              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs text-fg-subtle">Estimated total</div>
                  {user ? (
                    <div className="font-display text-2xl font-semibold tracking-tight">
                      {total != null ? `$${total.toLocaleString()}` : "Select options"}
                    </div>
                  ) : (
                    <Link
                      href="/login?next=/checkout"
                      className="mt-1 inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-blue transition-colors"
                    >
                      <Lock className="size-3.5" />
                      Sign in to view pricing
                    </Link>
                  )}
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  {!user && (
                    <Button asChild variant="ghost" size="sm" className="w-full sm:w-auto">
                      <Link href="/login?next=/checkout">Sign in</Link>
                    </Button>
                  )}
                  {submitError && (
                    <p className="text-sm text-red-600 self-center">{submitError}</p>
                  )}
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={!user || total === null || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? "Submitting…" : "Submit case"}
                    {!submitting && <ArrowUpRight className="size-4" />}
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-fg-subtle">
                By submitting, you confirm you&apos;re a licensed dental professional.
              </p>
            </>
          )}
        </div>
      </Section>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}

function ServicePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const grouped = useMemo(() => {
    const m: Record<string, Service[]> = {};
    for (const s of SERVICES) {
      if (s.unavailable) continue;
      m[s.category] ??= [];
      m[s.category].push(s);
    }
    return m;
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
    >
      {CATEGORIES.filter((c) => grouped[c]?.length).map((cat) => (
        <optgroup key={cat} label={cat === "AllOnX" ? "All-on-X" : cat}>
          {grouped[cat].map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs uppercase tracking-[0.18em] text-fg-subtle font-semibold">
      {children}
    </label>
  );
}

