import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CircleAlert, Headphones, Plane, Scale } from "lucide-react";
import { booking } from "@/lib/journey";

const tabs = [
  { to: "/", label: "Recovery", icon: CircleAlert },
  { to: "/options", label: "Flights", icon: Plane },
  { to: "/rights", label: "Rights", icon: Scale },
  { to: "/support", label: "Support", icon: Headphones },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas px-0 py-0 sm:flex sm:items-center sm:justify-center sm:py-10">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-surface shadow-frame sm:rounded-[2.4rem] sm:border sm:border-brand/15">
        <header className="flex items-center justify-between border-b border-hairline px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
          <span className="serif text-base normal-case tracking-normal">Finnair</span>
          <span>{booking.flight}</span>
        </header>

        <main className="min-h-[620px] px-6 pt-6 pb-28">{children}</main>

        <nav className="sticky bottom-0 grid grid-cols-4 border-t border-hairline bg-surface">
          {tabs.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-brand" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </p>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-hairline bg-card p-4 ${className}`}>{children}</div>
  );
}
