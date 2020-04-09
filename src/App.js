import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `Aplicativo ${Date.now()}`,
        url: `https://github.com/Rocketseat/bootcamp-${Date.now()}`,
        techs: [
          "NodeJS",
          "Javascript",
          "React",
          "React Native"
        ]
      });
      console.log(response.data);
      setRepositories([...repositories, response.data]);
    } catch (error) {
      alert('Error in adding a new repository');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      const repositoryIndex = repositories
        .findIndex(repository => repository.id === id);

      if (repositoryIndex < 0) {
        alert('Repository not found');
      }

      setRepositories(repositories.filter(repository => repository.id !== id));
      console.log('Repository removed sucessfully');
    }
    catch (error) {
      alert('Erro ao deletar');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        )}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
