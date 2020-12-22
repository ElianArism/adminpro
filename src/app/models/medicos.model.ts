import { HospitalUser } from './hospital.model';

interface _Usuario {
    _id: string;
    nombre: string;
    img: string; 
}

export class Medico {
    constructor(        
      private _nombre: string,
      private _id?: string,
      private _img?: string,
      private _usuario?: _Usuario,
      private _hospital?: HospitalUser
    ) {}

    
    get getNombre () {
        return this._nombre;
    }
    get getId () {
        return this._id;
    }
    get getImg () {
        return this._img;
    }
    get getUsuario () {
        return this._usuario;
    }
    get getHospital () {
        return this._hospital;
    }
}