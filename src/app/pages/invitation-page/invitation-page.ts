import { Component } from '@angular/core';
import { InvitationMessage } from '../invitation-message/invitation-message';
import { Countdown } from '../countdown/countdown';
import { Couple } from '../couple/couple';
import { OurStory } from '../our-story/our-story';
import { Gallery } from '../gallery/gallery';
import { WeddingDetails } from '../wedding-details/wedding-details';
import { Location } from '../location/location';
import { Rsvp } from '../rsvp/rsvp';

@Component({
  selector: 'app-invitation-page',
  imports: [InvitationMessage,Countdown,Couple,OurStory,Gallery,WeddingDetails,Location,Rsvp],
  templateUrl: './invitation-page.html',
  styleUrl: './invitation-page.css',
})
export class InvitationPage {}
