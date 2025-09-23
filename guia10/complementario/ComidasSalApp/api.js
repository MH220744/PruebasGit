import axios from 'axios';

const API_URL = 'https://68d1d99ee6c0cbeb39a5f28b.mockapi.io/recetas';

export const getRecetas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    return [];
  }
};
