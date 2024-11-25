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

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

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
          date: date.toLocaleDateString("pt-BR", { weekday: "long" }), // Formato YYYY-MM-DD
          distancia: 0,
        };
      });

      filteredActivities.forEach((activity) => {
        const activityDate = new Date(activity.start_date).toLocaleDateString("pt-BR", { weekday: "long" });
        const day = days.find((d) => d.date === activityDate);
        if (day) {
          day.distancia = ((day.distancia + activity.distance) / 1000).toFixed(2);; // Somar a distância do dia
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
        <p>Distância total percorrida: {totalDistance} quilometros</p>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.type} - {activity.distance} metros
            </li>
          ))}
        </ul>
      </div>

      <Card className='w-2/6'>
        <CardHeader>
          <CardTitle>Distância Percorrida (Últimos 7 Dias)</CardTitle>
          <CardDescription>Distância diária em quilômetro</CardDescription>
        </CardHeader>
        <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 12,
              left: 12,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={true} />
            <YAxis tickFormatter={(value) => `${value} km`}/>
            <XAxis dataKey="date" 
                   tickLine={false}
                   axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}/>
                    
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed"/>}
            />
            <Area
              type="monotone"
              dataKey="distancia"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
