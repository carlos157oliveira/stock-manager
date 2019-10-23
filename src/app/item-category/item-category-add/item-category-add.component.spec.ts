import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryAddComponent } from './item-category-add.component';

describe('ItemCategoryAddComponent', () => {
  let component: ItemCategoryAddComponent;
  let fixture: ComponentFixture<ItemCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
