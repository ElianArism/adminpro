import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent  {

  public imgUpload: File;
  public prevImg: any;

  constructor(public ModalService: ModalService, private FileUploadService: FileUploadService) { 
    
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

  cerrarModal() {
    this.prevImg = null;
    this.ModalService.cerrarModal();
  }

  
  // solicita subir img
  subirImg() {
    const id = this.ModalService.id; 
    const tipo = this.ModalService.tipo;
    this.FileUploadService
      .subirImagen(this.imgUpload, tipo, id)
      // cambiar img de usuario
      .then(img => {
        Swal.fire('Guardado', 'Imagen actualizada correctamente.', 'success');
        this.ModalService.nuevaImg.emit(img);
        this.cerrarModal();
      })
      .catch(err =>{
        console.log(err)
        Swal.fire('Error', 'No pudo subirse la img', 'error')
      });
    
  }



}
