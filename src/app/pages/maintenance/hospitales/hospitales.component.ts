import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedaService } from '../../../services/busquedas/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public totalHospitales: number;
  public cargando: boolean = true;
  public desde: number = 0;
  public modoBusqueda: boolean;
  private imgSubs: Subscription;

  constructor(
    private _HospitalService: HospitalService,
    private _ModalService: ModalService,
    private _BusquedaService: BusquedaService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modoBusqueda = false;
    this.imgSubs = this._ModalService.nuevaImg.pipe(delay(200)).subscribe(img => this.cargarHospitales());
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  cargarHospitales() {
    this.cargando = true;

    this._HospitalService.cargarHospitales(this.desde)
      .subscribe(res => {
        this.cargando = false;
        this.hospitales = res.hospitales;
        this.totalHospitales = res.totalHospitales;
      });
  }

  // cargar datos para un nuevo hospital
  async abrirSweetAlertModal() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear Hospital',
      inputLabel: 'Ingrese el nombre del hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital', 
      showCancelButton: true
    })

    if (value.trim().length > 0) { //trim elimina espacios en blanco
      this.crearHospital(value);
    }
  }

  crearHospital(nombre: string) {
    if(nombre === '') {
      return Swal.fire('Error', 'No se puede crear un Hospital sin nombre', 'error');
    }

    this._HospitalService.crearHospital(nombre)
      .subscribe((res:any) => {
        this.hospitales = [res.hospitalDB, ...this.hospitales];
        Swal.fire('Hospital creado', '', 'success');
      });
  }


  guardarCambios(hospital: Hospital) {
    const { _id, nombre } = hospital;
    this._HospitalService.actualizarHospital(_id, nombre)
      .subscribe(res => {
        Swal.fire('Hospital Actualizado', nombre, 'success');
      })
  }

  borrarHospital(hospital: Hospital) {
    const { _id, nombre} = hospital;

    this._HospitalService.borrarHospital(_id)
      .subscribe(res => {
        this.cargarHospitales();
        Swal.fire('Hospital Eliminado', nombre, 'success');
      })
  }


  // carga de imagenes 
  abrirModal(hospital: Hospital) {
    const { _id, img = 'no-img' } = hospital;
    this._ModalService.abrirModal(_id, 'hospitales', img);
  }

  // busqueda de hospitales
  buscarHospitales(termino: string) {
    this.desde = 0;
  
    if(termino.length > 0) {
      this.cargando = true;

      this._BusquedaService.buscar('hospitales', termino)
        .subscribe((res: any[]) => {
          this.cargando = false;
          this.hospitales = res;
          this.totalHospitales = res.length;
          this.modoBusqueda = true;
        });
    } else {
      this.cargarHospitales();
      this.modoBusqueda = false;
    }
  }

  // paginacion
  cambiarPagina(valor:number) {
    this.desde += valor;
    if(this.desde < 0) this.desde = 0;
    else if(this.desde >= this.totalHospitales) this.desde -= valor;
    
    this.hospitales = [];
    this.cargarHospitales();
  }
}
