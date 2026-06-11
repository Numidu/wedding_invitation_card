import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  imports: [FormsModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css',
})
export class Rsvp {
  hostWhatsappNumber = '94770000000';
  submitted = signal(false);

  guest = {
    name: '',
    attendance: 'yes',
    guests: 1,
    meal: 'No preference',
    message: '',
  };

  submitRsvp() {
    const attendanceText =
      this.guest.attendance === 'yes' ? 'Yes, I will attend' : "Sorry, I can't attend";

    const lines = [
      'Wedding RSVP',
      `Name: ${this.guest.name}`,
      `Attendance: ${attendanceText}`,
      `Guests: ${this.guest.guests}`,
      `Meal: ${this.guest.meal}`,
      this.guest.message ? `Message: ${this.guest.message}` : '',
    ].filter(Boolean);

    const url = `https://wa.me/${this.hostWhatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.submitted.set(true);
  }
}
