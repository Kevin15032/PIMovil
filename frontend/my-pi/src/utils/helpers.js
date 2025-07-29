// Funciones auxiliares
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};
