import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationPageComponent } from './colocation-page.component';

describe('ColocationComponent', () => {
  let component: ColocationPageComponent;
  let fixture: ComponentFixture<ColocationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
