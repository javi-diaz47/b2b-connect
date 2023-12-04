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
    const events = await this.calendarService.getEvents();

    // this.events = events;

    console.log(events);
  }

  async ngOnInit(): Promise<void> {
    await this.getCalendarEvents();
  }
}
