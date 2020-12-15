import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public menu: any;
  public usuario: Usuario;
  constructor(private SidebarService: SidebarService, private UsuarioService: UsuarioService) {
    this.menu = this.SidebarService.getMenu;
    this.usuario = this.UsuarioService.getUsuario;
    
  }


  ngOnInit(): void {}

}
