import React, { useState } from 'react';
import { insertProcess, getProcess, deleteProcess } from '../services/processService';

const ProcessManager = () => {
  // Dados para inserir um processo
  const [processData, setProcessData] = useState({
    processNumber: '',
    client: '',
    lawyer: '',
    status: ''
  });
  const [insertMessage, setInsertMessage] = useState(null);

  // Campos para buscar um processo
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchMessage, setSearchMessage] = useState(null);

  // Campos para deletar um processo
  const [deleteId, setDeleteId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState(null);

  const handleInsertChange = (e) => {
    setProcessData({ ...processData, [e.target.name]: e.target.value });
  };

  const handleInsertSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertProcess(processData);
      setInsertMessage('Processo inserido com sucesso!');
    } catch (err) {
      setInsertMessage(err.response?.data?.message || 'Erro ao inserir processo');
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getProcess(searchId);
      setSearchResult(data);
      setSearchMessage(null);
    } catch (err) {
      setSearchMessage(err.response?.data?.message || 'Erro ao buscar processo');
      setSearchResult(null);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteProcess(deleteId);
      setDeleteMessage('Processo deletado com sucesso!');
    } catch (err) {
      setDeleteMessage(err.response?.data?.message || 'Erro ao deletar processo');
    }
  };

  return (
    <div className="container">
      <h2>Gerenciar Processos</h2>

      {/* Inserir Processo */}
      <section>
        <h3>Inserir Processo</h3>
        <form onSubmit={handleInsertSubmit}>
          <div className="form-group">
            <label>Número do Processo:</label>
            <input 
              type="text" 
              name="processNumber" 
              value={processData.processNumber} 
              onChange={handleInsertChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>ID do Cliente:</label>
            <input 
              type="text" 
              name="client" 
              value={processData.client} 
              onChange={handleInsertChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>ID do Advogado:</label>
            <input 
              type="text" 
              name="lawyer" 
              value={processData.lawyer} 
              onChange={handleInsertChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <input 
              type="text" 
              name="status" 
              value={processData.status} 
              onChange={handleInsertChange} 
              required 
            />
          </div>
          <button type="submit">Inserir Processo</button>
        </form>
        {insertMessage && <p className="error">{insertMessage}</p>}
      </section>

      {/* Buscar Processo */}
      <section>
        <h3>Buscar Processo</h3>
        <form onSubmit={handleSearchSubmit}>
          <div className="form-group">
            <label>ID do Processo:</label>
            <input 
              type="text" 
              value={searchId} 
              onChange={(e) => setSearchId(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
        {searchMessage && <p className="error">{searchMessage}</p>}
        {searchResult && (
          <div>
            <h4>Detalhes do Processo:</h4>
            <pre>{JSON.stringify(searchResult, null, 2)}</pre>
          </div>
        )}
      </section>

      {/* Deletar Processo */}
      <section>
        <h3>Deletar Processo</h3>
        <form onSubmit={handleDeleteSubmit}>
          <div className="form-group">
            <label>ID do Processo:</label>
            <input 
              type="text" 
              value={deleteId} 
              onChange={(e) => setDeleteId(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Deletar</button>
        </form>
        {deleteMessage && <p className="error">{deleteMessage}</p>}
      </section>
    </div>
  );
};

export default ProcessManager;
