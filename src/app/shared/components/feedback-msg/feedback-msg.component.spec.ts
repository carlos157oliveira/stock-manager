import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackMsgComponent } from './feedback-msg.component';

describe('FeedbackMsgComponent', () => {
  let component: FeedbackMsgComponent;
  let fixture: ComponentFixture<FeedbackMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
