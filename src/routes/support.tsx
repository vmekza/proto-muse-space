import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MessageSquare, PhoneCall } from "lucide-react";
import { AppShell, Card, Eyebrow } from "@/components/AppShell";
import { booking, journey, optionById, useJourney } from "@/lib/journey";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Talk to a person — Finnair Disruption Recovery" },
      {
        name: "description",
        content:
          "Escalate to a Finnair agent who already has your disruption context, without repeating your story.",
      },
      { property: "og:title", content: "Talk to a person — Finnair Disruption Recovery" },
      {
        property: "og:description",
        content: "Human escalation with your booking and recovery state already attached.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const state = useJourney();
  const chosen = optionById(state.choice);

  const context = [
    `Booking ${booking.reference} · ${booking.flight} ${booking.from.code}–${booking.to.code}`,
    `${booking.status}: ${booking.reason}`,
    chosen
      ? `Accepted ${chosen.route} at ${chosen.depart}`
      : state.refundRequested
        ? "Refund requested, no new flight"
        : "No option accepted yet",
    "18 EUR meal voucher issued · 250 EUR compensation eligible",
  ];

  return (
    <AppShell>
      <Eyebrow>Human escalation</Eyebrow>
      <h1 className="serif mt-3 text-3xl leading-tight">You will not repeat yourself.</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Everything below is sent with your request, so an agent starts where the app stopped.
      </p>

      <Card className="mt-6">
        <Eyebrow>Shared with the agent</Eyebrow>
        <ul className="mt-3 space-y-2">
          {context.map((line) => (
            <li key={line} className="flex items-start gap-2 text-xs leading-relaxed">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {line}
            </li>
          ))}
        </ul>
      </Card>

      <button
        type="button"
        onClick={() => journey.requestSupport()}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
      >
        {state.supportRequested ? (
          <>
            <Check size={15} strokeWidth={3} /> Agent joining in ~4 min
          </>
        ) : (
          <>
            <MessageSquare size={16} /> Start a chat with context
          </>
        )}
      </button>

      <a
        href="tel:+3589818081"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-brand px-5 py-3 text-sm font-semibold text-brand"
      >
        <PhoneCall size={16} /> Call instead
      </a>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        Calls are prioritised for passengers whose situation cannot be resolved in the app.
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
