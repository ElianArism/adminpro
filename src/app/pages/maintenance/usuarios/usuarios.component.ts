import { Component, ElementRef, ViewChild } from '@angular/core'; //rendered2 es la forma de manipular un elemento del dom de forma segura (http://blog.enriqueoriol.com/2017/08/angular-dom-renderer.html)

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuariosService } from 'src/app/services/busquedas/usuarios.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalService } from '../../../services/modal.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent {
  // @ViewChild('terminoInput') terminoInput: ElementRef; //seleccionando un elemento del dom en angular
  // this.terminoInput.nativeElement.value = ''; bad practice 

  public totalUsuarios: number = 0; 
  public desde: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public cargandoFlag: boolean = true;
  public isSearching: boolean;
  constructor(private UsuarioService: UsuarioService, private busquedaUsuarios: UsuariosService, public ModalService:ModalService) {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.UsuarioService.cargarUsuarios(this.desde)
      .subscribe((res) => {
        const {total, usuarios} = res;
        this.totalUsuarios = total; 
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargandoFlag = false;
      });
  }

  cambiarPagina(valor:number) {
    this.desde += valor;
    if(this.desde < 0) this.desde = 0;
    else if(this.desde >= this.totalUsuarios) this.desde -= valor;
    
    this.usuarios = [];
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    this.isSearching = true;
    if(termino.length === 0) {
      this.isSearching = false;
      this.usuarios = this.usuariosTemp;
    } else {
      this.busquedaUsuarios.buscar('usuarios', termino)
        .subscribe(res => {
          // al buscar la tabla con los usuarios se llena de la busqueda
          this.usuarios = res;
        });   
    }

  }

  eliminarUsuario(u:Usuario) {
    // no deberia poderse eliminar a uno mismo, aca se valida eso.
    if(u.getUid === this.UsuarioService.getUsuario.getUid) {
      return Swal.fire('Error', 'No puede borrarse a uno mismo', 'error')
    }
    // el prompt de sweetalert2 retorna una promesa 
    Swal.fire({
      title: 'Borrar usuario?', 
      text: `Esta por eliminar a ${u.getNombre}`,
      icon: 'question',
      showCancelButton: true, 
      confirmButtonText: 'Si, borrarlo',
      confirmButtonColor: 'success'
    })
    .then(res => {

      // si el usuario acepta el prompt
      if(res.value) {
        this.UsuarioService.eliminarUsuario(u.getUid)
          .subscribe((res:any) => {
            Swal.fire('Usuario Eliminado', res.msg, 'success');
            this.cargarUsuarios();
        });
      } 

    });
  }
  

  cambiarRole(u: Usuario, uRole: 'USER_ROLE'| 'ADMIN_ROLE') {
    u.setRole = uRole;

    this.UsuarioService.actualizarRole(u)
      .subscribe(res => {
        console.log(res);
        this.cargarUsuarios();
      });
  }

}
