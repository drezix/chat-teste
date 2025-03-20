import React, { useState } from 'react';
import { registerLawyer } from '../services/authService';

const LawyerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    oab: '',
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
      await registerLawyer(formData);
      setMessage('Registro realizado com sucesso!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro no registro!');
    }
  };

  return (
    <div>
      <h2>Registro de Advogado</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
        <input type="text" name="oab" placeholder="OAB" value={formData.oab} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LawyerRegister;