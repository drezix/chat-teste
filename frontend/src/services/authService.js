import api from './api';

export const loginClient = async (cpf, password) => {
  const response = await api.post('/client/login', { cpf, password });
  const { token, client } = response.data;
  localStorage.setItem('token', token);
  return client;
};

export const registerClient = async (clientData) => {
  const response = await api.post('/client/register', clientData);
  return response.data;
};

export const loginLawyer = async (oab, password) => {
  const response = await api.post('/lawyer/login', { oab, password });
  const { token, lawyer } = response.data;
  localStorage.setItem('token', token);
  return lawyer;
};

export const registerLawyer = async (lawyerData) => {
  const response = await api.post('/lawyer/register', lawyerData);
  return response.data;
};