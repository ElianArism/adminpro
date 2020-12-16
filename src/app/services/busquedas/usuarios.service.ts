import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'; // entorno desarrollo

import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  
  // get getUsuario() {
  //   return this.usuario;
  // }

  get getToken():string {
    return localStorage.getItem('token') || '';
  }
  get getHeaders() {
    return { headers: { 
      'x-token': this.getToken
    }}
  }
  

  buscar(tipo: 'hospitales' | 'usuarios' | 'medicos', termino: string) {
    const url = `${backend_url}/buscar/${tipo}/${termino}`; 

    return this.http.get<any[]>(url, this.getHeaders) 
      .pipe(
        map((res: any) => {
          switch(tipo) {
              case 'usuarios':
                return res = res.resultado.map(u => new Usuario(u.nombre, u.email, '', u.google, u.img, u.role, u.uid))
              
              default: 
                break;
          }
        })
      )
  } 
}
