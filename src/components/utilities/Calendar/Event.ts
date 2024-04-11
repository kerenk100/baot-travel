// Event.ts
export interface Event {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}
