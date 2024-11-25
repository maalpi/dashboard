'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [activities, setActivities] = useState([]); // Todas as atividades
  const [runCount, setRunCount] = useState(0); // Número de corridas
  const [totalDistance, setTotalDistance] = useState(0); // Distância total percorrida em corridas
  const [chartData, setChartData] = useState([]); // Dados para o gráfico
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

      // Preparar dados para o gráfico
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(now.getDate() - i);
        return {
          date: date.toISOString().split('T')[0], // Formato YYYY-MM-DD
          distance: 0,
        };
      });

      filteredActivities.forEach((activity) => {
        const activityDate = activity.start_date.split('T')[0];
        const day = days.find((d) => d.date === activityDate);
        if (day) {
          day.distance += activity.distance; // Somar a distância do dia
        }
      });

      console.log(days)
      setChartData(days.reverse()); // Reverter para exibir na ordem correta
      setActivities(filteredActivities);
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

      <Card>
        <CardHeader>
          <CardTitle>Distância Percorrida (Últimos 7 Dias)</CardTitle>
          <CardDescription>Distância diária em metros</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaChart
            width={600}
            height={300}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="start_date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="distance"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Últimos 7 dias
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default App;
