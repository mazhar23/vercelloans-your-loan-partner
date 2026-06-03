import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, DollarSign } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — VercelLoans" },
      { name: "description", content: "From application to funding in three transparent steps — no surprises, no hidden fees." },
    ],
  }),
  component: HowPage,
});

const steps = [
  {
    n: "01",
    icon: FileText,
    t: "Apply online in minutes",
    d: "Fill out our streamlined 2-minute application. We ask for basic personal and financial information to generate your offers. We use a soft credit inquiry — this has zero impact on your credit score.",
    bullets: ["No SSN required to check your rate", "Takes about 2 minutes", "Soft pull — no score impact"],
  },
  {
    n: "02",
    icon: CheckCircle2,
    t: "Compare personalized offers",
    d: "Review your tailored loan offers side-by-side. Every offer includes a full disclosure of APR, monthly payment, loan term, and total cost — so you can compare with confidence.",
    bullets: ["Multiple offers in one place", "Fixed APRs — no surprises", "Full cost transparency upfront"],
  },
  {
    n: "03",
    icon: DollarSign,
    t: "Sign & receive funds",
    d: "Choose your offer, verify your identity, and sign your agreement electronically. Funds are deposited directly into your bank account — as soon as the next business day.",
    bullets: ["100% digital — no paperwork", "E-sign from any device", "Next-day funding for most borrowers"],
  },
];

const faqs = [
  { q: "How long does the whole process take?", a: "Most applicants complete their application in under 2 minutes. Approval is instant and funding usually arrives the next business day after signing." },
  { q: "What documents will I need?", a: "You'll need your Social Security Number, proof of income (pay stubs or bank statements), and your bank account details to receive funds." },
  { q: "Is there a minimum credit score?", a: "We work with borrowers across a wide credit spectrum. While there is no publicly stated minimum score, better credit typically unlocks lower rates." },
];

function HowPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            How VercelLoans works
          </h1>
          <p className="mt-4 text-muted-foreground">
            A transparent, modern lending experience — from check-rate to funded in as little as 24 hours.
          </p>
        </div>
      </section>

      {/* Vertical Timeline */}
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-border hidden md:block" />
          <div className="space-y-10">
            {steps.map(({ n, icon: Icon, t, d, bullets }) => (
              <div key={n} className="relative flex gap-8 items-start">
                {/* Step bubble */}
                <div className="flex-shrink-0 relative z-10 grid h-16 w-16 place-items-center rounded-2xl shadow-lg" style={{ background: "var(--gradient-hero)" }}>
                  <Icon className="h-7 w-7 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-card border border-border rounded-full h-5 w-5 flex items-center justify-center">{n}</span>
                </div>
                {/* Content */}
                <div className="card-hover flex-1 rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-xl font-bold">{t}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                  <ul className="mt-4 space-y-2">
                    {bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link to="/apply" className="btn-lift inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
            Start my application <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">Soft pull only — no impact to your credit score.</p>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-secondary/40 border-t border-border py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">Common questions</h2>
          <div className="space-y-4">
            {faqs.map(f => (
              <div key={f.q} className="card-hover rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold text-sm">{f.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="btn-lift inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
              View all FAQ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
