import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedaService } from '../../../services/busquedas/busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[];
  public totalMedicos: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;
  private imgSubs: Subscription;
  public modoBusqueda: boolean = false;
  constructor(
    private _MedicoService: MedicoService,
    private _ModalService: ModalService, 
    private _BusquedaService: BusquedaService 
    
    ) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this._ModalService.nuevaImg.pipe(delay(200)).subscribe(img => this.cargarMedicos());
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this._MedicoService.cargarMedicos(this.desde).subscribe(res => {
      this.medicos = res.medicos;
      this.totalMedicos = res.totalMedicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar Medico?',
      text: `Esta a punto de borrar a: ${medico.getNombre}`,
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    })
    
    .then(res => {
      
      if(res.value) {
        this._MedicoService.borrarMedico(medico)
          .subscribe(res => {
            this.cargarMedicos();
            Swal.fire('Usuario borrado', medico.getNombre, 'success');
          });
      
      }

    }).catch(err => {console.log(err); Swal.fire('No pudo borrarse el medico', err, 'error')});
    
  }
    
  // carga de imagenes 
  abrirModal(medico: Medico) {
    this._ModalService.abrirModal(medico.getId, 'medicos', medico.getImg);
  }

  // busqueda de medicos
  buscarMedicos(termino: string) {
    if(termino.length > 0) {
      this.modoBusqueda = true;
      this._BusquedaService.buscar('medicos', termino)
        .subscribe(res => {
          this.medicos = res;
        });

    } else {
      this.modoBusqueda = false;
      this.cargarMedicos();
    }
  }

  // paginacion
  cambiarPagina(valor:number) {
    this.desde += valor;
    if(this.desde < 0) this.desde = 0;
    else if(this.desde >= this.totalMedicos) this.desde -= valor;
    
    this.medicos = [];
    this.cargarMedicos();
  }


}
