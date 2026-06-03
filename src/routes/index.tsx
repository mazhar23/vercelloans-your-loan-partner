import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Zap, BadgeDollarSign, Clock, Star, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import heroImg from "../assets/hero.jpg";
import coupleLoanImg from "../assets/couple-loan.png";
import ElectricBorder from "../components/ElectricBorder";
import MagicBento from "../components/MagicBento";
import TextType from "../components/TextType";

import androidAppImg from "../assets/android-app-on-google-play-logo.png";
import iosAppImg from "../assets/download-on-the-app-store-badge-svg-pdf-ai-eps.jpg";
import appMockupImg from "../assets/Gemini_Generated_Image_dz7zvxdz7zvxdz7z (1).png";
import untitledImg from "../assets/Untitled.png";

const awardsData = [
  { source: "Alternate Finance", title: "Top Alternate Finance Companies", subtitle: "Industry Leader", score: "" },
  { source: "Bankrate", title: "Excellent", subtitle: "Bankrate Score", score: "4.5" },
  { source: "Money", title: "Top Picks 2026", subtitle: "Personal Loan Companies", score: "" },
];
// Duplicate for seamless infinite scrolling
const tickerItems = [...awardsData, ...awardsData, ...awardsData, ...awardsData];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VercelLoans — Fast Personal Loans up to $35,000" },
      { name: "description", content: "Get a personal loan in minutes. Fixed rates from 5.99% APR. Funds in your bank as soon as the next business day." },
      { property: "og:title", content: "VercelLoans — Fast Personal Loans" },
      { property: "og:description", content: "Apply online in minutes. Funds as soon as next business day." },
    ],
  }),
  component: Home,
});

// Scroll-reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.classList.add("reveal");
      child.style.transitionDelay = `${i * 80}ms`;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const kids = Array.from((entry.target as HTMLElement).children) as HTMLElement[];
            kids.forEach((k) => k.classList.add("revealed"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Home() {
  const statsRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Animated background glow */}
        <div
          className="absolute inset-0 -z-10 opacity-30 animate-breathe"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div className="container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-2 w-2 rounded-full bg-accent" /> Trusted by 250,000+ Americans
            </span>
            <h1
              className="animate-fade-up mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ animationDelay: "150ms" }}
            >
              Personal loans,{" "}
              <span style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <TextType
                  as="span"
                  text={["delivered fast.", "made simple.", "built on trust.", "designed for you."]}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-type-hero-cursor"
                  loop={true}
                  startOnVisible={true}
                  variableSpeed={{ min: 40, max: 100 }}
                />
              </span>
            </h1>
            <p
              className="animate-fade-up mt-5 text-lg text-muted-foreground max-w-xl"
              style={{ animationDelay: "300ms" }}
            >
              Borrow $1,000 to $35,000 with fixed rates from 5.99% APR. Check your rate in 60 seconds — it won't affect your credit score.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "450ms" }}
            >
              <Link
                to="/apply"
                className="btn-lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
                style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
              >
                Check My Rate <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="btn-lift inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted"
              >
                How it works
              </Link>
            </div>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground"
              style={{ animationDelay: "600ms" }}
            >
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> No hidden fees</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Soft credit check</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Funds in 1 business day</span>
            </div>
          </div>
          <div className="relative animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-6 -z-10 rounded-3xl animate-breathe" style={{ background: "var(--gradient-hero)", filter: "blur(60px)", opacity: 0.35 }} />
            <img
              src={heroImg}
              alt="VercelLoans premium financial services"
              width={1536}
              height={1024}
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* AWARDS TICKER */}
      <div className="ticker-strip py-4">
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <div key={i} className="ticker-item">
              <div>
                <div className="ticker-item__badge">{item.source}</div>
                <div className="ticker-item__title">{item.title}</div>
                <div className="ticker-item__subtitle">{item.subtitle}</div>
              </div>
              {item.score && (
                <div className="ticker-item__score">
                  <Star className="h-4 w-4 fill-current text-accent" />
                  {item.score}
                </div>
              )}
              {i < tickerItems.length - 1 && <div className="ticker-item__divider mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div ref={statsRef} className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "$2.4B+", l: "Funded to date" },
            { v: "250k+", l: "Happy customers" },
            { v: "5.99%", l: "Starting APR" },
            { v: "4.8/5", l: "Customer rating" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-bold tracking-tight">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHT IMAGE */}
      <section className="container mx-auto px-4 pt-10">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border">
          <img
            src={coupleLoanImg}
            alt="Happy couple consulting with a loan officer"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why borrowers choose VercelLoans</h2>
          <p className="mt-4 text-muted-foreground">A modern lending experience built for transparency, speed, and trust.</p>
        </div>
        <div ref={featuresRef} className="mt-8">
          <MagicBento
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="#00be8f"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Three simple steps</h2>
            <p className="mt-4 text-muted-foreground">From application to funding in as little as 24 hours.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Check your rate", d: "Tell us a bit about yourself. Soft pull only — no impact to your credit." },
              { n: "02", t: "Pick your offer", d: "Choose from personalized loan offers with clear terms." },
              { n: "03", t: "Get funded", d: "Sign electronically and receive funds as soon as the next business day." },
            ].map((s) => (
              <div key={s.n} className="card-hover rounded-2xl bg-card border border-border p-8">
                <div className="text-5xl font-bold" style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.n}</div>
                <h3 className="mt-4 font-semibold text-xl">{s.t}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <ElectricBorder
              color="#00be8f"
              speed={1.0}
              chaos={0.1}
              borderRadius={9999}
              className="btn-lift"
              style={{ display: "inline-flex" }}
            >
              <Link to="/apply" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </ElectricBorder>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by borrowers nationwide</h2>
        </div>
        <div ref={testimonialsRef} className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "Sarah M.", l: "Austin, TX", q: "Process was unbelievably smooth. I had funds in my account the next morning." },
            { n: "James R.", l: "Columbus, OH", q: "Used my loan to consolidate credit card debt. Saved hundreds in interest already." },
            { n: "Priya K.", l: "Seattle, WA", q: "Transparent rates, no surprises. Customer support actually picked up the phone!" },
          ].map((t) => (
            <div key={t.n} className="card-hover rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm">"{t.q}"</p>
              <div className="mt-4 text-sm font-semibold">{t.n}</div>
              <div className="text-xs text-muted-foreground">{t.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="app-download-section border-t border-border bg-background py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative flex justify-center">
            <div className="absolute inset-0 -z-10 rounded-3xl animate-breathe" style={{ background: "var(--gradient-hero)", filter: "blur(60px)", opacity: 0.15 }} />
            <img src={appMockupImg} alt="VercelLoans App" className="w-full max-w-sm h-auto rounded-3xl shadow-2xl object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Do it all in the VercelLoans App</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Manage your loan, check your rate, make payments, and monitor your credit score—all from the palm of your hand. Download the app today.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#" className="inline-block app-badge">
                <img src={iosAppImg} alt="Download on the App Store" className="h-12 w-auto rounded-lg object-contain" />
              </a>
              <a href="#" className="inline-block app-badge">
                <img src={androidAppImg} alt="Get it on Google Play" className="h-12 w-auto rounded-lg object-contain bg-black px-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER IMAGE BANNER */}
      <section className="bg-background pb-12 pt-0">
        <div className="container mx-auto px-4">
           <img src={untitledImg} alt="Additional resources" className="w-full h-auto rounded-2xl shadow-xl border border-border" />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl p-10 md:p-16 text-center text-primary-foreground" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
          <h2 className="text-3xl md:text-4xl font-bold">Ready to see your rate?</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">Checking takes 60 seconds and won't affect your credit score.</p>
          <ElectricBorder
            color="#7df9ff"
            speed={1.2}
            chaos={0.08}
            borderRadius={9999}
            className="btn-lift mt-7"
            style={{ display: "inline-flex" }}
          >
            <Link to="/apply" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90">
              Apply now <ArrowRight className="h-4 w-4" />
            </Link>
          </ElectricBorder>
        </div>
      </section>
    </>
  );
}
