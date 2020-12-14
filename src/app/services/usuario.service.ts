import { Injectable, NgZone } from '@angular/core';

// libreria de angular para manejar peticiones http
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment'; // entorno desarrollo
import { registerForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';

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
  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone) { 
    this.googleInit();
  }

  get getAuth() {
    return this.auth2;
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
  // solicita crear usuario en bd
  crearUsuario( formData: registerForm ) {
    
    // post request add user
    return this.http.post(`${this.backend_url}/usuarios`, formData)
      .pipe(
        tap( (res: any) => {
          // setear token en ls
          localStorage.setItem('token', res.token);
        })
      )
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

  // validar token 
  validarToken(): Observable<boolean> { 
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.backend_url}/login/renovar-token`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res:any) => {
        // renovar token en ls
        localStorage.setItem('token', res.token);
      }),
      map( 
        // si llega aca el token es valido, y retorna true
        res => true
      ), 
      catchError(
        // si llega aca el token es invalido, y retorna false
        err => of(false) // crea un observable con el valor false
      )
    );
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
