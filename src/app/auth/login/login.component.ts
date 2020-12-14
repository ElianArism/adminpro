import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
    rememberUser: [JSON.parse(localStorage.getItem('remember')) || false] //checkbox para recordar o no user
  }); 

  private auth2: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private UsuarioService: UsuarioService,
    private ngZone: NgZone
  ) {  }

  ngOnInit() {
    this.renderButton();
  }  

  login() {
    // http request login 
    this.UsuarioService.login( this.loginForm.value )
      .subscribe(res => {
        // si rememberUser = true, graba en ls el email
        if(this.loginForm.get('rememberUser').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('email');
        }
        
        //si esta autenticado navega al dashboard 
        this.router.navigateByUrl('/dashboard')
          
      }, err => {
        let msg;
        if(err.error.errors.password) {
          msg = err.error.errors.password.msg 
        } else if (err.error.errors.email) {
          msg = err.error.errors.email.msg 
        } else {
          msg = err.error.msg;
        }
        Swal.fire('Error', msg, 'error');
      });

    
  }

  // metodos para google sign in 
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {
    await this.UsuarioService.googleInit();
    this.auth2 = this.UsuarioService.getAuth;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.UsuarioService.googleLogin(id_token)
            .subscribe(res => {
              this.ngZone.run(() => {
                //si esta autenticado navega al dashboard 
                this.router.navigateByUrl('/dashboard')
              });
            });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
