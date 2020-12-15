import { Injectable, NgZone } from '@angular/core';

// libreria de angular para manejar peticiones http
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment'; // entorno desarrollo
import { registerForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';

// rxjs 
// tap lo que hace es disparar una funcion cada que se ejecuta
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private backend_url: string = environment.backend_url;
  private auth2: any;
  private usuario: Usuario;
  
  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone) { 
    this.googleInit();
  }

  get getUsuario() {
    return this.usuario;
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
        
        // renovar token en ls
        localStorage.setItem('token', res.token);
        
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
          // setear token en ls
          localStorage.setItem('token', res.token);
        })
      )
  }

  // login usuario google
  googleLogin(token) {
    return this.http.post(`${this.backend_url}/login/google`, {token})
      .pipe(
        tap( (res: any) => {
          // setear token en ls
          localStorage.setItem('token', res.token);
        })
      )
  }

  // solicita crear usuario en bd
  crearUsuario( formData: registerForm ) {
    
    // post request add user
    return this.http.post(`${this.backend_url}/usuarios`, formData, this.getHeaders)
      .pipe(
        tap( (res: any) => {
          // setear token en ls
          localStorage.setItem('token', res.token);
        })
      )
  }

  // solicita actualizar usuario en bd 
  actualizarUsuario(formData: {nombre: string, email: string, role: string}) {
    formData = {
      ...formData, 
      role: this.usuario.getRole
    }
    return this.http.put(`${this.backend_url}/usuarios/${this.usuario.getUid}`, formData, this.getHeaders)
      .pipe(
        tap((res:any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }

  logout() {
    localStorage.removeItem('token');

    // esto es de una libreria externa
    this.auth2.signOut().then(() => {
      
      // lo que hace es correr codigo de angular en zonas libres de angular
      this.ngZone.run(() => {
        return this.router.navigateByUrl('/auth/login');
      });
      
    });
  
  }
}
