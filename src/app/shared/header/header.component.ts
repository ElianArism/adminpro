import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public usuario: Usuario;  
  constructor(private UsuarioService: UsuarioService, private ModalService: ModalService) {
   this.usuario = this.UsuarioService.getUsuario;
  }

  logout() {
    this.UsuarioService.logout();
  }
}
