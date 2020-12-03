import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {
  // Input para recibir datos del padre
  @Input() public title: string = 'Sin Titulo';
  @Input('labels') public doughnutChartLabels: Label[] = ['no Sales', 'no Sales', 'no Sales'];
  @Input('data') public doughnutChartData: MultiDataSet = [[350, 450, 100]];
 
  public colors: Color[] = [
    {backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]}
  ];

}
