import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralRegisterComponent } from './referral-register.component';

describe('ReferralRegisterComponent', () => {
  let component: ReferralRegisterComponent;
  let fixture: ComponentFixture<ReferralRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
