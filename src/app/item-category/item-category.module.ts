import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemCategoryAddComponent } from './item-category-add/item-category-add.component';
import { FeedbackMsgModule } from '../shared/components/feedback-msg/feedback-msg.module';


@NgModule({
  declarations: [
    ItemCategoryAddComponent
  ],
  imports: [
    CommonModule,
    FeedbackMsgModule,
    ReactiveFormsModule
  ]
})
export class ItemCategoryModule { }
