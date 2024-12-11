"use client";

import { useStravaData } from "@/hooks/useStravaData";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/interfaces/Strava";

export function Pace() {
  const { data, isLoading, error } = useStravaData();

  // Obtendo a data atual e subtraindo 30 dias
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filtrando atividades dos últimos 30 dias
  const recentActivities = data
    ? data.filter((activity: Activity) => new Date(activity.start_date) > thirtyDaysAgo)
    : [];

  // Calculando o melhor pace
  let bestPace: number | null = null;
  let km: string  = 'null'
  if (recentActivities.length > 0) {
    for (const activity of recentActivities) {
      const pace = parseFloat((((activity.moving_time/60) / activity.distance)*1000).toFixed(2));
      if ((bestPace === null || pace < bestPace) && activity.type === 'Run') {
        bestPace = pace;
        km = (activity.distance/1000).toFixed(2);
      }
    }
  }

  return (
    <Card className="flex flex-col border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Melhor Pace</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        {isLoading ? (
          <span>Carregando...</span>
        ) : error ? (
          <span>Erro ao carregar dados.</span>
        ) : bestPace !== null ? (
          <div className="flex flex-col items-center justify-center rounded-full xl:h-32 xl:w-32 h-32 w-32 max-w-[150px] xl:-mt-3 mt-3 border-dashed  border-sky-500 border-2">
            <span className="text-xl font-bold mt-1">{(bestPace.toFixed(2)).replace('.',':')} <span className="text-base font-bold mt-1">/km</span></span>
            <span className="text-xl font-bold">{km.replace('.',',')} <span className="text-base font-bold mt-1">km</span></span>
            
          </div>
        ) : (
          <span>Nenhuma atividade encontrada.</span>
        )}
      </CardContent>
    </Card>
  );
}
