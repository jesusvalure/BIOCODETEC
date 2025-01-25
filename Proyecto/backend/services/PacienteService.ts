// backend/src/services/PacienteService.ts

import { Paciente } from "../models/Paciente";
import * as fs from "fs/promises";
import * as path from "path";

const pacientesFilePath = path.join(__dirname, "../data/pacientes.json");

export class PacienteService {
  private pacientes: Paciente[] = [];

  constructor() {
    this.loadPacientes();
  }

  private async loadPacientes() {
    try {
      const data = await fs.readFile(pacientesFilePath, "utf-8");
      const pacientesRaw = JSON.parse(data);

      this.pacientes = pacientesRaw.map(
        (p: any) =>
          new Paciente(
            p.nombre,
            p.apellido1,
            p.apellido2,
            p.cedula,
            p.correo,
            p.edad,
            p.diagnostico
          )
      );
    } catch (error) {
      this.pacientes = [];
    }
  }

  private async savePacientes() {
    const pacientesPlain = this.pacientes.map((p) => ({
      nombre: p.getNombreCompleto(),
      cedula: p.getCedula(),
      correo: p.getCorreo(),
      edad: p.getEdad(),
      diagnostico: p.getDiagnostico(),
      historialMedico: p.obtenerHistorial(),
    }));

    await fs.writeFile(pacientesFilePath, JSON.stringify(pacientesPlain, null, 2));
  }

  public async agregarPaciente(paciente: Paciente): Promise<Paciente> {
    this.pacientes.push(paciente);
    await this.savePacientes();
    return paciente;
  }

  public async obtenerPacientes(): Promise<Paciente[]> {
    return this.pacientes;
  }
}
