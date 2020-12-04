import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// En los servicios se encuentra logica general y que puede usarse en multiples componentes
// (se usa este servicio en pages y account-settings) 
// La idea de los servicios es reservar logica mas general en ellos para que nuestros componentes se vean mas limpios y
// se encargen de funcionalidades especificas
export class SettingsService {
  // accediendo a un elemento del index.html
  private linkTheme: Element = document.querySelector('#theme');
  
  constructor() { 
    const url: string = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string, e, selectores) {
    const url: string = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    
    // guardar la referencia en el localStorage para  el uso de pages component
    localStorage.setItem('theme', url);

    // guardar la referencia en el localStorage para  el uso de la class working
    localStorage.setItem('working', e.target.dataset.number);

    // agregar Check 
    this.addCheck(theme, selectores);
  
  }

  addCheck(theme: string = null, selectores) {
    const value = theme || localStorage.getItem('working');
    let param = '';
    (theme) ? param = 'data-theme': param = 'data-number';

    
    for (let i = 0; i < selectores.length; i++) {
      if(value === selectores[i].getAttribute(param)) {
        selectores[i].classList.add('working');
      } else {
        selectores[i].classList.remove('working');
      }
    }
  }
}
