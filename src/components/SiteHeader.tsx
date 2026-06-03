import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import ElectricBorder from "./ElectricBorder";
import StarBorder from "./StarBorder";

const nav = [
  { to: "/", label: "Home" },
  { to: "/loans", label: "Loans" },
  { to: "/rates", label: "Rates" },
  { to: "/calculators", label: "Calculators" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg transition-all duration-300 ${scrolled ? "shadow-md py-0" : "shadow-none py-0"}`}
    >
      <div className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${scrolled ? "h-13" : "h-16"}`}>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg group">
          <span
            className="grid h-9 w-9 place-items-center rounded-lg transition-all duration-300 group-hover:scale-105"
            style={{ background: "var(--gradient-hero)", boxShadow: scrolled ? "none" : "var(--shadow-glow)" }}
          >
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </span>
          <StarBorder
            as="span"
            color="#00be8f"
            speed="5s"
            thickness={1}
            className="text-foreground"
            style={{
              "--star-border-bg": scrolled ? "var(--background)" : "var(--card)",
              "--star-border-outline": "var(--border)",
              "--star-border-padding": "4px 10px",
              borderRadius: "8px",
            } as React.CSSProperties}
          >
            <span className="tracking-tight">VercelLoans</span>
          </StarBorder>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 py-1 group"
              activeProps={{ className: "text-foreground font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              {/* animated underline */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full" style={{ background: "var(--gradient-hero)" }} />
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <ElectricBorder
            color="#00be8f"
            speed={1.0}
            chaos={0.1}
            borderRadius={9999}
            className="btn-lift"
            style={{ display: "inline-flex" }}
          >
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md"
              style={{ background: "var(--gradient-hero)" }}
            >
              Apply Now
            </Link>
          </ElectricBorder>
        </div>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {/* Mobile menu — slide-down animation */}
      <div
        className={`lg:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <ElectricBorder
            color="#00be8f"
            speed={1.0}
            chaos={0.1}
            borderRadius={9999}
            className="btn-lift mt-2"
            style={{ display: "block" }}
          >
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="text-center rounded-full py-2.5 text-sm font-semibold text-primary-foreground block"
              style={{ background: "var(--gradient-hero)" }}
            >
              Apply Now
            </Link>
          </ElectricBorder>
        </div>
      </div>
    </header>
  );
}
