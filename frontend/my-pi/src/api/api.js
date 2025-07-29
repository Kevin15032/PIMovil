import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
});

// Función para login de usuario
export const loginUsuario = async (data) => {
  // El endpoint correcto según backend es /usuarios/login
  return await API.post('/usuarios/login', data);
};

// Puedes agregar aquí otras funciones como registrarUsuario, etc.

export default API;
