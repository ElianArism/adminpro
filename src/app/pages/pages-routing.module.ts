import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    // en el path dashboard siempre se carga este componente
    component: PagesComponent, 
    // propiedad que declara rutas hijas 
    children: [
      // podes pasarle datos a cada path con la propiedad data
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } }, 
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'grafical', component: GraficalComponent, data: { title: 'Grafical' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Themes' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } }
    ]
   }, 

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
