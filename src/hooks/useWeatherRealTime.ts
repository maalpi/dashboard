import { useQuery } from "@tanstack/react-query";

const fetchWeatherDataRealTime = async () => {
  const clientAPI = process.env.NEXT_PUBLIC_API_WEATHER as string;
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=campina%20grande&apikey=${clientAPI}`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }
  
  return response.json();
};

export const useWeatherDataRealTime = () => {
  return useQuery({
    queryKey: ["weatherDataRealTime"], // Identificador único para este query
    queryFn: fetchWeatherDataRealTime,
    staleTime: 30 * 60 * 1000, // 30 minutos
    cacheTime: 60 * 60 * 1000, // 1 hora
    refetchOnWindowFocus: false, // Opcional: Atualizar somente ao recarregar
  });
};