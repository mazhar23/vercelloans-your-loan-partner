import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VercelLoans" },
      {
        name: "description",
        content: "VercelLoans is on a mission to make borrowing simple, fast, and transparent.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About VercelLoans</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        We're a team of fintech engineers and former bankers who believe borrowing should be simple.
        Since 2021 we've helped over 250,000 Americans access fair, transparent personal loans.
      </p>
      <h2 className="mt-12 text-2xl font-bold">Our values</h2>
      <ul className="mt-4 space-y-3 text-muted-foreground">
        <li>• Transparency first — no hidden fees, ever.</li>
        <li>• Speed without sacrifice — fast decisions backed by responsible underwriting.</li>
        <li>• Customer obsession — real humans on support, 7 days a week.</li>
        <li>• Privacy & security — your data is encrypted and never sold.</li>
      </ul>
      <h2 className="mt-12 text-2xl font-bold">Licensing</h2>
      <p className="mt-4 text-muted-foreground">
        VercelLoans operates as a marketplace and connects borrowers with FDIC-insured partner
        banks. Loans are made by partner financial institutions licensed in all 50 states.
      </p>
    </div>
  );
}
