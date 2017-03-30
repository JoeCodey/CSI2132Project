import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveIngredientOrderComponent } from './approve-ingredient-order.component';

describe('ApproveIngredientOrderComponent', () => {
  let component: ApproveIngredientOrderComponent;
  let fixture: ComponentFixture<ApproveIngredientOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveIngredientOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveIngredientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
