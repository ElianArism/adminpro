import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public backend_url = environment.backend_url;
  constructor() { }

  async subirImagen(
    file: File,
    tipo: 'usuarios'|'medicos'|'hospitales', // or
    id: string
  ) {

    try {
      const url = `${this.backend_url}/upload/${tipo}/${id}`;  

      // creando el body de la peticion, FormData permite crear un una serie de conjuntos llave/valor segun necesitemos
      const formData = new FormData();
      formData.append('img', file);

      // enviando peticion para subir archivo
      const res = await fetch(
        url, 
        {
          method:'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        }
      )
      
      const data = await res.json();
      
      if(data.ok) {
        return  data.fileName;
      } else {
        console.log(data.msg);
        return false;   
      }
     
    } catch (error) {
      console.log(error);
      return false;
    }
  }


}
