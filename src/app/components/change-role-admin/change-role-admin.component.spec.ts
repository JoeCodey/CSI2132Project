import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRoleAdminComponent } from './change-role-admin.component';

describe('ChangeRoleAdminComponent', () => {
  let component: ChangeRoleAdminComponent;
  let fixture: ComponentFixture<ChangeRoleAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRoleAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRoleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
