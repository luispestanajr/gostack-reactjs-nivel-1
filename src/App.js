import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Teste ${Date.now()}`, 
      url: 'https://github.com/luispestanajr', 
      techs: [
        'javascript',
        'reactjs',
        'react native',
        'node.js'
      ]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const index = repositories.findIndex(repo => repo.id === id);
      repositories.splice(index, 1);
      
      setRepositories([...repositories]);
    }
  }

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
