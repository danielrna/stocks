import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationProjectComponent } from './colocation-project.component';

describe('ColocationProjectComponent', () => {
  let component: ColocationProjectComponent;
  let fixture: ComponentFixture<ColocationProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
