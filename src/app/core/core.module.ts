import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './errors/error.component';
import { GlobalErrorHandler } from './errors/global-error.handler';
import { LogoModule } from '../shared/components/logo/logo.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LogoModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class CoreModule { }
