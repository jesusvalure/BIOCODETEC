// src/services/api.js
export const getPacientes = async () => {
    try {
      const response = await fetch('/data/pacientes.json'); // Asegúrate de que el archivo JSON esté en src/data
      if (!response.ok) {
        throw new Error('Error al cargar los pacientes');
      }
      const pacientes = await response.json();
      return pacientes;
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
      return [];
    }
  };
  
  export const agregarDiagnostico = async (cedula, diagnostico) => {
    try {
      // En un entorno real, enviarías esta actualización a tu backend.
      console.log(`Agregar diagnóstico: ${diagnostico} para la cédula: ${cedula}`);
      // Aquí puedes añadir lógica adicional para actualizar localmente los datos.
    } catch (error) {
      console.error('Error al agregar el diagnóstico:', error);
    }
  };
  