import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Front End com GoStack",
      url: "https://github.com/ocarlic",
      techs: ["Node", "Express", "ReactJS", "React Native", "Angular", "Vue", "Golang", "Javascript", "Jest"]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const newRepository = repositories.filter(repository => repository.id !== id);

    setRepositories(newRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(({ title, id, techs }) => (
        <li key={id}>
          <span>
            <p className="title">{title}</p>
            <span className="tag-techs">
              {techs.map(tech => <span className="tag-techs-items" key={tech}>{tech}</span> )}
            </span>
          </span>
          
          <button onClick={() => handleRemoveRepository(id)}>
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
