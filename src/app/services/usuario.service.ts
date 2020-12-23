import { Injectable, NgZone } from '@angular/core';

// libreria de angular para manejar peticiones http
import { HttpClient} from '@angular/common/http';

import { environment } from '../../environments/environment'; // entorno desarrollo

import { registerForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';
import { cargarUsuario } from '../interfaces/cargarUsuario.interface';

import { Usuario } from '../models/usuario.model';

// rxjs 
// tap lo que hace es disparar una funcion cada que se ejecuta
import { tap, map, catchError, delay } from 'rxjs/operators';
import { of, Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from './modal.service';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private backend_url: string = environment.backend_url;
  private auth2: any;
  private usuario: Usuario;
  
  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone, private ModalService:ModalService) { 
    this.googleInit();
  }



  get getUsuario() {
    return this.usuario;
  }
  get getRole() {
    return this.usuario.getRole;
  }
  get getAuth() {
    return this.auth2;
  }
  get getToken():string {
    return localStorage.getItem('token') || '';
  }
  get getHeaders() {
    return { headers: { 
      'x-token': this.getToken
    }}
  }

  setearValoresLS(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '696993275378-amn0lcrc83e5r135dn057r1h9j17dagd.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });  
    });
  }
  
  // validar token 
  validarToken(): Observable<boolean> { 

    return this.http.get(`${this.backend_url}/login/renovar-token`, this.getHeaders)
    .pipe(
      map( (res:any) => {
        const { nombre, email, role, google, img = '', uid } = res.usuarioDB;
        
        // crear instancia usuario
        this.usuario = new Usuario(nombre, email, '', google, img, role, uid);
        
        this.setearValoresLS(res.token, res.menu);
        
        // si llega aca el token es valido, y retorna true
        return true; 
      }), 
      catchError(
        // si llega aca el token es invalido, y retorna false
        err => of(false) // crea un observable con el valor false
      )
    );
  }
  
  // login usuario 
  login(formData: loginForm) {
    return this.http.post(`${this.backend_url}/login`, formData)
      .pipe(
        tap( (res: any) => { 
          this.setearValoresLS(res.token, res.menu);
        })
      )
  }

  // login usuario google
  googleLogin(token) {
    return this.http.post(`${this.backend_url}/login/google`, {token})
      .pipe(
        tap( (res: any) => {
          this.setearValoresLS(res.token, res.menu);
        })
      )
  }

  // solicita crear usuario en bd
  crearUsuario( formData: registerForm ) {
    
    // post request add user
    return this.http.post(`${this.backend_url}/usuarios`, formData, this.getHeaders)
      .pipe(
        tap( (res: any) => { 
          this.setearValoresLS(res.token, res.menu);
        })
      )
    }  

  // solicita actualizar usuario en bd 
  actualizarUsuario(formData: {nombre: string, email: string, role: string}) {
    formData = {
      ...formData, 
      role: this.usuario.getRole
    }
    const url = `${this.backend_url}/usuarios/${this.usuario.getUid}`;
    console.log(url)
    return this.http.put(url, formData, this.getHeaders)
      .pipe(
        tap((res:any) => {
          console.log(res)
          this.setearValoresLS(res.token, res.menu);
        })
      )
  }

  // carga registros en la vista
  cargarUsuarios(desde: number = 0) {
    const url = `${this.backend_url}/usuarios?desde=${desde}`;
    return this.http.get<cargarUsuario>(url, this.getHeaders)
      .pipe(
        // se realiza este procedimiento para que los registros obtengan los metodos del modelo Usuario
        map((res) => {
          let usuarios;
          usuarios = res.usuarios.map((u:any) => {
            const {nombre, email, google, img = '', role, uid} = u;
            return new Usuario(nombre, email, '' , google, img , role, uid);
          });
          res.usuarios = usuarios;
          return res;
        })
      );
  }

  // actualizarRole
  actualizarRole(usuario: Usuario ) {
    
    return this.http.put(`${this.backend_url}/usuarios/${usuario.getUid}`, usuario, this.getHeaders)
      .pipe(
        tap((res:any) => {
          this.setearValoresLS(res.token, res.menu);
        })
      )
  }

  // lanza el logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    // esto es de una libreria externa
    this.auth2.signOut().then(() => {
      
      // lo que hace es correr codigo de angular en zonas libres de angular
      this.ngZone.run(() => {
        return this.router.navigateByUrl('/auth/login');
      });
      
    });
  }

  // eliminar usuario 
  eliminarUsuario(uid: string) {
    const url = `${this.backend_url}/usuarios/${uid}`;
    return this.http.delete<{ok: boolean, msg: string}>(url, this.getHeaders)
      .pipe(
        catchError(err => Swal.fire('Error', err.msg, 'error'))
      );
  }
}
