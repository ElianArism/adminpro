import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public formActualizar: FormGroup
  public usuario = this.UsuarioService.getUsuario;
  public imgUpload: File;
  public prevImg: any;

  constructor(
    private fb: FormBuilder,
    private UsuarioService:UsuarioService,
    private FileUploadService: FileUploadService
  ) { }
  
  ngOnInit(): void {
    this.formActualizar = this.fb.group({
      nombre: [this.usuario.getNombre, [Validators.required]],
      email: [this.usuario.getEmail, [Validators.required, Validators.email]]
    });
  }

  actualizarUsuario() {
    this.UsuarioService.actualizarUsuario(this.formActualizar.value)
    // cambiar datos de usuario
      .subscribe((res:any) => {
        const {nombre, email} = res.usuarioActualizado; 
        this.usuario.setNombre = nombre;
        this.usuario.setEmail = email;

        Swal.fire('Guardado', 'Tus datos fueron actualizados.', 'success');
      }, (err) => {
        Swal.fire('Error', 'ocurrio un error', 'error')
      });
  }

  // registra una imagen que el usuario preparo para subir en el input
  cambiarImg(file: File) {
    this.imgUpload = file;

    // cambiar vista previa
    if(!file) {
      return this.prevImg = null;
    }; 

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.prevImg = reader.result;
    }
  }

  // solicita subir img
  subirImg() {
    this.FileUploadService
      .subirImagen(this.imgUpload, 'usuarios', this.usuario.getUid)
      // cambiar img de usuario
      .then(img =>{
        this.usuario.setImg = img
        Swal.fire('Guardado', 'Imagen actualizada correctamente.', 'success');
      })
      .catch(err =>{
        console.log(err)
        Swal.fire('Error', 'No pudo subirse la img', 'error')
      });
    
  }

}
