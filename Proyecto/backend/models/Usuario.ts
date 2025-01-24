
export class Usuario {
    constructor(
      protected nombre: string,
      protected apellido1: string,
      protected apellido2: string,
      protected cedula: string,
      protected correo: string
    ) {}
  
    // Getters
    getNombreCompleto(): string {
      return `${this.nombre} ${this.apellido1} ${this.apellido2}`;
    }
  
    getCedula(): string {
      return this.cedula;
    }
  
    getCorreo(): string {
      return this.correo;
    }
  
    // Setters
    setCorreo(nuevoCorreo: string): void {
      this.correo = nuevoCorreo;
    }
  }
  