'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/interfaces/Strava";
import { useStravaData } from "@/hooks/useStravaData";

export function Elevacao() {
    const { data, isLoading } = useStravaData();

    // Obtendo a data atual e subtraindo 30 dias
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filtrando atividades dos últimos 30 dias
    const recentActivitiesCount = data
        ? data.filter((activity: Activity) => new Date(activity.start_date) > thirtyDaysAgo)
        : 0;

    let cont: number = 0;

    let gainElevRun: number = 0
    let run: number = 0;

    let mountainBike: number = 0;
    let gainElevBike: number = 0;

    for (let i = 0; i < recentActivitiesCount.length; i++) {
        cont += recentActivitiesCount[i].total_elevation_gain;
        if (recentActivitiesCount[i].sport_type === 'Run'){
            run += 1;
            gainElevRun += recentActivitiesCount[i].total_elevation_gain;
        }
        if (recentActivitiesCount[i].sport_type === 'MountainBikeRide'){
            mountainBike += 1;
            gainElevBike += recentActivitiesCount[i].total_elevation_gain;
        }

    }

  return (
    <Card
      className=" shadow-md flex flex-col" // adicionando `self-start`
    >
      <CardHeader className="items-center">
          <CardTitle>Ganho de elevação</CardTitle>
        <CardDescription className="">
            últimos 30 dias
        </CardDescription>
      </CardHeader>
      <CardContent className="items-center flex flex-col">
        <p>No total: {cont} metros</p>
        <p>corridas ({run} atv): {gainElevRun} metros</p>
        <p>ciclismo ({mountainBike} atv): {gainElevBike} metros</p>
      </CardContent>
    </Card>
  );
}