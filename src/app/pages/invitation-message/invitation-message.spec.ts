import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationMessage } from './invitation-message';

describe('InvitationMessage', () => {
  let component: InvitationMessage;
  let fixture: ComponentFixture<InvitationMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
