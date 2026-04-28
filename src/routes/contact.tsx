import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VercelLoans" },
      { name: "description", content: "Get in touch with the VercelLoans team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Contact us</h1>
      <p className="mt-4 text-center text-muted-foreground">We're here to help, 7 days a week.</p>
      <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
        {[
          { icon: Phone, t: "Phone", v: "1-312-373-0471" },
          { icon: MapPin, t: "Headquarters", v: "Downtown Chicago, Illinois., USA" },
        ].map(({ icon: Icon, t, v }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6 text-center">
            <div
              className="mx-auto grid h-11 w-11 place-items-center rounded-xl"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
