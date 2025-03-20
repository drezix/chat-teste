import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login'; // Já fornecido anteriormente
import ClientRegister from './components/ClientRegister';
import LawyerRegister from './components/LawyerRegister';
import ProcessManager from './components/ProcessManager';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register-client">Registrar Cliente</Link></li>
          <li><Link to="/register-lawyer">Registrar Advogado</Link></li>
          <li><Link to="/process-manager">Gerenciar Processos</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/register-client" component={ClientRegister} />
        <Route path="/register-lawyer" component={LawyerRegister} />
        <Route path="/process-manager" component={ProcessManager} />
        <Route path="/" exact component={Login} />
      </Routes>
    </Router>
  );
};

export default App;