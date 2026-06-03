import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Calculator, Home, Car, BarChart2, TrendingDown, ArrowRight } from "lucide-react";
import ElectricBorder from "../components/ElectricBorder";

export const Route = createFileRoute("/calculators")({
  head: () => ({
    meta: [
      { title: "Loan Calculators — VercelLoans" },
      { name: "description", content: "Free loan calculators: personal loan, mortgage, auto loan, APR comparison, and debt payoff tracker." },
    ],
  }),
  component: CalculatorsPage,
});

// ── helpers ──────────────────────────────────────────────────────────────────
function pmt(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}
const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtD = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (s: string) => parseFloat(s) || 0;

// ── shared input ──────────────────────────────────────────────────────────────
const inputCls = "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 border-b border-border last:border-0 ${accent ? "text-accent font-bold text-base" : ""}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={accent ? "" : "font-semibold"}>{value}</span>
    </div>
  );
}

// ── Tool 1: Personal Loan ──────────────────────────────────────────────────────
function PersonalLoanCalc() {
  const [amount, setAmount] = useState("10000");
  const [apr, setApr] = useState("9.99");
  const [months, setMonths] = useState("60");

  const result = useMemo(() => {
    const p = num(amount), r = num(apr) / 100 / 12, n = num(months);
    if (!p || !n) return null;
    const monthly = pmt(r, n, p);
    const total = monthly * n;
    return { monthly, total, interest: total - p };
  }, [amount, apr, months]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <Field label="Loan amount">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input className={inputCls + " pl-7"} type="number" value={amount} onChange={e => setAmount(e.target.value)} min="500" max="100000" />
          </div>
        </Field>
        <Field label="Annual interest rate (APR %)">
          <div className="relative">
            <input className={inputCls + " pr-8"} type="number" value={apr} onChange={e => setApr(e.target.value)} step="0.01" min="0" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
          </div>
        </Field>
        <Field label="Loan term">
          <select className={inputCls} value={months} onChange={e => setMonths(e.target.value)}>
            {[12, 24, 36, 48, 60, 72, 84].map(m => <option key={m} value={m}>{m} months ({m / 12} yr)</option>)}
          </select>
        </Field>
        {/* Visual bar */}
        {result && (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Principal</span>
              <span>Interest</span>
            </div>
            <div className="h-3 w-full rounded-full overflow-hidden bg-muted flex">
              <div className="h-full rounded-l-full transition-all" style={{ width: `${(num(amount) / result.total) * 100}%`, background: "var(--gradient-hero)" }} />
              <div className="h-full flex-1 bg-accent/40 rounded-r-full" />
            </div>
          </div>
        )}
      </div>
      <div className="rounded-2xl border border-border bg-secondary/40 p-6 space-y-1 self-start">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Estimate</p>
        {result ? (
          <>
            <ResultRow label="Monthly payment" value={fmtD(result.monthly)} accent />
            <ResultRow label="Total interest paid" value={fmtD(result.interest)} />
            <ResultRow label="Total repayment" value={fmtD(result.total)} />
          </>
        ) : <p className="text-sm text-muted-foreground">Enter values to see results.</p>}
      </div>
    </div>
  );
}

// ── Tool 2: Mortgage Calculator ───────────────────────────────────────────────
function MortgageCalc() {
  const [price, setPrice] = useState("350000");
  const [down, setDown] = useState("70000");
  const [rat, setRat] = useState("6.75");
  const [term, setTerm] = useState("30");

  const result = useMemo(() => {
    const p = num(price), d = num(down), r = num(rat) / 100 / 12, n = num(term) * 12;
    const loan = p - d;
    if (loan <= 0 || !n) return null;
    const monthly = pmt(r, n, loan);
    const pmi = loan / p > 0.8 ? (loan * 0.0058) / 12 : 0;
    const total = monthly * n;
    return { monthly, pmi, total, interest: total - loan, loan };
  }, [price, down, rat, term]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <Field label="Home purchase price">
          <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input className={inputCls + " pl-7"} type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
        </Field>
        <Field label="Down payment">
          <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input className={inputCls + " pl-7"} type="number" value={down} onChange={e => setDown(e.target.value)} />
          </div>
        </Field>
        <Field label="Interest rate (%)">
          <div className="relative">
            <input className={inputCls + " pr-8"} type="number" step="0.01" value={rat} onChange={e => setRat(e.target.value)} />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
          </div>
        </Field>
        <Field label="Loan term">
          <select className={inputCls} value={term} onChange={e => setTerm(e.target.value)}>
            <option value="30">30 years</option>
            <option value="20">20 years</option>
            <option value="15">15 years</option>
            <option value="10">10 years</option>
          </select>
        </Field>
      </div>
      <div className="rounded-2xl border border-border bg-secondary/40 p-6 space-y-1 self-start">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Estimate</p>
        {result ? (
          <>
            <ResultRow label="Loan amount" value={fmt(result.loan)} />
            <ResultRow label="Monthly P&I" value={fmtD(result.monthly)} accent />
            {result.pmi > 0 && <ResultRow label="Est. PMI (until 20% equity)" value={fmtD(result.pmi) + "/mo"} />}
            <ResultRow label="Total interest paid" value={fmt(result.interest)} />
            <ResultRow label="Total repayment" value={fmt(result.total)} />
          </>
        ) : <p className="text-sm text-muted-foreground">Enter values to see results.</p>}
      </div>
    </div>
  );
}

// ── Tool 3: Auto Loan Estimator ───────────────────────────────────────────────
function AutoLoanCalc() {
  const [vehiclePrice, setVehiclePrice] = useState("35000");
  const [tradeIn, setTradeIn] = useState("5000");
  const [downPayment, setDownPayment] = useState("3000");
  const [apr, setApr] = useState("7.5");
  const [months, setMonths] = useState("60");

  const result = useMemo(() => {
    const loan = num(vehiclePrice) - num(tradeIn) - num(downPayment);
    const r = num(apr) / 100 / 12, n = num(months);
    if (loan <= 0 || !n) return null;
    const monthly = pmt(r, n, loan);
    const total = monthly * n;
    return { loan, monthly, total, interest: total - loan };
  }, [vehiclePrice, tradeIn, downPayment, apr, months]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        {[
          { label: "Vehicle price", val: vehiclePrice, set: setVehiclePrice },
          { label: "Trade-in value", val: tradeIn, set: setTradeIn },
          { label: "Down payment", val: downPayment, set: setDownPayment },
        ].map(({ label, val, set }) => (
          <Field key={label} label={label}>
            <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <input className={inputCls + " pl-7"} type="number" value={val} onChange={e => set(e.target.value)} />
            </div>
          </Field>
        ))}
        <Field label="APR (%)">
          <div className="relative">
            <input className={inputCls + " pr-8"} type="number" step="0.01" value={apr} onChange={e => setApr(e.target.value)} />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
          </div>
        </Field>
        <Field label="Loan term">
          <select className={inputCls} value={months} onChange={e => setMonths(e.target.value)}>
            {[24, 36, 48, 60, 72, 84].map(m => <option key={m} value={m}>{m} months</option>)}
          </select>
        </Field>
      </div>
      <div className="rounded-2xl border border-border bg-secondary/40 p-6 space-y-1 self-start">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Estimate</p>
        {result ? (
          <>
            <ResultRow label="Net financed amount" value={fmt(result.loan)} />
            <ResultRow label="Monthly payment" value={fmtD(result.monthly)} accent />
            <ResultRow label="Total interest" value={fmtD(result.interest)} />
            <ResultRow label="Total cost" value={fmt(result.total)} />
          </>
        ) : <p className="text-sm text-muted-foreground">Enter valid values to see results.</p>}
      </div>
    </div>
  );
}

// ── Tool 4: APR Comparison Tool ───────────────────────────────────────────────
type Offer = { amount: string; rate: string; months: string };
function AprCompare() {
  const [offers, setOffers] = useState<Offer[]>([
    { amount: "10000", rate: "7.99", months: "60" },
    { amount: "10000", rate: "11.49", months: "60" },
    { amount: "10000", rate: "14.99", months: "48" },
  ]);

  const update = (i: number, key: keyof Offer, val: string) => {
    setOffers(prev => prev.map((o, idx) => idx === i ? { ...o, [key]: val } : o));
  };

  const results = offers.map(o => {
    const p = num(o.amount), r = num(o.rate) / 100 / 12, n = num(o.months);
    if (!p || !n) return null;
    const monthly = pmt(r, n, p);
    return { monthly, total: monthly * n };
  });

  const bestIdx = results.reduce<number | null>((best, r, i) => {
    if (!r) return best;
    if (best === null || !results[best] || r.total < (results[best]?.total ?? Infinity)) return i;
    return best;
  }, null);

  const colors = ["text-blue-600", "text-purple-600", "text-emerald-600"];
  const labels = ["Offer A", "Offer B", "Offer C"];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {offers.map((o, i) => (
          <div key={i} className={`rounded-2xl border p-5 space-y-4 ${bestIdx === i ? "border-accent ring-2 ring-accent/30" : "border-border bg-card"}`}>
            <p className={`text-sm font-bold ${colors[i]}`}>{labels[i]} {bestIdx === i ? "✓ Best" : ""}</p>
            <Field label="Loan amount">
              <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                <input className={inputCls + " pl-7 text-xs"} type="number" value={o.amount} onChange={e => update(i, "amount", e.target.value)} />
              </div>
            </Field>
            <Field label="APR (%)">
              <div className="relative">
                <input className={inputCls + " pr-7 text-xs"} type="number" step="0.01" value={o.rate} onChange={e => update(i, "rate", e.target.value)} />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
              </div>
            </Field>
            <Field label="Term (months)">
              <select className={inputCls + " text-xs"} value={o.months} onChange={e => update(i, "months", e.target.value)}>
                {[12, 24, 36, 48, 60, 72, 84].map(m => <option key={m} value={m}>{m} mo</option>)}
              </select>
            </Field>
            {results[i] && (
              <div className="pt-2 border-t border-border space-y-1">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Monthly</span><span className="font-bold">{fmtD(results[i]!.monthly)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Total cost</span><span className="font-semibold">{fmtD(results[i]!.total)}</span></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {bestIdx !== null && results[bestIdx] && (
        <div className="rounded-xl bg-accent/10 border border-accent/30 px-5 py-3 text-sm">
          <strong>{labels[bestIdx]}</strong> saves you the most — total cost of <strong>{fmtD(results[bestIdx]!.total)}</strong>.
        </div>
      )}
    </div>
  );
}

// ── Tool 5: Debt Payoff Tracker ───────────────────────────────────────────────
function DebtPayoff() {
  const [balance, setBalance] = useState("8500");
  const [apr, setApr] = useState("18.99");
  const [minPayment, setMinPayment] = useState("170");
  const [budget, setBudget] = useState("350");

  const calc = (payment: number, bal: number, monthlyRate: number) => {
    if (payment <= 0 || bal <= 0) return null;
    let remaining = bal, months = 0, interest = 0;
    while (remaining > 0 && months < 1200) {
      const i = remaining * monthlyRate;
      interest += i;
      remaining = remaining + i - payment;
      months++;
      if (remaining < 0) remaining = 0;
    }
    return { months, interest, years: (months / 12).toFixed(1) };
  };

  const result = useMemo(() => {
    const r = num(apr) / 100 / 12, b = num(balance);
    const minR = calc(num(minPayment), b, r);
    const budR = calc(num(budget), b, r);
    return { min: minR, bud: budR };
  }, [balance, apr, minPayment, budget]);

  const saving = result.min && result.bud ? result.min.interest - result.bud.interest : null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <Field label="Current balance">
          <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input className={inputCls + " pl-7"} type="number" value={balance} onChange={e => setBalance(e.target.value)} />
          </div>
        </Field>
        <Field label="Annual interest rate (APR %)">
          <div className="relative">
            <input className={inputCls + " pr-8"} type="number" step="0.01" value={apr} onChange={e => setApr(e.target.value)} />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
          </div>
        </Field>
        <Field label="Minimum monthly payment">
          <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input className={inputCls + " pl-7"} type="number" value={minPayment} onChange={e => setMinPayment(e.target.value)} />
          </div>
        </Field>
        <Field label="Your monthly budget">
          <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input className={inputCls + " pl-7"} type="number" value={budget} onChange={e => setBudget(e.target.value)} />
          </div>
        </Field>
      </div>
      <div className="space-y-4 self-start">
        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Minimum payment only</p>
          {result.min ? (
            <>
              <ResultRow label="Payoff time" value={`${result.min.months} months (${result.min.years} yrs)`} />
              <ResultRow label="Total interest" value={fmtD(result.min.interest)} />
            </>
          ) : <p className="text-xs text-muted-foreground">Enter values above.</p>}
        </div>
        <div className="rounded-2xl border border-accent/40 bg-accent/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">With your budget</p>
          {result.bud ? (
            <>
              <ResultRow label="Payoff time" value={`${result.bud.months} months (${result.bud.years} yrs)`} accent />
              <ResultRow label="Total interest" value={fmtD(result.bud.interest)} />
              {saving !== null && saving > 0 && (
                <div className="mt-3 text-xs text-accent font-semibold">
                  🎉 You save {fmtD(saving)} in interest!
                </div>
              )}
            </>
          ) : <p className="text-xs text-muted-foreground">Enter values above.</p>}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const tools = [
  { id: "personal", label: "Personal Loan", icon: Calculator, desc: "Monthly payment & total cost", component: PersonalLoanCalc },
  { id: "mortgage", label: "Mortgage", icon: Home, desc: "P&I, PMI, and amortization", component: MortgageCalc },
  { id: "auto", label: "Auto Loan", icon: Car, desc: "Net balance & monthly payment", component: AutoLoanCalc },
  { id: "compare", label: "APR Comparison", icon: BarChart2, desc: "Find the cheapest offer", component: AprCompare },
  { id: "debt", label: "Debt Payoff", icon: TrendingDown, desc: "Minimum vs. budget payoff", component: DebtPayoff },
];

function CalculatorsPage() {
  const [active, setActive] = useState("personal");
  const ActiveTool = tools.find(t => t.id === active)!.component;

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          <Calculator className="h-3.5 w-3.5" /> Free Financial Tools
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Loan Calculators</h1>
        <p className="mt-4 text-muted-foreground">
          Estimate payments, compare offers, and plan your payoff — all in real time. No sign-up required.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tools.map(t => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all border ${isActive ? "text-primary-foreground border-transparent shadow-md" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              style={isActive ? { background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" } : {}}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{tools.find(t => t.id === active)!.label} Calculator</h2>
          <p className="text-sm text-muted-foreground mt-1">{tools.find(t => t.id === active)!.desc}</p>
        </div>
        <ActiveTool />
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-3xl p-8 md:p-12 text-center text-primary-foreground" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
        <h2 className="text-2xl md:text-3xl font-bold">Ready to apply for your loan?</h2>
        <p className="mt-2 opacity-90 text-sm max-w-md mx-auto">Check your rate in 60 seconds — soft pull only, no impact to your credit score.</p>
        <ElectricBorder
          color="#7df9ff"
          speed={1.2}
          chaos={0.08}
          borderRadius={9999}
          className="mt-6 btn-lift"
          style={{ display: "inline-flex" }}
        >
          <Link to="/apply" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90 transition">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
        </ElectricBorder>
      </div>
    </div>
  );
}
