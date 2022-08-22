import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationProjectFormComponent } from './colocation-project-form.component';

describe('ColocationProjectFormComponent', () => {
  let component: ColocationProjectFormComponent;
  let fixture: ComponentFixture<ColocationProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
