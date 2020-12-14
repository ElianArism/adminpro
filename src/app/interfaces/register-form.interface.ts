
// Interfaz para el control de los campos al registrar usuario
export interface registerForm {
    nombre: string; 
    email: string;
    password: string;
    password2: string;
    terms: boolean;
}