import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeEuro, Check, UtensilsCrossed, BedDouble } from "lucide-react";
import { AppShell, Card, Eyebrow } from "@/components/AppShell";
import { booking, journey, useJourney } from "@/lib/journey";

export const Route = createFileRoute("/rights")({
  head: () => ({
    meta: [
      { title: "Your rights on this booking — Finnair Disruption Recovery" },
      {
        name: "description",
        content:
          "EU261 care and compensation explained against your actual booking, not a generic policy page.",
      },
      { property: "og:title", content: "Your rights on this booking" },
      {
        property: "og:description",
        content: "Contextual EU261 entitlements for a cancelled Helsinki to London flight.",
      },
    ],
  }),
  component: RightsPage,
});

const entitlements = [
  {
    icon: BadgeEuro,
    title: "250 EUR compensation",
    body: "Applies to cancellations under 1,500 km notified less than 14 days before departure. Your flight qualifies.",
    active: true,
  },
  {
    icon: UtensilsCrossed,
    title: "Meals and refreshments",
    body: "An 18 EUR voucher is already on your booking because your wait exceeds two hours.",
    active: true,
  },
  {
    icon: BedDouble,
    title: "Hotel and transfer",
    body: "Only applies if you choose the morning flight tomorrow. Selecting it adds the hotel automatically.",
    active: false,
  },
];

function RightsPage() {
  const state = useJourney();

  return (
    <AppShell>
      <Eyebrow>Contextual EU261</Eyebrow>
      <h1 className="serif mt-3 text-3xl leading-tight">What you are entitled to.</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Based on booking {booking.reference}: a cancellation with a {booking.delayHours}-hour delay
        to your arrival.
      </p>

      <div className="mt-6 space-y-3">
        {entitlements.map(({ icon: Icon, title, body, active }) => (
          <Card key={title} className={active ? "" : "opacity-60"}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-brand">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                  {active ? "Applies to you" : "Conditional"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <p className="text-sm font-semibold">Claim your 250 EUR</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          We already have your flight, booking and delay details. No form to fill in.
        </p>
        <button
          type="button"
          onClick={() => journey.requestSupport()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
        >
          {state.supportRequested ? (
            <>
              <Check size={15} strokeWidth={3} /> Claim submitted
            </>
          ) : (
            "Submit claim"
          )}
        </button>
      </Card>

      <p className="mt-6 border-l border-hairline pl-4 text-[11px] leading-relaxed text-muted-foreground">
        Independent concept based on public information. Not affiliated with or endorsed by Finnair.
      </p>

      <Link
        to="/"
        className="mt-6 block text-center text-xs font-semibold text-brand underline underline-offset-4"
      >
        Back to recovery overview
      </Link>
    </AppShell>
  );
}
