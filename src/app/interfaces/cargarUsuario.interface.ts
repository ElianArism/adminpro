
import { Usuario } from '../models/usuario.model';

// interfaz para el get de todos los usuarios 

export interface cargarUsuario {
    total: number; 
    usuarios: Usuario[]
}