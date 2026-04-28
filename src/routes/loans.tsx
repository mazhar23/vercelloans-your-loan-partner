import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Home, Car, GraduationCap, Briefcase, Heart } from "lucide-react";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Loan Products — VercelLoans" },
      {
        name: "description",
        content:
          "Personal loans, debt consolidation, home improvement, auto refinance and more — all with fixed rates.",
      },
    ],
  }),
  component: LoansPage,
});

const products = [
  {
    icon: CreditCard,
    t: "Debt Consolidation",
    d: "Combine high-interest debts into one fixed monthly payment.",
    apr: "from 5.99%",
  },
  {
    icon: Home,
    t: "Home Improvement",
    d: "Finance kitchens, bathrooms, roofing and more without tapping equity.",
    apr: "from 6.49%",
  },
  {
    icon: Car,
    t: "Auto Refinance",
    d: "Lower your monthly car payment by refinancing your existing auto loan.",
    apr: "from 5.99%",
  },
  {
    icon: GraduationCap,
    t: "Education Expenses",
    d: "Cover tuition, certifications or coding bootcamps.",
    apr: "from 7.49%",
  },
  {
    icon: Briefcase,
    t: "Small Business",
    d: "Working capital loans for sole proprietors and LLCs.",
    apr: "from 8.99%",
  },
  {
    icon: Heart,
    t: "Medical Expenses",
    d: "Predictable financing for elective and emergency procedures.",
    apr: "from 6.99%",
  },
];

function LoansPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Loans for every milestone</h1>
        <p className="mt-4 text-muted-foreground">
          Borrow $1,000 – $35,000 with terms from 24 to 84 months.
        </p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(({ icon: Icon, t, d, apr }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6">
            <div
              className="grid h-11 w-11 place-items-center rounded-xl"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-lg">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-accent">{apr} APR</span>
              <Link to="/apply" className="font-semibold hover:underline">
                Apply →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
