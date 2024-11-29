import StravaBoard from '@/components/quadros/StravaBoard';
import ClimaComponent from '@/components/telaInicial/cards/clima';
import PomodoroComponent from '@/components/telaInicial/cards/pomodoro';
import ToDoComponent from "@/components/telaInicial/cards/toDoList";

export default function Home() {

  return (
    <main className="sm:ml-12 p-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToDoComponent/>
          <PomodoroComponent/> 
          <ClimaComponent />
          <StravaBoard/>
        </section>

    </main>
  );
}
