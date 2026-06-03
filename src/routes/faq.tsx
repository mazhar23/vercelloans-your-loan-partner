import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { ArrowRight } from "lucide-react";
import ElectricBorder from "../components/ElectricBorder";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — VercelLoans" },
      { name: "description", content: "Answers to common questions about VercelLoans personal loans — applications, payments, credit impact, and more." },
    ],
  }),
  component: FaqPage,
});

const categories = [
  {
    label: "Applying",
    faqs: [
      { q: "How much can I borrow?", a: "Personal loans range from $1,000 to $35,000 depending on your creditworthiness, debt-to-income ratio, and state of residence." },
      { q: "Will checking my rate hurt my credit?", a: "No. We use a soft credit inquiry to show your pre-qualified offers. A hard inquiry is only made once you formally accept an offer and sign your loan agreement." },
      { q: "What are the eligibility requirements?", a: "You must be at least 18 years old, a U.S. citizen or permanent resident, have verifiable income, and hold a valid U.S. bank account." },
      { q: "Can I apply with a co-borrower or co-signer?", a: "Currently we do not support joint applications. Each application must be submitted individually. We're working on adding co-borrower support in 2025." },
    ],
  },
  {
    label: "Rates & Terms",
    faqs: [
      { q: "What APR rates do you offer?", a: "Our APRs range from 5.99% to 29.99%, based on your credit profile, income, and selected loan term. Rates are fixed for the life of your loan." },
      { q: "Are there any prepayment penalties?", a: "Never. You can pay off your loan early at any time with zero extra cost or fees. Early payoff can save you money on interest." },
      { q: "Can I refinance my existing VercelLoans loan?", a: "Yes. If your credit has improved or market rates have dropped, you may qualify for a refinance. Contact our support team to explore your options." },
      { q: "What fees do you charge?", a: "We charge an origination fee of 1%–6% of the loan amount, depending on your credit profile. There are no application fees, prepayment penalties, or annual fees." },
    ],
  },
  {
    label: "Funding & Repayment",
    faqs: [
      { q: "How fast will I receive my funds?", a: "Most approved borrowers receive funds via ACH direct deposit within one business day after signing their loan agreement." },
      { q: "What happens if I miss a payment?", a: "We strongly encourage you to contact our support team before missing a payment. We offer hardship programs and payment deferrals for eligible borrowers. Late payments may be reported to credit bureaus." },
      { q: "How do I make payments?", a: "Payments are made via automatic ACH debit from your bank account on the same date each month. You can also make one-time payments through your online account portal." },
      { q: "Will my credit score change after I take out a loan?", a: "A hard inquiry at the time of signing may cause a small, temporary dip in your score. Making on-time payments typically has a positive long-term effect on your credit profile." },
    ],
  },
  {
    label: "Security & Privacy",
    faqs: [
      { q: "Is my information secure?", a: "Yes. We use 256-bit TLS encryption on all data transmissions and store sensitive data with AES-256 encryption. We are SOC 2 Type II certified." },
      { q: "Do you sell my personal information?", a: "Never. Your information is shared only with our lending partners as part of the loan origination process and is never sold to marketers or data brokers." },
      { q: "Are there any tax implications for a personal loan?", a: "Personal loan proceeds are generally not considered taxable income. However, if any portion of your loan is forgiven, that amount may be taxable. Consult a tax advisor for your specific situation." },
    ],
  },
];

function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h1>
        <p className="mt-4 text-muted-foreground">Everything you need to know about VercelLoans. Can't find your answer? <Link to="/contact" className="text-accent underline">Contact us.</Link></p>
      </div>

      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat.label}>
            <h2 className="text-lg font-bold mb-3" style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{cat.label}</h2>
            <Accordion type="single" collapsible>
              {cat.faqs.map((f, i) => (
                <AccordionItem key={i} value={`${cat.label}-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl p-8 text-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-xl font-bold">Still have questions?</h2>
        <p className="mt-2 text-sm opacity-90">Our support team is available 7 days a week.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link to="/contact" className="btn-lift inline-flex items-center gap-1 rounded-full bg-background px-5 py-2 text-sm font-semibold text-foreground">
            Contact Us <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <ElectricBorder
            color="#7df9ff"
            speed={1.0}
            chaos={0.1}
            borderRadius={9999}
            className="btn-lift"
            style={{ display: "inline-flex" }}
          >
            <Link to="/apply" className="inline-flex items-center gap-1 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </ElectricBorder>
        </div>
      </div>
    </div>
  );
}
