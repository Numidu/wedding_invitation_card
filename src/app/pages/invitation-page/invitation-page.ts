import { Component } from '@angular/core';
import { InvitationMessage } from '../invitation-message/invitation-message';
import { Countdown } from '../countdown/countdown';
import { Couple } from '../couple/couple';
import { OurStory } from '../our-story/our-story';
import { Gallery } from '../gallery/gallery';
import { WeddingDetails } from '../wedding-details/wedding-details';
import { GuestGuide } from '../guest-guide/guest-guide';
import { Location } from '../location/location';
import { Rsvp } from '../rsvp/rsvp';
import { RomanticScene } from '../../components/romantic-scene/romantic-scene';

@Component({
  selector: 'app-invitation-page',
  imports: [InvitationMessage,Countdown,Couple,OurStory,Gallery,WeddingDetails,GuestGuide,Location,Rsvp,RomanticScene],
  templateUrl: './invitation-page.html',
  styleUrl: './invitation-page.css',
})
export class InvitationPage {}
