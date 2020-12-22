import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import Swal from 'sweetalert2';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  
  get getToken():string {
    return localStorage.getItem('token') || '';
  }

  get getHeaders() {
    return { headers: { 
      'x-token': this.getToken
    }}
  }

  cargarHospitales(desde: number = 0, cantidadATraer: 'five' | 'all' = 'five') {
    const url = `${backend_url}/hospitales?desde=${desde}&cantidad=${cantidadATraer}`; 
    
    return this.http.get(url, this.getHeaders)
      .pipe(
        map((res:{ok: boolean, hospitales: Hospital[], totalHospitales: number}) => {
          return {
            'hospitales': res.hospitales,
            'totalHospitales': res.totalHospitales
          };
        })
      )
  }

  crearHospital(nombre: string) {
    const url = `${backend_url}/hospitales`; 
   
    return this.http.post(url, { nombre } ,this.getHeaders)
    .pipe(
      catchError(err => {
        Swal.fire('Error', err.error.msg, 'error')
        return err;
      })  
    )
  } 
  
  actualizarHospital(id: string, nombre: string) {
    const url = `${backend_url}/hospitales/${id}`; 
   
    return this.http.put(url, { nombre } ,this.getHeaders)
    .pipe(
      catchError(err => {
        Swal.fire('Error', err.error.msg, 'error')
        return err;
      })  
    )
  } 

  borrarHospital(id: string) {
    const url = `${backend_url}/hospitales/${id}`; 
   
    return this.http.delete(url, this.getHeaders)
    .pipe(
      catchError(err => {
        Swal.fire('Error', err.error.msg, 'error')
        return err;
      })  
    )
  } 


}
