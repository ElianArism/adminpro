import { Component } from '@angular/core';

@Component({
  selector: 'app-grafical',
  templateUrl: './grafical.component.html',
  styles: []
})
export class GraficalComponent {
  public labelGraficalOne: string[] = ['Queso', 'Yogurt', 'Leche'];
  public valuesGraficalOne: number[] =  [150, 250, 300];
}
