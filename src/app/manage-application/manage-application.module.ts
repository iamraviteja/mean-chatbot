import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { manageApplicationRouterModule } from './manage-application.router';
import { ManageApplicationComponent } from './manage-application.component';

@NgModule({
  imports: [
    CommonModule,
    manageApplicationRouterModule
  ],
  declarations: [ManageApplicationComponent]
})
export class ManageApplicationModule { }
