export const BASE_URL = 'https://nodejs-test-tfzg.onrender.com/api/empleados';

async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const message =
        data?.message || data?.error || 'Ocurrio un error al consumir la API';
      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexion');
  }
}

function normalizeListResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function normalizeEmployeeResponse(data) {
  if (data?.data && !Array.isArray(data.data)) {
    return data.data;
  }

  return data;
}

export async function getEmployees() {
  const data = await request(BASE_URL);
  return normalizeListResponse(data);
}

export async function getEmployeeById(id) {
  const data = await request(`${BASE_URL}/${id}`);
  return normalizeEmployeeResponse(data);
}

export async function createEmployee(employee) {
  const data = await request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(employee),
  });

  return normalizeEmployeeResponse(data);
}

export async function updateEmployee(id, employee) {
  const data = await request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  });

  return normalizeEmployeeResponse(data);
}

export async function deleteEmployee(id) {
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
