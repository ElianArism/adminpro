import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    // en el path dashboard siempre se carga este componente
    component: PagesComponent, 
    
    // middleware para proteger rutas
    canActivate: [AuthGuard],
    // propiedad que declara rutas hijas 
    // children: []
    
    // guard a utilizar si estamos implementando lazy load, sirve para cargar datos solo si el usuario tiene acceso a esa ruta
    canLoad: [ AuthGuard ],
    // implementar lazy load 
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule) 
   }, 

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
