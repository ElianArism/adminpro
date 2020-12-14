import { Component } from '@angular/core';

// sweetAlert2
import Swal from 'sweetalert2';

// validators es un paquete de validaciones   
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  // crea formulario de registro
  public registerForm = this.fb.group({
    // el primer valor son valores por def
    nombre: ['Elian', [Validators.required]], 
    email: ['Elian@ecom.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required, ]],
    passwordRepeat: ['12345', [Validators.required]],
    terms: [false , [Validators.requiredTrue]],
  }, {
    // creando una validacion personalizada
    validators: this.validarPasswords('password', 'passwordRepeat')
  }); 
  
  public isSubmitted; // flag para alertas
  constructor(
    public fb: FormBuilder, // formBuilder para crear el formulario
    private usuarioService: UsuarioService,
    private router: Router
    ) 
  {}

  crearNuevoUsuario() {
    this.isSubmitted = true; 
    
    if(this.registerForm.invalid) {
      return console.log('Form invalid');
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( (res) =>  {
          //si se registra navega al login 
          this.router.navigateByUrl('/auth/login');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        } 
      );

  }

  validarCampos(campo: string ): boolean { 
    // si el formulario intento ser enviado y el campo es invalido
    return (this.isSubmitted && this.registerForm.get(campo).invalid) ? true : false;
  }

  validarTerminos(): boolean {
    return (this.isSubmitted === !this.registerForm.get('terms').value) ? true : false;
  }

  passwordEsValida() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('passwordRepeat').value;

    return ((pass1 !== pass2) && this.isSubmitted) ? true : false;
  }

  validarPasswords(password: string, repeticion: string) {
    // retornando una funcion para que la interprete el validador
    return (formGroup: FormGroup) => {
      const password = formGroup.get('password');
      const passwordRepeat = formGroup.get('passwordRepeat');
      // si las passwords son distintas
      if(password.value !== passwordRepeat.value) {
        passwordRepeat.setErrors({coinciden: false});
      } 
      // si coinciden 
      else {
        passwordRepeat.setErrors(null);
      }

    }
  }
}
