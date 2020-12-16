import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// modulos propios 
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router'; // de esta manera se importa la logica del router outlet a modulos internos
import { ComponentsModule } from '../components/components.module';

// Components
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './maintenance/usuarios/usuarios.component';
import { ModalImgComponent } from '../components/modal-img/modal-img.component';


@NgModule({
  declarations: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
  exports: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
