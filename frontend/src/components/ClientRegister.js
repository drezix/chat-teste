import React, { useState } from 'react';
import { registerClient } from '../services/authService';

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    password: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerClient(formData);
      setMessage('Registro realizado com sucesso!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro no registro!');
    }
  };

  return (
    <div>
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
        <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
        <input type="text" name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ClientRegister;