import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from 'src/app/models/medicos.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(
    private fb: FormBuilder,
    private _HospitalService: HospitalService, 
    private _MedicoService: MedicoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required], 
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    // cada vez que se seleccione un id, el registro correspondiente a ese id se almacenara en hospitalSeleccionado
    this.medicoForm.get('hospital').valueChanges.subscribe(nuevoId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === nuevoId);
    });

    // esta instruccion se subscribe a los parametros que se pasar por url, notificando cuando cambian y poder realizar una accion cada que lo hagan
    this._activatedRoute.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    });
    
  }

  cargarMedico(id: string) {
    if(id === 'nuevo') {
      return;
    }

    this._MedicoService.getMedicoById(id) 
      .subscribe((medico: any) => {
        this.medicoSeleccionado = medico;
        const dataMedico = {
          'nombre': medico.getNombre,
          'hospital': medico.getHospital
        }
        // setear valores en un form reactivo
        this.medicoForm.setValue(dataMedico);

      }, error => {
        return this._router.navigateByUrl(`/dashboard/medicos`);
      });
  }
  cargarHospitales() {
    this._HospitalService.cargarHospitales(0, 'all')
    .subscribe((res: any) => this.hospitales = res.hospitales);
  }

  guardarMedico() {
    if(this.medicoSeleccionado) {
      // actualizar
      const dataMedico = {
        ...this.medicoForm.value,
        mid: this.medicoSeleccionado.getId
      }
      this._MedicoService.actualizarMedico(dataMedico)
        .subscribe((res: any) => Swal.fire('Actualizado', 'Se actualizo a: ' + res.medicoDB.nombre, 'success'));
    } else {
      // crear nuevo
      this._MedicoService.crearMedico(this.medicoForm.value) 
        .subscribe((res:any) => {
          Swal.fire('Medico creado',`Nuevo medico guardado: ${res.medicoDB.nombre}`, 'success');
  
          // redireccionar
          this._router.navigateByUrl(`/dashboard/medico/${res.medicoDB.mid}`);
        });
    }
    
  }
}
