import React, { useState } from 'react';
import { insertProcess, getProcess, deleteProcess } from '../services/processService';

const ProcessManager = () => {
  // Inserção do Processo
  const [insertData, setInsertData] = useState({
    processNumber: '',
    client: '',
    lawyer: '',
    status: ''
  });
  const [insertMessage, setInsertMessage] = useState(null);

  // Consulta do Processo
  const [getId, setGetId] = useState('');
  const [getResult, setGetResult] = useState(null);
  const [getMessage, setGetMessage] = useState(null);

  // Deleção do Processo
  const [deleteId, setDeleteId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Handlers para inserção
  const handleInsertChange = (e) => {
    setInsertData({ ...insertData, [e.target.name]: e.target.value });
  };

  const handleInsertSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertProcess(insertData);
      setInsertMessage('Processo inserido com sucesso!');
    } catch (error) {
      setInsertMessage(error.response?.data?.message || 'Erro ao inserir processo');
    }
  };

  // Handlers para consulta
  const handleGetSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getProcess(getId);
      setGetResult(data);
      setGetMessage(null);
    } catch (error) {
      setGetMessage(error.response?.data?.message || 'Erro ao buscar processo');
      setGetResult(null);
    }
  };

  // Handlers para deleção
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteProcess(deleteId);
      setDeleteMessage('Processo deletado com sucesso!');
    } catch (error) {
      setDeleteMessage(error.response?.data?.message || 'Erro ao deletar processo');
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Processos</h2>

      <section>
        <h3>Inserir Processo</h3>
        <form onSubmit={handleInsertSubmit}>
          <input type="text" name="processNumber" placeholder="Número do Processo" value={insertData.processNumber} onChange={handleInsertChange} required />
          <input type="text" name="client" placeholder="ID do Cliente" value={insertData.client} onChange={handleInsertChange} required />
          <input type="text" name="lawyer" placeholder="ID do Advogado" value={insertData.lawyer} onChange={handleInsertChange} required />
          <input type="text" name="status" placeholder="Status" value={insertData.status} onChange={handleInsertChange} required />
          <button type="submit">Inserir</button>
        </form>
        {insertMessage && <p>{insertMessage}</p>}
      </section>

      <section>
        <h3>Buscar Processo</h3>
        <form onSubmit={handleGetSubmit}>
          <input type="text" placeholder="ID do Processo" value={getId} onChange={(e) => setGetId(e.target.value)} required />
          <button type="submit">Buscar</button>
        </form>
        {getMessage && <p>{getMessage}</p>}
        {getResult && (
          <div>
            <h4>Detalhes do Processo:</h4>
            <pre>{JSON.stringify(getResult, null, 2)}</pre>
          </div>
        )}
      </section>

      <section>
        <h3>Deletar Processo</h3>
        <form onSubmit={handleDeleteSubmit}>
          <input type="text" placeholder="ID do Processo" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} required />
          <button type="submit">Deletar</button>
        </form>
        {deleteMessage && <p>{deleteMessage}</p>}
      </section>
    </div>
  );
};

export default ProcessManager;