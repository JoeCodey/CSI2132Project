import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientOrderInfoComponent } from './ingredient-order-info.component';

describe('IngredientOrderInfoComponent', () => {
  let component: IngredientOrderInfoComponent;
  let fixture: ComponentFixture<IngredientOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
