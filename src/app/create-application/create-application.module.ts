import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createApplicationRouterModule } from './create-application.router';
import { CreateApplicationComponent } from './create-application.component';

@NgModule({
  imports: [
    CommonModule,
    createApplicationRouterModule
  ],
  declarations: [CreateApplicationComponent]
})
export class CreateApplicationModule { }
