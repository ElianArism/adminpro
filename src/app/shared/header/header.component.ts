import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public usuario: Usuario;  
  constructor(
    private UsuarioService: UsuarioService,
    private router: Router
     ) {
   this.usuario = this.UsuarioService.getUsuario;
  }

  buscar(termino: string) {
    if(termino.length < 1) {
      this.router.navigateByUrl(`/dashboard`);
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

  logout() {
    this.UsuarioService.logout();
  }
}
