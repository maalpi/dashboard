import { useQuery } from "@tanstack/react-query";

const fetchWeatherData = async () => {
  const clientAPI = process.env.NEXT_PUBLIC_API_WEATHER as string;
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=campina%20grande&timesteps=1d&apikey=${clientAPI}`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }
  
  return response.json();
};

export const useWeatherData = () => {
  return useQuery({
    queryKey: ["weatherData"], // Identificador único para este query
    queryFn: fetchWeatherData,
    staleTime: 30 * 60 * 1000, // 30 minutos
    cacheTime: 60 * 60 * 1000, // 1 hora
    refetchOnWindowFocus: false, // Opcional: Atualizar somente ao recarregar
  });
};