// src/models/Doctor.ts
import { Usuario } from "./Usuario";

export class Doctor extends Usuario {
  private horario: Date;
  private disponibilidad: boolean;

  constructor(
    nombre: string,
    apellido1: string,
    apellido2: string,
    cedula: string,
    correo: string,
    horario: Date,
    disponibilidad: boolean
  ) {
    super(nombre, apellido1, apellido2, cedula, correo);
    this.horario = horario;
    this.disponibilidad = disponibilidad;
  }

  registrarDiagnostico(pacienteId: string, diagnostico: string): string {
    return `El diagnóstico para el paciente ${pacienteId} es: ${diagnostico}`;
  }

  verificarDisponibilidad(): boolean {
    return this.disponibilidad;
  }
}
