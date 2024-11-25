'use client';

import React, { useState, useEffect } from 'react';

function App() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const activitiesURL = 'api/strava'; // Rota do servidor que você criou

  // Função para buscar atividades
  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(activitiesURL);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar atividades: ${response.status}`);
      }

      const data = await response.json();
      setActivities(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div>
        <h1>Atividades</h1>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.name} - {activity.distance} metros
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
