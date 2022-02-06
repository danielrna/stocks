import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestProfileComponent } from './invest-profile.component';

describe('InvestProfileComponent', () => {
  let component: InvestProfileComponent;
  let fixture: ComponentFixture<InvestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
