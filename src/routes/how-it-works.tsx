import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — VercelLoans" },
      { name: "description", content: "From application to funding in three simple steps." },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  const steps = [
    {
      n: "01",
      t: "Apply online",
      d: "Fill out our 2-minute application. We use a soft credit pull, so your score isn't impacted.",
    },
    {
      n: "02",
      t: "Compare offers",
      d: "Review personalized loan offers with full disclosure of APR, monthly payment, and total cost.",
    },
    {
      n: "03",
      t: "Sign & receive funds",
      d: "E-sign your agreement. Funds are deposited as soon as the next business day.",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How VercelLoans works</h1>
        <p className="mt-4 text-muted-foreground">
          A transparent, modern lending experience — start to finish.
        </p>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl bg-card border border-border p-8">
            <div
              className="text-5xl font-bold"
              style={{
                background: "var(--gradient-hero)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.n}
            </div>
            <h3 className="mt-4 font-semibold text-xl">{s.t}</h3>
            <p className="mt-2 text-muted-foreground text-sm">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/apply"
          className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          Start my application
        </Link>
      </div>
    </div>
  );
}
