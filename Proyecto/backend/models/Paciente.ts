    import { Usuario } from "./Usuario";

export class Paciente extends Usuario {
  private historialMedico: string[] = []; // Notas o eventos médicos específicos

  constructor(
    nombre: string,
    apellido1: string,
    apellido2: string,
    cedula: string,
    correo: string,
    private edad: number, // Atributo específico de Paciente
    private diagnostico: string // Diagnóstico actual del paciente
  ) {
    super(nombre, apellido1, apellido2, cedula, correo);
  }

  // Métodos específicos del paciente
  agregarHistorial(nota: string): void {
    this.historialMedico.push(nota);
  }

  obtenerHistorial(): string[] {
    return this.historialMedico;
  }

  getEdad(): number {
    return this.edad;
  }

  getDiagnostico(): string {
    return this.diagnostico;
  }

  setDiagnostico(nuevoDiagnostico: string): void {
    this.diagnostico = nuevoDiagnostico;
  }
}
