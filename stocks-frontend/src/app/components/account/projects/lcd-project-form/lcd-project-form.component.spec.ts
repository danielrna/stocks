import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcdProjectFormComponent } from './lcd-project-form.component';

describe('ColocationProjectFormComponent', () => {
  let component: LcdProjectFormComponent;
  let fixture: ComponentFixture<LcdProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcdProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LcdProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
