import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://674ccaa154e1fca9290d911c.mockapi.io/api/v1/videoGallery'
});

// Función para obtener las cards
const getCards = async () => {
  try {
    const response = await Api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

// Función para agregar un nuevo video
const postCard = async (data) => {
  try {
    const response = await Api.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

// Función para actualizar las cards
const updateCard = async (id, updatedCard) => {
  try {
    await Api.put(`/${id}`, updatedCard);
    console.log(`Card with ID ${id} updated successfully.`);
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
};

// Función para eliminar una card
const deleteCard = async (id) => {
  try {
    await Api.delete(`/${id}`);
    console.log(`Card with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};

export { getCards, postCard, updateCard, deleteCard };
