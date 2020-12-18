import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { ModalService } from '../../services/modal.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  public menuList: any;
  public usuario: Usuario;
  constructor(private SidebarService: SidebarService, private UsuarioService: UsuarioService, private ModalService: ModalService) {
    this.menuList = this.SidebarService.getMenu;
    this.usuario = this.UsuarioService.getUsuario;    
  }



 

}
