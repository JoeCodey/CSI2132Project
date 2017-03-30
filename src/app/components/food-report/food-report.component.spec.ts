import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodReportComponent } from './food-report.component';

describe('FoodReportComponent', () => {
  let component: FoodReportComponent;
  let fixture: ComponentFixture<FoodReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
