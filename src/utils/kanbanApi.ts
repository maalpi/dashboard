import axios from 'axios';

// Função para salvar tabela no Firestore
export const saveKanbanTable = async (name, imageUrl) => {
  try {
    const response = await axios.post('/api/kanban', { name, imageUrl });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar a tabela:', error);
    throw new Error(error.response?.data?.message || 'Erro desconhecido');
  }
};
