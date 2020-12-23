import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from '../../services/busquedas/busqueda.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medicos.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _busquedaService: BusquedaService
    ) { }

  ngOnInit(): void {
    // subscribirse al cambio de parametros en la url
    this._activatedRoute.params.subscribe( ({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this._busquedaService.busquedaGlobal(termino).subscribe((res:any) => {
      console.log(res)
      let {medicos, usuarios, hospitales} = res.busqueda;
      medicos = medicos.map(m => new Medico(m.nombre, m.mid, m.img, m.usuario, m.hospital));
      usuarios = usuarios.map(u => new Usuario(u.nombre, u.email, '', u.google, u.img, u.role, u.uid));
      
      this.medicos = medicos; 
      this.usuarios = usuarios;
      this.hospitales = hospitales;
    });
  
  } 
  
  medico(m) {
    console.log(m)
  }
}
