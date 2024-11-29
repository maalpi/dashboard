'use client';

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeatherData } from "@/hooks/useWeatherData";

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
                    <p>{filteredData?.city}</p>
                    <p>Coordenadas: {filteredData?.lat}, {filteredData?.lon}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className='text-lg font-semibold'>Hoje</h3>
                <p>Temperatura Média: {filteredData?.today.temperatureAvg}°C</p>
                <p>Máxima: {filteredData?.today.temperatureMax}°C</p>
                <p>Mínima: {filteredData?.today.temperatureMin}°C</p>
                <p>Chance de Chuva: {filteredData?.today.precipitationProbability}%</p>
                <h3 className='mt-4 text-lg font-semibold'>Previsão</h3>
                {filteredData?.forecast.map((day, index) => (
                    <div key={index}>
                        <p>Data: {new Date(day.time).toLocaleDateString()}</p>
                        <p>Máxima: {day.temperatureMax}°C</p>
                        <p>Mínima: {day.temperatureMin}°C</p>
                        <p>Chance de Chuva: {day.precipitationProbability}%</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
