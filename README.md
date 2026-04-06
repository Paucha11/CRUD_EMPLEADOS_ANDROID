# CRUD de Empleados con React Native y Expo

Proyecto base creado desde cero para replicar el ejemplo del profesor. La app consume esta API REST:

`https://nodejs-test-tfzg.onrender.com/api/empleados`

## Funcionalidades

- Listar empleados
- Crear empleado
- Editar empleado
- Eliminar empleado
- Mostrar mensajes de exito o error

## Estructura

- `App.js`: navegacion principal
- `src/screens/EmployeeListScreen.js`: lista y eliminacion
- `src/screens/CreateEmployeeScreen.js`: creacion
- `src/screens/EditEmployeeScreen.js`: edicion
- `src/components/EmployeeForm.js`: formulario reutilizable
- `src/components/EmployeeItem.js`: tarjeta por empleado
- `src/components/MessageBox.js`: mensajes visuales
- `src/services/api.js`: comunicacion con la API

## Como ejecutar

1. Instala Node.js si aun no lo tienes.
2. Instala Expo CLI si te hace falta.
3. Ejecuta:

```bash
npm install
npm start
```

4. Abre el proyecto en:

- Expo Go en tu celular o tablet 
- un emulador Android
- o navegador web para revisar la interfaz

## Pruebas en Postman

Base URL:

`https://nodejs-test-tfzg.onrender.com/api/empleados`

### Consultar lista

- Metodo: `GET`
- URL: `https://nodejs-test-tfzg.onrender.com/api/empleados`

### Consultar por id

- Metodo: `GET`
- URL: `https://nodejs-test-tfzg.onrender.com/api/empleados/emp-demo-1`

### Crear empleado

- Metodo: `POST`
- Header: `Content-Type: application/json`
- Body raw JSON:

```json
{
  "name": "Laura Perez",
  "position": "Analista",
  "office": "Cali",
  "salary": 3800
}
```

### Actualizar empleado

- Metodo: `PUT`
- Header: `Content-Type: application/json`
- URL: `https://nodejs-test-tfzg.onrender.com/api/empleados/emp-demo-1`
- Body raw JSON:

```json
{
  "name": "Ana Gomez",
  "position": "Lider Tecnica",
  "office": "Bogota",
  "salary": 5000
}
```

### Eliminar empleado

- Metodo: `DELETE`
- URL: `https://nodejs-test-tfzg.onrender.com/api/empleados/emp-demo-1`
