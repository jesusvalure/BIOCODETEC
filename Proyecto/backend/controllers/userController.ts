// backend/src/controllers/PacienteController.ts

import { Request, Response } from "express";
import { PacienteService } from "../services/PacienteService.ts";
import { Paciente } from "../models/Paciente";

const pacienteService = new PacienteService();

export class PacienteController {
  public static async registrarPaciente(req: Request, res: Response): Promise<void> {
    try {
      const {
        nombre,
        apellido1,
        apellido2,
        cedula,
        correo,
        edad,
        diagnostico,
      } = req.body;

      const nuevoPaciente = new Paciente(
        nombre,
        apellido1,
        apellido2,
        cedula,
        correo,
        edad,
        diagnostico
      );

      const paciente = await pacienteService.agregarPaciente(nuevoPaciente);
      res.status(201).json(paciente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al registrar el paciente." });
    }
  }
}
