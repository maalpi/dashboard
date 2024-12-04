"use client";

import { useStravaData } from "@/hooks/useStravaData";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AtivLonga() {
  const { data, isLoading, error } = useStravaData();

  // Obtendo a data atual e subtraindo 30 dias
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filtrando atividades dos últimos 30 dias
  const recentActivities = data
    ? data.filter((activity: any) => new Date(activity.start_date) > thirtyDaysAgo)
    : [];

  // Calculando o melhor pace
  let bestPace: number | null = null;
  let atividadeLonga: number  = 0
  console.log(recentActivities)
  if (recentActivities.length > 0) {
    for (const activity of recentActivities) {
      const pace = parseFloat((((activity.moving_time/60) / activity.distance)*1000).toFixed(2));
      if (atividadeLonga === null || activity.distance > atividadeLonga) {
        if (bestPace === null || pace < bestPace)  {
            atividadeLonga = activity.distance;
            bestPace = pace;
        }
      }
    }
  }

  return (
    <Card className="flex flex-col border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Melhor Perfomace</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        {isLoading ? (
          <span>Carregando...</span>
        ) : error ? (
          <span>Erro ao carregar dados.</span>
        ) : bestPace !== null ? (
          <div className="flex flex-col items-center justify-center rounded-full xl:h-32 xl:w-32 h-32 w-32 max-w-[150px] xl:-mt-3 mt-3 border-dashed  border-sky-500 border-2">
            <span className="text-xl font-bold">{(atividadeLonga / 1000).toFixed(2).replace('.',',')} <span className="text-base font-bold mt-1">km</span></span>
            <span className="text-xl font-bold mt-1">{(bestPace.toFixed(2)).replace('.',':')} <span className="text-base font-bold mt-1">/km</span></span>
            
            
          </div>
        ) : (
          <span>Nenhuma atividade encontrada.</span>
        )}
      </CardContent>
    </Card>
  );
}
