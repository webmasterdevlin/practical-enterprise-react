export type CalendarType = {
  events?: EventType[] | any;
  isModalOpen: boolean;
  selectedEventId: string | null;
  selectedRange: {
    start: number;
    end: number;
  } | null;
};

export type EventType = {
  id: string;
  allDay: boolean;
  color?: string;
  description: string;
  end: Date;
  start: Date;
  title: string;
};

export type ViewType =
  | 'dayGridMonth'
  | 'timeGridWeek'
  | 'timeGridDay'
  | 'listWeek';