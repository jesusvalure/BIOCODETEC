// Usuario.jsx
export class Usuario {
  constructor(nombre, cedula, celular, correo, usuario, contrasena, tipo) {
    this.nombre = nombre;
    this.cedula = cedula;
    this.celular = celular;
    this.correo = correo;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.tipo = tipo; // 1: Paciente, 2: Doctor, 3: Recepcionista, 4: Admin
  }
}

export class Paciente extends Usuario {
  constructor(
    nombre,
    cedula,
    celular,
    correo,
    usuario,
    contrasena,
    edad,
    peso,
    estatura,
    padecimientos
  ) {
    super(nombre, cedula, celular, correo, usuario, contrasena, 1); // Tipo 1: Paciente
    this.edad = edad;
    this.peso = peso;
    this.estatura = estatura;
    this.padecimientos = padecimientos; // Array de padecimientos
  }
}

export class Doctor extends Usuario {
  constructor(
    nombre,
    cedula,
    celular,
    correo,
    usuario,
    contrasena,
    especialidad,
    diasLaborales,
    horario
  ) {
    super(nombre, cedula, celular, correo, usuario, contrasena, 2); // Tipo 2: Doctor
    this.especialidad = especialidad;
    this.diasLaborales = diasLaborales; // Array de días laborales (0 o 1)
    this.horario = horario; // Matriz con horarios
  }
}

export class Recepcionista extends Usuario {
  constructor(nombre, cedula, celular, correo, usuario, contrasena) {
    super(nombre, cedula, celular, correo, usuario, contrasena, 3); // Tipo 3: Recepcionista
  }
}

export class Administrador extends Usuario {
  constructor(nombre, cedula, celular, correo, usuario, contrasena) {
    super(nombre, cedula, celular, correo, usuario, contrasena, 4); // Tipo 4: Admin
  }
}
