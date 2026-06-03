import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Home, Car, GraduationCap, Briefcase, Heart, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Loan Products — VercelLoans" },
      { name: "description", content: "Personal loans, debt consolidation, home improvement, auto refinance and more — all with fixed rates from 5.99% APR." },
    ],
  }),
  component: LoansPage,
});

const products = [
  {
    icon: CreditCard,
    t: "Debt Consolidation",
    d: "Combine multiple high-interest debts into a single, manageable fixed monthly payment and potentially save thousands in interest.",
    apr: "from 5.99%",
    purpose: "Debt Consolidation",
    bullets: ["Simplify multiple payments into one", "Potentially lower your overall interest rate", "Fixed term so you know exactly when you're debt-free"],
  },
  {
    icon: Home,
    t: "Home Improvement",
    d: "Finance your renovation project — kitchens, bathrooms, roofing, HVAC — without tapping your home equity or using high-interest credit cards.",
    apr: "from 6.49%",
    purpose: "Home Improvement",
    bullets: ["No collateral required", "Up to $35,000 for major projects", "Fast funding — start your project sooner"],
  },
  {
    icon: Car,
    t: "Auto Refinance",
    d: "Lower your monthly car payment by refinancing your existing auto loan to a better rate. Keep your car, reduce your payment.",
    apr: "from 5.99%",
    purpose: "Auto",
    bullets: ["Reduce your monthly payment", "No prepayment penalty", "Simple online process — no dealer visit"],
  },
  {
    icon: GraduationCap,
    t: "Education Expenses",
    d: "Cover tuition, professional certifications, coding bootcamps, or continuing education costs with a straightforward personal loan.",
    apr: "from 7.49%",
    purpose: "Other",
    bullets: ["No degree restriction", "Funds for any accredited or non-accredited program", "Flexible terms from 24–84 months"],
  },
  {
    icon: Briefcase,
    t: "Small Business",
    d: "Working capital and growth loans for sole proprietors, freelancers, and LLCs. Inject cash flow without giving up equity.",
    apr: "from 8.99%",
    purpose: "Other",
    bullets: ["No equity dilution", "Funds available in 1 business day", "Ideal for contractors & freelancers"],
  },
  {
    icon: Heart,
    t: "Medical Expenses",
    d: "Predictable financing for elective procedures, dental work, fertility treatments, or emergency medical bills. Focus on recovery, not bills.",
    apr: "from 6.99%",
    purpose: "Medical",
    bullets: ["Finance any medical provider", "Deferred payment options available", "Confidential & fast approval"],
  },
];

function LoansPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Loans for every milestone</h1>
          <p className="mt-4 text-muted-foreground">
            Borrow $1,000 – $35,000 with terms from 24 to 84 months. Fixed APRs, no hidden fees, no prepayment penalties.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Fixed rates</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> No hidden fees</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Instant decision</span>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ icon: Icon, t, d, apr, purpose, bullets }) => (
            <div key={t} className="card-hover flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "var(--gradient-hero)" }}>
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              <ul className="mt-4 space-y-1.5 flex-1">
                {bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-bold text-accent">{apr} APR</span>
                <Link
                  to="/apply"
                  className="btn-lift inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  Apply <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-3xl p-10 md:p-14 text-center text-primary-foreground" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
          <h2 className="text-3xl font-bold">Not sure which loan is right for you?</h2>
          <p className="mt-3 opacity-90 text-sm max-w-lg mx-auto">Check your rate in 60 seconds and we'll match you with the best offers for your situation. Soft pull only — no impact to your score.</p>
          <Link to="/apply" className="btn-lift mt-7 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground">
            See My Offers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
