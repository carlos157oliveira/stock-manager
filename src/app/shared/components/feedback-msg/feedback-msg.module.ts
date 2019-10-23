import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackMsgComponent } from './feedback-msg.component';


@NgModule({
  declarations: [FeedbackMsgComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FeedbackMsgComponent
  ]
})
export class FeedbackMsgModule { }
