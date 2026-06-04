import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPage } from './invitation-page';

describe('InvitationPage', () => {
  let component: InvitationPage;
  let fixture: ComponentFixture<InvitationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
