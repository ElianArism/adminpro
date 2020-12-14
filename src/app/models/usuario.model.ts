// modelo de usuario
export class Usuario {
    // ?: hace referencia a propiedad opcional
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: string,
        public img?: string,
        public role?: string,
        public uid?: string
    ) {}
}