import React, { useState } from 'react';
import { registerLawyer } from '../services/authService';

const LawyerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    oab: '',
    email: '',
    telefone: '',
    password: ''
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
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro no registro!');
    }
  };

  return (
    <div className="container">
      <h2>Registrar Advogado</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>OAB:</label>
          <input 
            type="text" 
            name="oab" 
            value={formData.oab} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input 
            type="text" 
            name="telefone" 
            value={formData.telefone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default LawyerRegister;
