'use client';

import React, { useState, useEffect } from 'react';

function App() {
  const [activities, setActivities] = useState([]); // Todas as atividades
  const [runCount, setRunCount] = useState(0); // Número de corridas
  const [totalDistance, setTotalDistance] = useState(0); // Distância total percorrida em corridas
  const [runs, setRuns] = useState([])
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

      // Filtrar apenas as atividades do tipo "Run" nos últimos 7 dias
      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const filteredActivities = data.filter((activity) => {
        const activityDate = new Date(activity.start_date); // Converter a data de início
        return (
          activity.type === 'Run' &&
          activityDate >= sevenDaysAgo &&
          activityDate <= now
        );
      });

  
      
      // Calcular a quantidade de corridas e a distância total percorrida
      const runCount = filteredActivities.length;
      const totalDistance = filteredActivities.reduce((sum, activity) => sum + activity.distance, 0);

      setActivities(filteredActivities);
      setRuns(filteredActivities)
      setRunCount(runCount);
      setTotalDistance(totalDistance);
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
        <p>Número de corridas nos últimos 7 dias: {runCount}</p>
        <p>Distância total percorrida: {totalDistance} metros</p>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.type} - {activity.distance} metros
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
