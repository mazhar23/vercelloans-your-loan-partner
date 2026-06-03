import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VercelLoans" },
      { name: "description", content: "Get in touch with the VercelLoans team. We're here 7 days a week." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:support@vercelloans.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inCls = "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-4 text-muted-foreground">
            Have a question about your loan, application, or account? Our team of real humans is standing by.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            {sent ? (
              <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
                <MessageCircle className="mx-auto h-10 w-10 text-accent mb-3" />
                <h3 className="font-semibold text-lg">Message sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within one business day.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm text-accent underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your name</label>
                    <input required className={inCls} placeholder="Jane Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email address</label>
                    <input required type="email" className={inCls} placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Subject</label>
                  <select required className={inCls} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                    <option value="">Select a topic…</option>
                    <option>Application Status</option>
                    <option>Payment Question</option>
                    <option>Rate & Terms</option>
                    <option>Account Issue</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                  <textarea required rows={5} className={inCls} placeholder="How can we help you today?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn-lift w-full rounded-full py-2.5 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact details</h2>
            <div className="grid gap-4">
              {[
                { icon: Phone, title: "Phone support", detail: "1-312-373-0471", sub: "Call us directly — no bots." },
                { icon: Mail, title: "Email", detail: "support@vercelloans.com", sub: "We respond within 1 business day." },
                { icon: MapPin, title: "Headquarters", detail: "Downtown Chicago, Illinois", sub: "USA" },
              ].map(({ icon: Icon, title, detail, sub }) => (
                <div key={title} className="card-hover flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-lg" style={{ background: "var(--gradient-hero)" }}>
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-sm text-foreground">{detail}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-accent" />
                <span className="font-semibold text-sm">Business Hours</span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { day: "Monday – Friday", hrs: "8:00 AM – 8:00 PM CT" },
                    { day: "Saturday", hrs: "9:00 AM – 5:00 PM CT" },
                    { day: "Sunday", hrs: "10:00 AM – 4:00 PM CT" },
                  ].map(r => (
                    <tr key={r.day} className="border-b border-border last:border-0">
                      <td className="py-2 text-muted-foreground">{r.day}</td>
                      <td className="py-2 text-right font-medium">{r.hrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl bg-secondary/50 border border-border p-5">
              <p className="text-sm font-semibold mb-3">Quick links</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Visit FAQ", to: "/faq" },
                  { label: "Check Rates", to: "/rates" },
                  { label: "Apply Now", to: "/apply" },
                ].map(l => (
                  <Link key={l.to} to={l.to} className="btn-lift inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium hover:bg-muted">
                    {l.label} <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
