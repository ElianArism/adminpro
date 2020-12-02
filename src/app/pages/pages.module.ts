import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router'; // de esta manera se importa la logica del router outlet a modulos internos
 
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    DashboardComponent,
  ],
  exports: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    DashboardComponent  
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
