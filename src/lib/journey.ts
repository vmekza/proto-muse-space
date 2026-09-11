import { useSyncExternalStore } from "react";

export type FlightOption = {
  id: string;
  route: string;
  depart: string;
  arrive: string;
  date: string;
  via?: string;
  duration: string;
  note: string;
  recommended?: boolean;
};

export const booking = {
  passenger: "E. Zavyalova",
  reference: "QK7T2M",
  flight: "AY1337",
  from: { code: "HEL", city: "Helsinki" },
  to: { code: "LHR", city: "London" },
  originalDeparture: "14:05",
  status: "Cancelled",
  reason: "Crew industrial action",
  delayHours: 5,
};

export const handled = [
  "Rebooked you on the next available flight",
  "Protected the rest of your itinerary",
  "Issued an 18 EUR meal voucher",
];

export const options: FlightOption[] = [
  {
    id: "ay1341",
    route: "AY1341",
    depart: "18:20",
    arrive: "19:30",
    date: "Today",
    duration: "3h 10m",
    note: "Direct. Seat 14A held for 40 minutes.",
    recommended: true,
  },
  {
    id: "ay1349",
    route: "AY1349",
    depart: "21:05",
    arrive: "22:15",
    date: "Today",
    duration: "3h 10m",
    note: "Direct. Later arrival, more seats available.",
  },
  {
    id: "ay811",
    route: "AY811 + BA817",
    depart: "16:40",
    arrive: "21:05",
    date: "Today",
    via: "Copenhagen",
    duration: "5h 25m",
    note: "One stop. Earlier departure, longer journey.",
  },
  {
    id: "ay1331",
    route: "AY1331",
    depart: "07:35",
    arrive: "08:45",
    date: "Tomorrow",
    duration: "3h 10m",
    note: "Includes hotel and transfer at Finnair's cost.",
  },
];

type State = {
  choice: string | null;
  resolved: boolean;
  refundRequested: boolean;
  supportRequested: boolean;
};

let state: State = {
  choice: null,
  resolved: false,
  refundRequested: false,
  supportRequested: false,
};

const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export const journey = {
  accept(id: string) {
    set({ choice: id, resolved: true, refundRequested: false });
  },
  requestRefund() {
    set({ choice: null, resolved: true, refundRequested: true });
  },
  requestSupport() {
    set({ supportRequested: true });
  },
  reset() {
    set({ choice: null, resolved: false, refundRequested: false, supportRequested: false });
  },
};

export function useJourney() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}

export function optionById(id: string | null) {
  return options.find((o) => o.id === id) ?? null;
}
