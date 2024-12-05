"use client";

import { useStravaData } from "@/hooks/useStravaData";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Activity } from "@/interfaces/Strava";

// Configuração inicial do gráfico
const chartConfig = {
  activities: {
    label: "Activities",
  },
} satisfies ChartConfig;

export function Atividades() {
  const { data, isLoading } = useStravaData();

  // Obtendo a data atual e subtraindo 30 dias
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filtrando atividades dos últimos 30 dias
  const recentActivitiesCount = data
    ? data.filter((activity: Activity) => new Date(activity.start_date) > thirtyDaysAgo).length
    : 0;

  // Dados para o gráfico
  const chartData = [
    { name: "Activities", value: recentActivitiesCount, fill: "hsl(var(--chart-2))" },
    { name: "Limit", value: 30, opacity: 0 }, // Cor de fundo para o limite
  ];

  return (
    <Card className="flex flex-col border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Número de atividades</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[150px]"
        >
          <RadialBarChart
            width={300}
            height={300}
            innerRadius="80%"
            outerRadius="100%"
            data={chartData}
            startAngle={90}
            endAngle={450} // Define o ângulo completo
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "hsl(var(--background))" }} // Cor de fundo padrão
              maxBarSize={15}
              isAnimationActive={!isLoading}
            />
            <PolarRadiusAxis
              domain={[0, 30]} // Limite visual
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {recentActivitiesCount}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Atividades
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
