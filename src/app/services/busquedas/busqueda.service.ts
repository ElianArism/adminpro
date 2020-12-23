import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'; // entorno desarrollo

import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';

import { map } from 'rxjs/operators';
import { Medico } from '../../models/medicos.model';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }
  

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
                return res = res.resultado.map(u => new Usuario(u.nombre, u.email, '', u.google, u.img, u.role, u.uid));
              
              case 'hospitales': 
                return  res = res.resultado.map(h => new Hospital(h._id, h.nombre, h.img = 'no-image', h.usuario));
              
              case 'medicos':
                return res = res.resultado.map(m => new Medico(m.nombre, m.mid, m.img, m.usuario, m.hospital));
              default: 
                break;
          }
        })
      )
  } 

  busquedaGlobal(termino: string) {
    const url = `${backend_url}/buscar/${termino}`; 
    return this.http.get(url, this.getHeaders);
  }
}
