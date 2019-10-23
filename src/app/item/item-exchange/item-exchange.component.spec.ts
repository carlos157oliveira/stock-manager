import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemExchangeComponent } from './item-exchange.component';

describe('ItemExchangeComponent', () => {
  let component: ItemExchangeComponent;
  let fixture: ComponentFixture<ItemExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
