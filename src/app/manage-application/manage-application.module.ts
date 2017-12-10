import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { manageApplicationRouterModule } from './manage-application.router';
import { ManageApplicationComponent } from './manage-application.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    manageApplicationRouterModule
  ],
  declarations: [ManageApplicationComponent]
})
export class ManageApplicationModule { }
