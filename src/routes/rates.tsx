import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/rates")({
  head: () => ({
    meta: [
      { title: "Rates & Terms — VercelLoans" },
      { name: "description", content: "Fixed APRs from 5.99% to 29.99%. See sample rates and terms." },
    ],
  }),
  component: RatesPage,
});

function RatesPage() {
  const rows = [
    { tier: "Excellent (740+)", apr: "5.99% – 9.99%", term: "24 – 84 mo" },
    { tier: "Good (700 – 739)", apr: "9.99% – 14.99%", term: "24 – 72 mo" },
    { tier: "Fair (640 – 699)", apr: "14.99% – 22.99%", term: "24 – 60 mo" },
    { tier: "Building (under 640)", apr: "22.99% – 29.99%", term: "24 – 48 mo" },
  ];
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Rates & Terms</h1>
        <p className="mt-4 text-muted-foreground">Fixed APRs based on creditworthiness and selected term. No prepayment penalties.</p>
      </div>
      <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-6 py-4 font-semibold">Credit Tier</th>
              <th className="px-6 py-4 font-semibold">APR Range</th>
              <th className="px-6 py-4 font-semibold">Term</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tier} className="border-t border-border">
                <td className="px-6 py-4">{r.tier}</td>
                <td className="px-6 py-4 font-semibold">{r.apr}</td>
                <td className="px-6 py-4 text-muted-foreground">{r.term}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
        Representative example: A $10,000 loan at 9.99% APR with a 60-month term has a monthly payment of $212.47 and a total repayment of $12,748.20.
      </p>
      <div className="text-center mt-8">
        <Link to="/apply" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
          Check my rate
        </Link>
      </div>
    </div>
  );
}
