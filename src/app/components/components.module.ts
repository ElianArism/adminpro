import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// modulos npm
import { ChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DoughnutComponent } from './doughnut/doughnut.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DoughnutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ], 
  exports: [
    IncrementerComponent,
    DoughnutComponent
  ]
})
export class ComponentsModule { }
