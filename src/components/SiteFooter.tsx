import { Link } from "@tanstack/react-router";
import { Wallet, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40 mt-20">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-hero)" }}>
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </span>
            VercelLoans
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Fast, transparent personal loans for U.S. residents. Funds delivered straight to your bank account.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Products</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/loans" className="hover:text-foreground">Personal Loans</Link></li>
            <li><Link to="/loans" className="hover:text-foreground">Debt Consolidation</Link></li>
            <li><Link to="/loans" className="hover:text-foreground">Home Improvement</Link></li>
            <li><Link to="/rates" className="hover:text-foreground">Rates & Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/how-it-works" className="hover:text-foreground">How It Works</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1-312-373-0471</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Downtown Chicago, Illinois., USA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-3 justify-between">
          <p>© {new Date().getFullYear()} VercelLoans. All rights reserved.</p>
          <p>Demo site for illustration only. Not an actual lender. APRs and terms shown are examples.</p>
        </div>
      </div>
    </footer>
  );
}
