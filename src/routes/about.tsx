import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, Shield, Zap, Award, Building2, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VercelLoans" },
      { name: "description", content: "VercelLoans is on a mission to make borrowing simple, fast, and transparent for every American." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Shield, title: "Transparency first", desc: "No hidden fees, ever. Every rate, term, and fee is disclosed upfront before you sign anything." },
  { icon: Zap, title: "Speed without sacrifice", desc: "Fast decisions backed by responsible underwriting. Most applicants get a decision in under 60 seconds." },
  { icon: Users, title: "Customer obsession", desc: "Real, US-based support agents available 7 days a week. Average hold time: under 2 minutes." },
  { icon: Shield, title: "Privacy & security", desc: "256-bit encryption. SOC 2 Type II certified. We never sell your personal data to third parties." },
];

const timeline = [
  { year: "2021", event: "Founded in Chicago with a mission to democratize consumer credit." },
  { year: "2022", event: "Reached 50,000 funded loans and launched our mobile-first application." },
  { year: "2023", event: "Expanded to all 50 states and introduced same-day funding for qualified borrowers." },
  { year: "2024", event: "Surpassed $2 billion in total loans funded and 250,000 happy customers." },
  { year: "2025", event: "Launched AI-powered rate personalization and the VercelLoans Calculators suite." },
];

const team = [
  { name: "Alex Rivera", role: "Chief Executive Officer", bg: "from-blue-500 to-indigo-600" },
  { name: "Jordan Kim", role: "Chief Technology Officer", bg: "from-purple-500 to-pink-600" },
  { name: "Morgan Chen", role: "Chief Risk Officer", bg: "from-emerald-500 to-teal-600" },
];

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 opacity-20" style={{ background: "var(--gradient-subtle)" }} />
        <div className="container mx-auto px-4 py-20 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Building2 className="h-3.5 w-3.5" /> Founded 2021 · Chicago, IL
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            We believe borrowing should be{" "}
            <span style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              simple.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            VercelLoans is a team of fintech engineers and former bankers united by one belief:
            access to fair, transparent credit shouldn't require a Wall Street relationship.
            Since 2021, we've helped over 250,000 Americans take control of their financial futures.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "$2.4B+", l: "Total funded" },
            { v: "250,000+", l: "Customers served" },
            { v: "50", l: "States licensed" },
            { v: "4.8 / 5", l: "Avg. customer rating" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-bold tracking-tight" style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our core values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover flex gap-5 rounded-2xl border border-border bg-card p-6">
              <div className="flex-shrink-0 grid h-11 w-11 place-items-center rounded-xl" style={{ background: "var(--gradient-hero)" }}>
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/40 border-y border-border py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our journey</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {timeline.map((t) => (
                <div key={t.year} className="relative flex gap-6 items-start pl-14">
                  <div className="absolute left-0 grid h-12 w-12 place-items-center rounded-full border-2 border-border bg-card text-sm font-bold">
                    <span style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.year}</span>
                  </div>
                  <p className="pt-2 text-sm text-muted-foreground">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Leadership team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.name} className="card-hover rounded-2xl border border-border bg-card p-6 text-center">
              <div className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${m.bg} flex items-center justify-center text-white text-2xl font-bold`}>
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Licensing + CTA */}
      <section className="bg-secondary/40 border-t border-border py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Award className="mx-auto h-10 w-10 text-accent mb-4" />
          <h2 className="text-2xl font-bold">Licensing & Compliance</h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto">
            VercelLoans operates as a lending marketplace and connects borrowers with FDIC-insured partner banks.
            All loans are made by partner financial institutions licensed in all 50 states.
            We are committed to fair lending practices and comply with the Equal Credit Opportunity Act (ECOA) and all applicable federal and state regulations.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Link to="/apply" className="btn-lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
              Check My Rate <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-lift inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted">
              Contact Us
            </Link>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-accent" /> Proudly headquartered in Downtown Chicago, Illinois.
          </div>
        </div>
      </section>
    </div>
  );
}
