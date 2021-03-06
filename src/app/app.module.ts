import { BrowserModule} from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { CreateApplicationModule } from './create-application/create-application.module';
import { ManageApplicationModule } from './manage-application/manage-application.module';
import { appRouterModule } from './app.router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    ManageApplicationModule,
    CreateApplicationModule,
    appRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
