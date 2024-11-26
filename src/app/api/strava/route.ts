import fs from "fs";
import path from "path";

export async function GET() {
  const activitiesURL = "https://www.strava.com/api/v3/athlete/activities";

  const clientID = process.env.CLIENT_ID_STRAVA as string;
  const clientSecret = process.env.CLIENT_SECRET_STRAVA as string;
  const refreshToken = process.env.REFRESH_TOKEN_STRAVA as string;

  try {
    const accessToken = await refreshAccessToken(clientID, clientSecret, refreshToken);

    const response = await fetch(activitiesURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar atividades: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

async function refreshAccessToken(clientID: string, clientSecret: string, refreshToken: string) {
  const tokenURL = "https://www.strava.com/oauth/token";

  const response = await fetch(tokenURL, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: clientID,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Erro ao atualizar token: ${data.message || response.statusText}`);
  }

  // Atualiza o arquivo .env localmente com o novo refresh_token, se necessário
  if (data.refresh_token) {
    updateEnvVariable("REFRESH_TOKEN_STRAVA", data.refresh_token);
  }

  return data.access_token;
}

function updateEnvVariable(key: string, value: string) {
  console.log(value)
  const envPath = path.resolve(process.cwd(), ".env.local");
  const envContent = fs.readFileSync(envPath, "utf-8");

  const newEnvContent = envContent
    .split("\n")
    .map((line) =>
      line.startsWith(`${key}=`) ? `${key}=${value}` : line
    )
    .join("\n");

  fs.writeFileSync(envPath, newEnvContent, "utf-8");

  // Atualiza o processo em execução com o novo valor
  process.env[key] = value;
}
