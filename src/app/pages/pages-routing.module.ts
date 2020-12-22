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
import { MedicosComponent } from './maintenance/medicos/medicos.component';
import { HospitalesComponent } from './maintenance/hospitales/hospitales.component';
import { MedicoComponent } from './maintenance/medicos/medico.component';

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
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimiento - Usuarios' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento - Medicos' } },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento - Hospitales' } },
      
      // path para actualizar un medico
      {path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar medico' }}
    ]
   }, 

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
