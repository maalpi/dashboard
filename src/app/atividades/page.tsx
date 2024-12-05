import StravaRun7days from '@/components/charts/runChartSevenDays';
import StravaBoard from '@/components/quadros/StravaBoard';

export default function Home() {

  return (
    <main className="sm:ml-12 p-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StravaBoard/>
          <StravaRun7days />
        </section>

    </main>
  );
}
