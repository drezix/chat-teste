import api from './api';

export const insertProcess = async (processData) => {
  const response = await api.post('/process/insert', processData);
  return response.data;
};

export const getProcess = async (processNumber) => {
  const response = await api.get(`/process/get/${processNumber}`);
  return response.data;
};

export const deleteProcess = async (processNumber) => {
  const response = await api.delete(`/process/delete/${processNumber}`);
  return response.data;
};