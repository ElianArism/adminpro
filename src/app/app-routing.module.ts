import { NgModule } from '@angular/core';
// modulo del router 
import { Routes, RouterModule } from '@angular/router';

// modulos rutas hijas
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

// componentes
import { NotFound404Component } from './not-found404/not-found404.component';

const routes: Routes = [
  // para un path vacio
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  
  // para cualquier otra ruta
  { path: '**', component: NotFound404Component }
];

@NgModule({
  imports: [
    PagesRoutingModule,  
    AuthRoutingModule,
    // para rutas principales se usa forRoot
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
