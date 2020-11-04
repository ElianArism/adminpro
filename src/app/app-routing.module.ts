import { NgModule } from '@angular/core';
// modulo del router 
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GraficalComponent } from './pages/grafical/grafical.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent, 
    // propiedad que declara rutas hijas 
    children: [
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'progress', component: ProgressComponent },
      { path: 'grafical', component: GraficalComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
   }, 


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // para cualquier otra ruta
  { path: '**', component: NotFound404Component }
];

@NgModule({
  imports: [
    // para rutas principales se usa forRoot
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
