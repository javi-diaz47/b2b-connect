export interface UserWithProjects {
  id: string;
  email: string;
  name?: string;
  lastname?: string;
  created_at?: string;
  history?: string;
  objetives?: string;
  projects?: Project[];
  userExperienceAreas?: ExperienceArea[];
}

export interface Project {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  created_at?: string;
}

export interface ExperienceArea {
  id: string;
  user_id?: string;
  area_id?: string;
  area: string;
  created_at?: string;
}

interface CalendarEvent {
  id?: string;
  kind?: string;
  etag?: string;
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  summary: string;
  description: string;
  creator?: {
    email: string;
    self: boolean;
  };
  organizer?: {
    email: string;
    self: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID?: string;
  sequence?: number;
  attendees?: {
    email: string;
    responseStatus?: string;
  }[];
  hangoutLink?: string;
  conferenceData?: {
    createRequest?: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status?: {
        statusCode: string;
      };
    };
    entryPoints?: {
      entryPointType: string;
      uri: string;
      label: string;
    }[];
    conferenceSolution?: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId?: string;
  };
  reminders?: {
    useDefault: boolean;
  };
  eventType?: string;
}

export type isValidAttendee = 'VALID' | 'NOT VALID' | 'DUPLICATED';

// interface CalendarEvent {
//   kind: string;
//   etag: string;
//   id: string;
//   status: string;
//   htmlLink: string;
//   created: string;
//   updated: string;
//   summary: string;
//   description: string;
//   creator: {
//     email: string;
//     self: boolean;
//   };
//   organizer: {
//     email: string;
//     self: boolean;
//   };
//   start: {
//     dateTime: string;
//     timeZone: string;
//   };
//   end: {
//     dateTime: string;
//     timeZone: string;
//   };
//   iCalUID: string;
//   sequence: number;
//   hangoutLink: string;
//   conferenceData?: {
//     createRequest: {
//       requestId: string;
//       conferenceSolutionKey: {
//         type: string;
//       };
//       status?: {
//         statusCode: string;
//       };
//     };
//     entryPoints?: {
//       entryPointType: string;
//       uri: string;
//       label: string;
//     }[];
//     conferenceSolution?: {
//       key: {
//         type: string;
//       };
//       name: string;
//       iconUri: string;
//     };
//     conferenceId: string;
//   };
//   reminders?: {
//     useDefault: boolean;
//   };
//   eventType?: string;
// }

interface Round {
  id?: string;
  event_id: string;
  user_id: string;
  areas?: string;
  created_at?: string;
}
