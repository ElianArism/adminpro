import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _ocultarModal:boolean = true;

  public  tipo: 'usuarios' | 'medicos' | 'hospitales';  
  public  id: string;
  public  img: string;

  // evento para notificar que se subio una nueva img y actualizarla en todas las partes de la app
  public nuevaImg: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  get getModal() {
    return this._ocultarModal;
  }

  abrirModal(id: string, tipo: 'usuarios' | 'medicos' | 'hospitales', img: string = 'no-img') {

    this._ocultarModal = false;
    this.id = id;
    this.tipo = tipo;
  
    // comprobar si la img es de google
    if ( img.includes('https') ) {
      this.img = img;
    } 
    // si no es de google se coloca el path donde se ubica la img en la bd
    else {
      this.img = `${ backend_url }/upload/${ tipo }/${ img }`;
    }
  }
  
  cerrarModal() {
    this._ocultarModal = true;
  }

}
