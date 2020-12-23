import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

import { Medico } from '../models/medicos.model';


const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }0

  get getToken():string {
    return localStorage.getItem('token') || '';
  }

  get getHeaders() {
    return { headers: { 
      'x-token': this.getToken
    }}
  }

  cargarMedicos(desde: number) {
    const url = `${backend_url}/medicos?desde=${desde}`;
    
    return this.http.get(url, this.getHeaders)
      .pipe(
        map((res: any) => {
          const medicos = res.medicos.map(m => new Medico(m.nombre, m.mid, m.img, m.usuario, m.hospital));
          res = {medicos, 'totalMedicos': res.totalMedicos};
          return res;
        })
      );
  }

  crearMedico({nombre, hospital}) {
    const url = `${backend_url}/medicos`; 
    return this.http.post(url, {nombre, hospital}, this.getHeaders);
  }

  getMedicoById(id: string) {
    const url = `${backend_url}/medicos/${id}`; 
    return this.http.get(url, this.getHeaders).pipe(
      map((res: any ) => {
        if(res.medico.usuario === null) {
          res = new Medico(res.medico.nombre, res.medico.mid, res.medico.img, null, res.medico.hospital._id)
        } else if(res.medico.hospital === null) {
          res = new Medico(res.medico.nombre, res.medico.mid, res.medico.img, res.medico.usuario._id, null)
        } else {
          res = new Medico(res.medico.nombre, res.medico.mid, res.medico.img, res.medico.usuario._id, res.medico.hospital._id)
        }
        return res;
      })
    )
  }

  actualizarMedico(medico: {nombre, hospital, mid}) {
    const url = `${backend_url}/medicos/${medico.mid}`; 
    return this.http.put(url, medico, this.getHeaders);
  }

  borrarMedico(medico: Medico) {
    const url = `${backend_url}/medicos/${medico.getId}`; 
    return this.http.delete(url, this.getHeaders);
  }


}
