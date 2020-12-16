import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent {
  public imgUpload: File;
  public prevImg: any;
  constructor(public ModalService: ModalService, private FileUploadService: FileUploadService) { }

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

  cerrarModal() {
    this.prevImg = null;
    this.ModalService.cerrarModal();
  }

  
   // solicita subir img
   subirImg() {
    this.FileUploadService
      .subirImagen(this.imgUpload, 'usuarios', this.ModalService.getUsuario.getUid)

      // cambiar img de usuario
      .then(img => {
        this.ModalService.getUsuario.setImg = img
        Swal.fire('Guardado', 'Imagen actualizada correctamente.', 'success');
      })
      .catch(err =>{
        console.log(err)
        Swal.fire('Error', 'No pudo subirse la img', 'error')
      });

      this.cerrarModal();
  }



}
