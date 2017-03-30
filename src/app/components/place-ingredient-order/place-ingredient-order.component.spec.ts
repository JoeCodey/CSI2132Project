import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceIngredientOrderComponent } from './place-ingredient-order.component';

describe('PlaceIngredientOrderComponent', () => {
  let component: PlaceIngredientOrderComponent;
  let fixture: ComponentFixture<PlaceIngredientOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceIngredientOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceIngredientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
