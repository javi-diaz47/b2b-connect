import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarEvent } from 'src/types';

@Component({
  selector: 'app-my-rounds',
  templateUrl: './my-rounds.component.html',
  styleUrls: ['./my-rounds.component.scss'],
})
export class MyRoundsComponent {
  constructor(
    private readonly calendarService: CalendarService,
    private authService: AuthService
  ) {}

  events: CalendarEvent[] = [];

  async getCalendarEvents() {
    const res = await this.authService.getRoundsId();

    if (res.rounds_ids) {
      const eventIds = await res.rounds_ids.map(({ event_id }) => event_id);
      const events = await this.calendarService.getEvents(eventIds);

      this.events = await events;

      console.log(this.events);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getCalendarEvents();
  }
}
