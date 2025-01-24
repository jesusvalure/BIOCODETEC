// src/models/Recepcionista.ts
import { Usuario } from "./Usuario";

export class Recepcionista extends Usuario {
  programarCita(pacienteId: string, fecha: Date): string {
    return `Cita programada para el paciente ${pacienteId} el ${fecha.toISOString()}`;
  }

  cancelarCita(pacienteId: string): string {
    return `Cita del paciente ${pacienteId} cancelada.`;
  }
}
