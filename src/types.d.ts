export interface UserWithProjects {
  id: string;
  email: string;
  name?: string;
  lastname?: string;
  created_at?: string;
  history?: string;
  objetives?: string;
  projects?: Project[];
  experienceAreas?: ExpirienceArea[];
}

export interface Project {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  created_at?: string;
}

export interface ExpirienceArea {
  id: string;
  user_id: string;
  area?: string;
  created_at: string;
}

export interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
  conferenceData?: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: { type: string };
    };
  };
  attendees?: {
    email: string;
  }[];
}

export type isValidAttendee = 'VALID' | 'NOT VALID' | 'DUPLICATED';
