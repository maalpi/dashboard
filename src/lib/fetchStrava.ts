export async function fetchStravaActivities() {
    const activitiesURL = "/api/strava"; // Endpoint da API
    const response = await fetch(activitiesURL);
  
    if (!response.ok) {
      throw new Error(`Erro ao buscar atividades: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }