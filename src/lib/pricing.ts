export type Tier = "regular" | "vip";

export type PricingMode =
  | { kind: "perUnit" } // multiplied by tooth count
  | { kind: "perArch" } // upper / lower / both — flat per arch
  | { kind: "flat" }; // single fixed item (e.g. retainer, sport guard)

export type Service = {
  id: string;
  category:
    | "Crown & Bridge"
    | "Implants"
    | "AllOnX"
    | "Removables"
    | "Milling"
    | "Resin";
  name: string;
  /** USD. null = not available in that tier. */
  regular: number | null;
  vip: number | null;
  mode: PricingMode;
  /** Optional add-ons (e.g. abutments) */
  options?: { name: string; price: number }[];
  popular?: boolean;
  unavailable?: boolean;
  blurb?: string;
};

export const SERVICES: Service[] = [
  // ─── Crown & Bridge ───
  {
    id: "fcz-crown",
    category: "Crown & Bridge",
    name: "FCZ Crown",
    regular: 75,
    vip: 120,
    mode: { kind: "perUnit" },
    popular: true,
    blurb: "Full-contour zirconia. Posterior workhorse.",
  },
  {
    id: "emax-crown-fc",
    category: "Crown & Bridge",
    name: "Emax Crown (Full Contour)",
    regular: 100,
    vip: 150,
    mode: { kind: "perUnit" },
    popular: true,
    blurb: "Translucent lithium disilicate, anterior aesthetics.",
  },
  {
    id: "emax-veneer-fc",
    category: "Crown & Bridge",
    name: "Emax Veneer (Full Contour)",
    regular: 100,
    vip: 150,
    mode: { kind: "perUnit" },
  },
  {
    id: "emax-inlay-onlay",
    category: "Crown & Bridge",
    name: "Emax Inlay / Onlay",
    regular: 120,
    vip: null,
    mode: { kind: "perUnit" },
  },
  {
    id: "feldspatic-veneer",
    category: "Crown & Bridge",
    name: "Feldspatic Veneer",
    regular: null,
    vip: 220,
    mode: { kind: "perUnit" },
    blurb: "Hand-stacked porcelain. VIP only.",
  },
  {
    id: "pfm-crown",
    category: "Crown & Bridge",
    name: "PFM Crown",
    regular: null,
    vip: 150,
    mode: { kind: "perUnit" },
  },
  {
    id: "wax-mockup",
    category: "Crown & Bridge",
    name: "Wax Mock-up",
    regular: 15,
    vip: null,
    mode: { kind: "perUnit" },
    blurb: "$15 per unit.",
  },
  {
    id: "zirconia-layered",
    category: "Crown & Bridge",
    name: "Zirconia Layered Crown",
    regular: null,
    vip: 150,
    mode: { kind: "perUnit" },
  },
  {
    id: "emax-layered",
    category: "Crown & Bridge",
    name: "Emax Layered Crown",
    regular: 120,
    vip: 180,
    mode: { kind: "perUnit" },
  },

  // ─── Implants ───
  {
    id: "emax-implant-crown",
    category: "Implants",
    name: "Emax Implant Crown",
    regular: 290,
    vip: 350,
    mode: { kind: "perUnit" },
    options: [
      { name: "Titanium Custom Abutment", price: 150 },
      { name: "Zirconia Custom Abutment", price: 120 },
    ],
  },
  {
    id: "layered-implant-crown",
    category: "Implants",
    name: "Layered Implant Crown",
    regular: 299,
    vip: 320,
    mode: { kind: "perUnit" },
    options: [
      { name: "Titanium Custom Abutment", price: 150 },
      { name: "Zirconia Custom Abutment", price: 120 },
    ],
  },
  {
    id: "pmma-implant-crown",
    category: "Implants",
    name: "PMMA Implant Crown",
    regular: null,
    vip: 165,
    mode: { kind: "perUnit" },
    options: [
      { name: "Titanium Custom Abutment", price: 150 },
      { name: "Zirconia Custom Abutment", price: 120 },
    ],
  },
  {
    id: "screw-retained",
    category: "Implants",
    name: "Zirconia Screw-Retained Implant Crown",
    regular: 240,
    vip: 280,
    mode: { kind: "perUnit" },
    options: [
      { name: "Titanium Custom Abutment", price: 120 },
      { name: "Zirconia Custom Abutment", price: 120 },
    ],
  },
  {
    id: "ti-abutment",
    category: "Implants",
    name: "Titanium Custom Abutment",
    regular: 150,
    vip: null,
    mode: { kind: "perUnit" },
  },
  {
    id: "zr-abutment",
    category: "Implants",
    name: "Zirconia Custom Abutment",
    regular: 120,
    vip: null,
    mode: { kind: "perUnit" },
  },

  // ─── All-on-X ───
  {
    id: "aox-monolithic",
    category: "AllOnX",
    name: "Zirconia All-on-X (Monolithic, 4–6 implants)",
    regular: null,
    vip: 2500,
    mode: { kind: "perArch" },
    options: [
      { name: "Individual Teeth Thimble Bar", price: 1500 },
      { name: "Sub-Structural Titanium Bar", price: 700 },
    ],
    blurb: "Per arch: full upper or lower. Both arches x 2.",
  },
  {
    id: "aox-layered",
    category: "AllOnX",
    name: "Zirconia All-on-X (Layered, 4–6 implants)",
    regular: null,
    vip: 3200,
    mode: { kind: "perArch" },
    options: [
      { name: "Individual Teeth Thimble Bar", price: 700 },
      { name: "Sub-Structural Titanium Bar", price: 1500 },
    ],
    blurb: "Per arch: full upper or lower. Both arches x 2.",
  },
  {
    id: "ti-bar",
    category: "AllOnX",
    name: "Sub-Structural Titanium Bar",
    regular: null,
    vip: 700,
    mode: { kind: "perArch" },
  },
  {
    id: "thimble-bar",
    category: "AllOnX",
    name: "Individual Teeth Thimble Bar",
    regular: null,
    vip: 1500,
    mode: { kind: "perArch" },
  },
  {
    id: "pmma",
    category: "AllOnX",
    name: "PMMA",
    regular: null,
    vip: 700,
    mode: { kind: "perArch" },
  },

  // ─── Removables ───
  {
    id: "thermo-ng-print",
    category: "Removables",
    name: "Printed Thermo NG",
    regular: 140,
    vip: null,
    mode: { kind: "flat" },
  },
  {
    id: "milled-hard-ng",
    category: "Removables",
    name: "Milled Hard NG",
    regular: 175,
    vip: null,
    mode: { kind: "flat" },
  },
  {
    id: "milled-thermo-ng",
    category: "Removables",
    name: "Milled Thermo NG",
    regular: 200,
    vip: null,
    mode: { kind: "flat" },
  },
  {
    id: "sport-guard",
    category: "Removables",
    name: "Sport Guard",
    regular: 50,
    vip: null,
    mode: { kind: "flat" },
  },
  {
    id: "essix",
    category: "Removables",
    name: "Essix Retainer",
    regular: 35,
    vip: null,
    mode: { kind: "flat" },
  },

  // ─── Milling ───
  {
    id: "milling-crown-poz",
    category: "Milling",
    name: "Crown: Premium Origin Zirconia",
    regular: 25,
    vip: null,
    mode: { kind: "perUnit" },
    blurb: "Milling-only service. $25 per unit.",
  },

  // ─── Unavailable (placeholder) ───
  {
    id: "denture",
    category: "Removables",
    name: "Dentures",
    regular: null,
    vip: null,
    mode: { kind: "flat" },
    unavailable: true,
    blurb: "Temporarily unavailable.",
  },
];

export const CATEGORIES: Service["category"][] = [
  "Crown & Bridge",
  "Implants",
  "AllOnX",
  "Removables",
  "Milling",
  "Resin",
];

export function priceFor(svc: Service, tier: Tier): number | null {
  return tier === "vip" ? svc.vip : svc.regular;
}

export function hasTier(svc: Service, tier: Tier): boolean {
  return priceFor(svc, tier) != null;
}

/** Compute estimated total based on the service mode. */
export function calcTotal({
  service,
  tier,
  teeth,
  archSelection,
}: {
  service: Service | null;
  tier: Tier;
  teeth: number; // selected tooth count for perUnit
  archSelection: { upper: boolean; lower: boolean }; // for perArch
}): { total: number | null; multiplier: number } {
  if (!service) return { total: null, multiplier: 0 };
  const unit = priceFor(service, tier);
  if (unit == null) return { total: null, multiplier: 0 };

  switch (service.mode.kind) {
    case "perUnit": {
      const n = Math.max(teeth, 0);
      return { total: unit * n, multiplier: n };
    }
    case "perArch": {
      const archCount =
        (archSelection.upper ? 1 : 0) + (archSelection.lower ? 1 : 0);
      return { total: unit * archCount, multiplier: archCount };
    }
    case "flat":
      return { total: unit, multiplier: 1 };
  }
}
