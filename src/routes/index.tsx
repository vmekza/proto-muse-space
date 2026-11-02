import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CircleAlert, Headphones, Plane, Scale } from "lucide-react";
import { AppShell, Card, Eyebrow } from "@/components/AppShell";
import { booking, handled, journey, optionById, useJourney } from "@/lib/journey";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Recovery — Finnair Disruption Recovery" },
      {
        name: "description",
        content:
          "See what has already been handled after a cancelled flight and what you still need to decide.",
      },
      { property: "og:title", content: "Flight Recovery — Finnair Disruption Recovery" },
      {
        property: "og:description",
        content: "A self-service recovery concept for the moment a journey goes wrong.",
      },
    ],
  }),
  component: RecoveryOverview,
});

function RecoveryOverview() {
  const state = useJourney();
  const chosen = optionById(state.choice);

  return (
    <AppShell>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-alert">
        <CircleAlert size={15} />
        Flight {booking.status.toLowerCase()}
      </div>

      <h1 className="serif mt-4 text-3xl leading-tight text-foreground">
        We are getting you to {booking.to.city}.
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {booking.flight} · {booking.reason}. Booking {booking.reference}.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <div>
          <p className="text-3xl font-semibold">{booking.from.code}</p>
          <p className="mt-1 text-xs text-muted-foreground">{booking.from.city}</p>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <div className="h-px flex-1 bg-hairline" />
          <Plane size={18} className="text-brand" />
          <div className="h-px flex-1 bg-hairline" />
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold">{booking.to.code}</p>
          <p className="mt-1 text-xs text-muted-foreground">{booking.to.city}</p>
        </div>
      </div>

      <div className="mt-8">
        <Eyebrow>What we have already done</Eyebrow>
        <div className="mt-3 space-y-2">
          {handled.map((item) => (
            <Card key={item} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Check size={12} strokeWidth={3} />
              </span>
              <p className="text-sm leading-snug">{item}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Eyebrow>Your decision</Eyebrow>

        {state.refundRequested ? (
          <Card className="mt-3">
            <p className="text-sm font-semibold">Refund requested</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Your seat has been released and the full fare is being returned to the original
              payment method.
            </p>
            <button
              type="button"
              onClick={() => journey.reset()}
              className="mt-4 text-xs font-semibold text-brand underline underline-offset-4"
            >
              Change my mind
            </button>
          </Card>
        ) : (
          <Card className="mt-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  {chosen ? "Confirmed departure" : "Proposed departure"}
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {(chosen ?? optionById("ay1341"))?.depart} →{" "}
                  {(chosen ?? optionById("ay1341"))?.arrive}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {(chosen ?? optionById("ay1341"))?.date}
              </p>
            </div>

            {chosen ? (
              <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-brand">
                Accepted. Your boarding pass updates automatically 3 hours before departure.
              </p>
            ) : (
              <button
                type="button"
                onClick={() => journey.accept("ay1341")}
                className="mt-4 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Accept this flight
              </button>
            )}

            <div className="mt-3 flex justify-between text-xs font-semibold text-brand">
              <Link to="/options" className="underline underline-offset-4">
                See other options
              </Link>
              <button
                type="button"
                onClick={() => journey.requestRefund()}
                className="underline underline-offset-4"
              >
                Request refund
              </button>
            </div>
          </Card>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <RowLink to="/rights" title="Your rights" sub="See what applies to this booking">
          <Scale size={17} />
        </RowLink>
        <RowLink to="/support" title="Still need help?" sub="Your situation is shared with support">
          <Headphones size={17} />
        </RowLink>
      </div>
    </AppShell>
  );
}

function RowLink({
  to,
  title,
  sub,
  children,
}: {
  to: "/rights" | "/support";
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-2xl border border-hairline px-4 py-3 transition-colors hover:bg-secondary"
    >
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <span className="flex items-center gap-2 text-brand">
        {children}
        <ArrowRight size={15} />
      </span>
    </Link>
  );
}
