import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './components/hero/hero';
import { InvitationMessage } from './pages/invitation-message/invitation-message';
import { InvitationPage } from './pages/invitation-page/invitation-page';

@Component({
  selector: 'app-root',
  imports: [Hero,InvitationPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('wedding-invitation');
  showInvitation = signal(false);

  openInvitation() {
    this.showInvitation.set(true);
  }
}
