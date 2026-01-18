export interface HistoryEvent {
  title: string;
  description: string;
}

export interface HistoryPeriod {
  start: number;
  end: number;
  label: string;
  events: HistoryEvent[];
}
