import React, { useState } from 'react';
import { loginClient, loginLawyer } from '../services/authService';

const Login = () => {
  const [cpfOab, setCpfOab] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client'); // 'client' ou 'lawyer'
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (userType === 'client') {
        await loginClient(cpfOab, password);
      } else {
        await loginLawyer(cpfOab, password);
      }
      // Após o login, redirecione para a área de dashboard ou home
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div>
      <h2>Login - {userType === 'client' ? 'Cliente' : 'Advogado'}</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>{userType === 'client' ? 'CPF' : 'OAB'}:</label>
          <input 
            type="text" 
            value={cpfOab} 
            onChange={(e) => setCpfOab(e.target.value)} 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setUserType(userType === 'client' ? 'lawyer' : 'client')}>
        Trocar para {userType === 'client' ? 'Advogado' : 'Cliente'}
      </button>
    </div>
  );
};

export default Login;