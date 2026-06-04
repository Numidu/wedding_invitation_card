import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css'
})
export class Countdown implements OnInit {

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);

  ngOnInit(): void {

    const weddingDate = new Date('2026-12-15T09:00:00').getTime();

    setInterval(() => {

      const now = Date.now();
      const distance = weddingDate - now;

      if (distance <= 0) {
        return;
      }

      this.days.set(
        Math.floor(distance / (1000 * 60 * 60 * 24))
      );

      this.hours.set(
        Math.floor(
          (distance % (1000 * 60 * 60 * 24))
          / (1000 * 60 * 60)
        )
      );

      this.minutes.set(
        Math.floor(
          (distance % (1000 * 60 * 60))
          / (1000 * 60)
        )
      );

      this.seconds.set(
        Math.floor(
          (distance % (1000 * 60))
          / 1000
        )
      );

    }, 1000);

  }

}