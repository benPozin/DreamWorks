export default function FAQ() {
  return (
    <div className="py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>

      <details className="border rounded-lg p-4">
        <summary className="font-medium">How do I handle resin safely?</summary>
        <p className="mt-2 text-slate-700">Always wear gloves and protective eyewear. Follow the cure schedule provided in product specs.</p>
      </details>

      <details className="border rounded-lg p-4">
        <summary className="font-medium">How long does shipping take?</summary>
        <p className="mt-2 text-slate-700">Orders ship within 2–4 business days across Canada.</p>
      </details>

      <details className="border rounded-lg p-4">
        <summary className="font-medium">What’s the return policy?</summary>
        <p className="mt-2 text-slate-700">Unopened items can be returned within 30 days for a refund or replacement.</p>
      </details>

      <details className="border rounded-lg p-4">
        <summary className="font-medium">Are these resins compatible with all printers?</summary>
        <p className="mt-2 text-slate-700">We test each resin with leading dental printers; compatibility information is listed on product pages.</p>
      </details>
    </div>
  );
}