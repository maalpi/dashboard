import { Elevacao } from '@/components/atividades/cards/elevacaoGanho';
import StravaRun7days from '@/components/atividades/charts/runChartSevenDays';
import StravaBoard from '@/components/atividades/quadros/StravaBoard';

export default function Home() {

  return (
    <main className="sm:ml-12 p-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StravaBoard/>
          <StravaRun7days />
          <Elevacao />
        </section>

    </main>
  );
}
