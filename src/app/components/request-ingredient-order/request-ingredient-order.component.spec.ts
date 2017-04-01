import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestIngredientOrderComponent } from './request-ingredient-order.component';

describe('RequestIngredientOrderComponent', () => {
  let component: RequestIngredientOrderComponent;
  let fixture: ComponentFixture<RequestIngredientOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestIngredientOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestIngredientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
