import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockListModule } from './stock-list/stock-list.module';
import { CoreModule } from './core/core.module';
import { ItemCategoryModule } from './item-category/item-category.module';
import { dbFactory, DbManagerService } from './data/db-manager.service';
import { CategoryListModule } from './category-list/category-list.module';
import { ItemModule } from './item/item.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StockListModule,
    CoreModule,
    ItemCategoryModule,
    CategoryListModule,
    ItemModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: dbFactory,
      deps: [DbManagerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
