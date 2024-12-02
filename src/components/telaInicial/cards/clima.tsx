'use client';

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeatherData } from "@/hooks/useWeatherData";

import { Sun, CloudSun, CloudHail } from "lucide-react";

interface WeatherData {
    timelines: {
        daily: Array<{
            time: string;
            values: {
                temperatureMax: number;
                temperatureMin: number;
                temperatureAvg: number;
                precipitationProbabilityAvg: number;
            };
        }>;
    };
    location: {
        lat: number;
        lon: number;
        name: string;
    };
}

export default function ClimaComponent() {
    const { data, isLoading, error } = useWeatherData();

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;

    // Filtrando os dados relevantes
    const filteredData = data && {
        city: data.location.name,
        lat: data.location.lat,
        lon: data.location.lon,
        today: {
            temperatureMax: data.timelines.daily[0].values.temperatureMax,
            temperatureMin: data.timelines.daily[0].values.temperatureMin,
            temperatureAvg: data.timelines.daily[0].values.temperatureAvg,
            precipitationProbability: data.timelines.daily[0].values.precipitationProbabilityAvg,
        },
        forecast: data.timelines.daily.slice(1).map(day => ({
            time: day.time,
            temperatureMax: day.values.temperatureMax,
            temperatureMin: day.values.temperatureMin,
            cloudCover: day.values.cloudCoverAvg,
            precipitationProbability: day.values.precipitationProbabilityAvg,
        })),
    };

    return (
        <Card className='rounded-lg'>
            <CardHeader>
                <div className='flex items-center justify-center'>
                    <CardTitle className='text-lg sm:text-xl text-gray-500 select-none'>Clima</CardTitle>
                </div>
                <CardDescription>
                    <p>Campina Grande</p>
                </CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
                <div className="align-center justify-center flex w-full flex-col">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>
                            <h3 className='text-2xl font-semibold'>Hoje</h3>
                            <p className="text-5xl">{filteredData?.today.temperatureAvg}°C</p>
                            <div className="flex pt-1 flex-row">
                                <p className="pr-5 text-sm">max: {filteredData?.today.temperatureMax}°C</p>
                                <p className="text-sm">min: {filteredData?.today.temperatureMin}°C</p>
                            </div>
                        </div>
                        <Sun className="w-32 h-32"/>
                    </div>
                </div>
                <h3 className='mt-4 text-lg font-semibold'>Previsão</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ">
                    {filteredData?.forecast.map((day, index) => (
                        <div key={index} className="p-3 border rounded items-center flex flex-col">
                        <h2 className="text-lg mb-1 font-bold">{new Date(day.time).toLocaleDateString('pt-BR', { weekday: 'short' })}</h2>
                        {day.cloudCover > 75 ? (
                            <CloudHail className="w-10 h-10 text-blue-500"/>
                            ) : day.cloudCover > 40 ? (
                            <CloudSun className="w-10 h-10"/>
                            ) : (
                            <Sun className="w-10 h-10"/>
                        )}
                        <div className="flex flex-row items-center">
                            <div className="flex items-center flex-col pr-3">
                                <p>max</p>
                                <p className="text-sm">{day.temperatureMax}°C</p>
                            </div>

                            <div className="flex items-center flex-col">
                                <p>min</p>
                                <p className="text-sm">{day.temperatureMin}°C</p>
                            </div>
                        </div>
                        <p>Chuva: {day.precipitationProbability}%</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
