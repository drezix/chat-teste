import api from './api';

export const insertProcess = async (processData) => {
  const response = await api.post('/process/insert', processData);
  return response.data;
};

export const getProcess = async (id) => {
  const response = await api.get(`/process/get/${id}`);
  return response.data;
};

export const deleteProcess = async (id) => {
  const response = await api.delete(`/process/delete/${id}`);
  return response.data;
};