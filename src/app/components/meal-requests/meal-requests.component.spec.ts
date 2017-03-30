import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealRequestsComponent } from './meal-requests.component';

describe('MealRequestsComponent', () => {
  let component: MealRequestsComponent;
  let fixture: ComponentFixture<MealRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
