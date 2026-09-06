"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TrainingCalendar, {
  CalendarDay,
  CalendarStats,
  SelectedDayDetail,
  StreakInfo,
} from "../../../../components/TrainingCalendar";
import MainContainerProps from "../../../../components/MainContainer";
import { AppSidebar, PageType } from "../../../../components/DashboardSideBar";

/** Formato YYYY-MM que le pasamos al backend para pedir el mes */
function toMonthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function CalendarioPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("rutinas");
  const [month, setMonth] = useState(() => new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [stats, setStats] = useState<CalendarStats>({
    scheduled: 0,
    completed: 0,
    pending: 0,
    adherence: 0,
  });
  const [streak, setStreak] = useState<StreakInfo>({
    current: 0,
    best: 0,
    weekPattern: [false, false, false, false, false, false, false],
  });
  const [selectedDay, setSelectedDay] = useState<SelectedDayDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // Carga el mes completo cada vez que cambia `month` 
  useEffect(() => {
    let cancelled = false;

    async function loadMonth() {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/calendario", {
          params: { month: toMonthKey(month) },
        });
        if (cancelled) return;

        setDays(data.days as CalendarDay[]);
        setStats(data.stats as CalendarStats);
        setStreak(data.streak as StreakInfo);
      } catch (err) {
        console.error("Error cargando el calendario", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMonth();
    return () => {
      cancelled = true;
    };
  }, [month]);

  // --- Al elegir un día, pedimos el detalle de ESE día puntual ---
  const handleSelectDay = useCallback(async (isoDate: string) => {
    try {
      const { data } = await axios.get("/api/calendario/dia", {
        params: { date: isoDate },
      });
      // Si ese día no tiene rutina registrada, el backend devuelve null
      setSelectedDay(data as SelectedDayDetail | null);
    } catch (err) {
      console.error("Error cargando el detalle del día", err);
      setSelectedDay(null);
    }
  }, []);

  const handleToday = useCallback(() => {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    handleSelectDay(now.toISOString().slice(0, 10));
  }, [handleSelectDay]);

  if (loading && days.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-zinc-400">
        Cargando calendario...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#151518]">
      <AppSidebar activePage={activePage} onPageChange={setActivePage} />
      <MainContainerProps>
        <TrainingCalendar
          month={month}
          days={days}
          stats={stats}
          selectedDay={selectedDay}
          streak={streak}
          onMonthChange={setMonth}
          onToday={handleToday}
          onSelectDay={handleSelectDay}
          onViewWorkout={(iso) => router.push(`/entrenamientos/${iso}`)}
        />
      </MainContainerProps>
    </div>
  );
}
