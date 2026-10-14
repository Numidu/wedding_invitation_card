import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  @Output()
  openInvitationEvent = new EventEmitter<void>();

  openInvitation() {
    this.openInvitationEvent.emit();
  }

  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef<HTMLAudioElement>;

  isPlaying = false;

  toggleMusic() {

    if (this.isPlaying) {

      this.audioPlayer.nativeElement.pause();

    } else {

      this.audioPlayer.nativeElement.play();

    }

    this.isPlaying = !this.isPlaying;

  }
}
