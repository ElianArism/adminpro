import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _ocultarModal:boolean = true;
  private _usuario: Usuario;
  constructor() { }

  get getModal() {
    return this._ocultarModal;
  }

  get getUsuario() {
    return this._usuario;
  }

  abrirModal(u: Usuario, tipo: 'usuarios' | 'medicos' | 'hospitales') {
    this._usuario = u;
    this._ocultarModal = false;
  }
  
  cerrarModal() {
    this._ocultarModal = true;
  }

}
