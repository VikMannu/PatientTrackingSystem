import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesManagementComponent } from './subcategories-management.component';

describe('SubcategoriesManagementComponent', () => {
  let component: SubcategoriesManagementComponent;
  let fixture: ComponentFixture<SubcategoriesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
