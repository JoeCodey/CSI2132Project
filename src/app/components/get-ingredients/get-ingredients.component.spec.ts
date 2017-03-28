import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIngredientsComponent } from './get-ingredients.component';

describe('GetIngredientsComponent', () => {
  let component: GetIngredientsComponent;
  let fixture: ComponentFixture<GetIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
