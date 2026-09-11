import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { AppShell, Card, Eyebrow } from "@/components/AppShell";
import { booking, journey, options, useJourney } from "@/lib/journey";

export const Route = createFileRoute("/options")({
  head: () => ({
    meta: [
      { title: "Choose a new flight — Finnair Disruption Recovery" },
      {
        name: "description",
        content:
          "Compare the rebooking Finnair proposed with the other flights available to you today and tomorrow.",
      },
      { property: "og:title", content: "Choose a new flight — Finnair Disruption Recovery" },
      {
        property: "og:description",
        content: "Transparent comparison of every alternative on your disrupted route.",
      },
    ],
  }),
  component: OptionsPage,
});

function OptionsPage() {
  const state = useJourney();

  return (
    <AppShell>
      <Eyebrow>Step 02</Eyebrow>
      <h1 className="serif mt-3 text-3xl leading-tight">Choose how you travel.</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Every alternative on {booking.from.code} → {booking.to.code}, at no extra cost. Choosing a
        flight replaces the automatic rebooking.
      </p>

      <div className="mt-6 space-y-3">
        {options.map((option) => {
          const selected = state.choice === option.id;
          return (
            <Card key={option.id} className={selected ? "border-brand bg-secondary" : ""}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">
                    {option.depart} → {option.arrive}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {option.date} · {option.route}
                    {option.via ? ` · via ${option.via}` : " · Direct"}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock size={13} />
                  {option.duration}
                </span>
              </div>

              {option.recommended && (
                <p className="mt-3 inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-foreground">
                  Automatically rebooked
                </p>
              )}

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{option.note}</p>

              <button
                type="button"
                onClick={() => journey.accept(option.id)}
                disabled={selected}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors enabled:hover:bg-brand enabled:hover:text-brand-foreground disabled:opacity-100"
              >
                {selected ? (
                  <>
                    <Check size={15} strokeWidth={3} /> Selected
                  </>
                ) : (
                  "Take this flight"
                )}
              </button>
            </Card>
          );
        })}
      </div>

      <Link
        to="/"
        className="mt-6 block text-center text-xs font-semibold text-brand underline underline-offset-4"
      >
        Back to recovery overview
      </Link>
    </AppShell>
  );
}
