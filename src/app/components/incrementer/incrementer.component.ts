import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent {
  // Recibir un valor desde el padre. darle un alias con un texto entre los parentesis
  @Input() progress: number = 0;
  @Input() btnClass: string = 'btn btn-info';
  // Enviar informacion hacia el padre, los output son de tipo event emitter necesitan un tipo de dato e inicializarse 
  @Output() setProgress: EventEmitter<number> = new EventEmitter();

  // controla los botones
  emitProgress(value: number) {
    if(this.progress <= 0 && value < 0) { 
      this.setProgress.emit(0); 
      return this.progress = 0;
    } 
    else if(this.progress >= 100 && value >= 0) {
      this.setProgress.emit(100);
      return this.progress = 100;
    }
    this.progress += value;
    this.setProgress.emit( this.progress );
  }

  // controla el input
  onChangeProgress(value: number) {
    if(value <= 0) {
      value = 0;
    }
    else if(value >= 100){ 
      value = 100;
    } 
    else {
      this.progress = value;  
    }
    this.setProgress.emit( this.progress );
  }
}
