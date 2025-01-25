// src/models/Admin.ts
import { Usuario } from "./Usuario";

export class Admin extends Usuario {
  gestionarUsuarios(): string {
    return "Gestión de usuarios completada.";
  }
}
