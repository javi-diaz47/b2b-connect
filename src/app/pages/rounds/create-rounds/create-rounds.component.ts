import { Component } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarEvent, isValidAttendee } from 'src/types';

@Component({
  selector: 'app-create-rounds',
  templateUrl: './create-rounds.component.html',
  styleUrls: ['./create-rounds.component.scss'],
})
export class CreateRoundsComponent {
  constructor(private readonly calendarService: CalendarService) {}

  event: CalendarEvent = {
    summary: 'Mi Primera rueda',
    description: 'Esta es mi primera rueda de negocios',
    start: {
      dateTime: '2023-11-26T20:29',
      timeZone: 'America/Bogota',
    },
    end: {
      dateTime: '2023-12-27T20:30',
      timeZone: 'America/Bogota',
    },
    attendees: [],
  };

  createEvent() {
    console.log(this.event);
    this.calendarService.createEvent(this.event);
  }

  inputAttendee = '';

  isValidAttendee: isValidAttendee = 'VALID';

  isValidEmail(email: string): boolean {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  }

  isAttendeeDuplicate(): boolean {
    if (this.event.attendees) {
      return this.event.attendees.some(
        (attendee) => attendee.email === this.inputAttendee
      );
    }
    return false;
  }

  checkAttendee(): isValidAttendee {
    if (!this.isValidEmail(this.inputAttendee)) {
      return 'NOT VALID';
    }
    if (this.isAttendeeDuplicate()) {
      return 'DUPLICATED';
    }
    return 'VALID';
  }

  addAttendee() {
    if (this.inputAttendee.trim() !== '' && this.event.attendees) {
      this.isValidAttendee = this.checkAttendee();
      if (this.isValidAttendee === 'VALID') {
        this.event.attendees.push({ email: this.inputAttendee });
        console.log(this.event.attendees);
      }
      this.inputAttendee = ''; // Clear the input field
    }
  }

  removeAttendee(attendeeToRemove: string) {
    if (this.event.attendees) {
      this.event.attendees = this.event.attendees.filter(
        (attendee) => attendee.email !== attendeeToRemove
      );
    }
  }
}
