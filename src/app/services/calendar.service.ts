import { Injectable } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { CALENDAR_API, USER_STORAGE_KEY } from '../shared/constants/constants';
import { CalendarEvent } from 'src/types';

interface getEmailAndProviderToken {
  email: string;
  providerToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor() {}

  getEmailAndProviderToken(): getEmailAndProviderToken {
    let localSession = localStorage.getItem(USER_STORAGE_KEY);
    if (localSession) {
      const session: Session = JSON.parse(localSession);
      return {
        providerToken: session.provider_token || '',
        email: session.user.email || '',
      };
    }
    return {
      providerToken: '',
      email: '',
    };
  }

  async createEvent(event: CalendarEvent): Promise<GetEvents> {
    const { email, providerToken } = this.getEmailAndProviderToken();

    event.start.dateTime = new Date(event.start.dateTime).toISOString();
    event.end.dateTime = new Date(event.end.dateTime).toISOString();
    event.conferenceData = {
      createRequest: {
        requestId: self.crypto.randomUUID(),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    };

    return await fetch(`${CALENDAR_API}?conferenceDataVersion=1`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
      body: JSON.stringify(event),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert('La rueda de negocios fue agendada con exito!');
          return { event: data };
        }
        return { event: data.error };
      });
  }

  async getEvents(): Promise<GetEvents> {
    const { email, providerToken } = this.getEmailAndProviderToken();

    return await fetch(CALENDAR_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  }
}

interface GetEvents {
  event?: CalendarEvent;
  error?: any;
}
