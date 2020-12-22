import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const backend_url = environment.backend_url;

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    
    if(!img) {
        return `${backend_url}/upload/${tipo}/no-img`;
    }

    // si es de google 
    else if (img.includes('https')) {
        return img;
    }

    // si no
    else if(img) {
        return `${backend_url}/upload/${tipo}/${img}`;
    } else {
        return `${backend_url}/upload/${tipo}/no-img`;
    }
  
  }

}
