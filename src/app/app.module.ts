import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404/not-found404.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFound404Component,
  ],
  
  // los modulos van aca
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    AuthModule,
    AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
