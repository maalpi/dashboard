"use client";

import React from "react";
import { useStravaData } from "@/hooks/useStravaData";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Activity } from "@/interfaces/Strava";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function StravaRun7days() {
  const { data, isLoading, error } = useStravaData();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  // Filtrar e processar atividades para exibição no gráfico
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const filteredActivities = data.filter((activity: Activity) => {
    const activityDate = new Date(activity.start_date);
    return (
      activity.type === "Run" &&
      activityDate >= sevenDaysAgo &&
      activityDate <= now
    );
  });

  const days = Array.from({ length: 8 }, (_, i) => {
    const date = new Date();
    date.setDate(now.getDate() - i);
    return {
      date: date.toLocaleDateString("pt-BR", { weekday: "long" }),
      distancia: 0,
      dia: date.toLocaleDateString("pt-BR"),
    };
  });

  

  filteredActivities.forEach((activity: Activity) => {
    const activityDate = new Date(activity.start_date).toLocaleDateString("pt-BR");
    const day = days.find((d) => d.dia === activityDate);
    if (day) {
      day.distancia = parseFloat(((day.distancia + activity.distance) / 1000).toFixed(2));
    }
  });

  const chartData = days.reverse();

  return (
    <Card className="w-full shadow-md">
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
            <YAxis tickFormatter={(value) => `${value} km`} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
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
  );
}

export default StravaRun7days;
