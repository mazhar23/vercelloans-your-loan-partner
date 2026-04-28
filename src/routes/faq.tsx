import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — VercelLoans" },
      { name: "description", content: "Answers to common questions about VercelLoans personal loans." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  { q: "How much can I borrow?", a: "Personal loans range from $1,000 to $35,000 depending on your creditworthiness and state of residence." },
  { q: "Will checking my rate hurt my credit?", a: "No. We use a soft credit inquiry to show your pre-qualified offers." },
  { q: "How fast will I receive my funds?", a: "Most approved borrowers receive funds in their bank account within one business day after signing." },
  { q: "Are there any prepayment penalties?", a: "Never. You can pay off your loan early at any time at no extra cost." },
  { q: "What are the eligibility requirements?", a: "You must be at least 18, a U.S. citizen or permanent resident, with verifiable income and a valid bank account." },
  { q: "Is my information secure?", a: "Yes. We use 256-bit encryption and follow strict SOC 2 security practices. We never sell your data." },
];

function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Frequently asked questions</h1>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
