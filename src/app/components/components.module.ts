import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// modulos npm
import { ChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ModalImgComponent } from './modal-img/modal-img.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DoughnutComponent,
    ModalImgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ], 
  exports: [
    IncrementerComponent,
    DoughnutComponent,
    ModalImgComponent
  ]
})
export class ComponentsModule { }
