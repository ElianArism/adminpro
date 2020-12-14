import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// componentes

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  
  {
    path: 'auth',
    // auth depende solo de las rutas hijas, por eso no carga ningun componente en si
    children: [
      { path: '', component: LoginComponent},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
