import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import { createEmployee } from '../services/api';

export default function CreateEmployeeScreen({ navigation }) {
  async function handleCreate(employee) {
    await createEmployee(employee);

    navigation.navigate('Lista', {
      message: 'Empleado creado correctamente',
    });
  }

  return <EmployeeForm buttonText="Guardar empleado" onSubmit={handleCreate} />;
}
