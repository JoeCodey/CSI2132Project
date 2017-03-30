import { TestBed, inject } from '@angular/core/testing';

import { IngredientOrderService } from './ingredient-order.service';

describe('IngredientOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientOrderService]
    });
  });

  it('should ...', inject([IngredientOrderService], (service: IngredientOrderService) => {
    expect(service).toBeTruthy();
  }));
});
