import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/loans", label: "Loans" },
  { to: "/rates", label: "Rates" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-hero)" }}>
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="tracking-tight">VercelLoans</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
            style={{ background: "var(--gradient-hero)" }}
          >
            Apply Now
          </Link>
        </div>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full py-2 text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
