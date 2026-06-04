import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingDetails } from './wedding-details';

describe('WeddingDetails', () => {
  let component: WeddingDetails;
  let fixture: ComponentFixture<WeddingDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(WeddingDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
