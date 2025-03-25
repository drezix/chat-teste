import React, { useState } from 'react';
import { loginClient, loginLawyer } from '../services/authService';

const Login = () => {
  const [cpfOab, setCpfOab] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (userType === 'client') {
        await loginClient(cpfOab, password);
      } else {
        await loginLawyer(cpfOab, password);
      }
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div className="container">
      <h2>Login - {userType === 'client' ? 'Cliente' : 'Advogado'}</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>{userType === 'client' ? 'CPF' : 'OAB'}:</label>
          <input 
            type="text" 
            value={cpfOab} 
            onChange={(e) => setCpfOab(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button onClick={() => setUserType(userType === 'client' ? 'lawyer' : 'client')}>
        Trocar para {userType === 'client' ? 'Advogado' : 'Cliente'}
      </button>
    </div>
  );
};

export default Login;
