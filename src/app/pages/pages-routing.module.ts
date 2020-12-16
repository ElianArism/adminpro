import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './maintenance/usuarios/usuarios.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    // en el path dashboard siempre se carga este componente
    component: PagesComponent, 
    // middleware para proteger rutas
    canActivate: [AuthGuard],
    // propiedad que declara rutas hijas 
    children: [
      // podes pasarle datos a cada path con la propiedad data
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } }, 
      { path: 'perfil', component: PerfilComponent, data: {title: 'My Profile'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'grafical', component: GraficalComponent, data: { title: 'Grafical' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Themes' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
    
      // maintenance
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuario de aplicacion' } }
    ]
   }, 

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
