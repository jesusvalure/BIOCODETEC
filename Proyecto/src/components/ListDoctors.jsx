import React from "react";

const ListDoctors = () => {
  const doctors = [
    { name: "Juan Pérez", specialty: "Cardiólogo" },
    { name: "María Gómez", specialty: "Pediatra" },
    { name: "Carlos López", specialty: "Dermatólogo" },
  ];

  // Función para manejar el clic en "Citas"
  const handleAppointments = (doctor) => {
    console.log('Citas '+ doctor.name)
    //setActiveTab('appointments', doctor);
  };

  // Función para manejar el clic en "Días Laborales"
  const handleWorkDays = (doctor) => {
    console.log('Dias laborales '+ doctor.name)
    //setActiveTab('work days', doctor); 
  };
  
  return (
    <div>
      <table className="table" >
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Especialidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
        {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button
                  className="nav-link"
                  onClick={() => handleAppointments(doctor)}
                >
                  Citas
                </button>
                <button
                  className="nav-link"
                  onClick={() => handleWorkDays(doctor)}
                >
                  Días Laborales
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDoctors;
