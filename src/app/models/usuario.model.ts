import { environment } from "../../environments/environment";

const base_url = environment.backend_url;

// modelo de usuario
export class Usuario {
    // ?: hace referencia a propiedad opcional
    constructor(
        private nombre: string,
        private email: string,
        private password?: string,
        private google?: string,
        private img?: any,
        private role?: string,
        private uid?: string
    ) {}

    get getImagenUrl() {
        // si es de google 
        if (this.img.includes('https')) {
            return this.img;
        }
        // si no

        if(this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-img`;;
        }
    }

    get getNombre() {
        return this.nombre;
    }

    set setNombre(nombre) {
        this.nombre = nombre;
    }
    get getEmail() {
        return this.email;
    }

    set setEmail(email) {
        this.email = email;
    }

    set setImg(img) {
        this.img = img;
    }
    
    get getUid() {
        return this.uid;
    }
    
    get getRole() {
        return this.role;
    }
    get getGoogle() {
        return this.google;
    }
}