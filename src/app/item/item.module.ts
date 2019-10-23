import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddComponent } from './item-add/item-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedbackMsgModule } from '../shared/components/feedback-msg/feedback-msg.module';
import { ItemExchangeComponent } from './item-exchange/item-exchange.component';



@NgModule({
  declarations: [ItemAddComponent, ItemExchangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeedbackMsgModule
  ]
})
export class ItemModule { }
