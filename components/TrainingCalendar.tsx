"use client";

import { useMemo, useState } from "react";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";

export type DayStatus = "completed" | "scheduled" | "missed";

export interface CalendarDay {
  /** ISO date, "2026-08-27" */
  date: string;
  status: DayStatus;
  routineName: string;
}

export interface SelectedDayDetail {
  date: string;
  routineName: string;
  exercises: number;
  series: number;
  durationMinutes: number;
  totalVolumeKg: number;
}

export interface CalendarStats {
  scheduled: number;
  completed: number;
  pending: number;
  /** 0-100 */
  adherence: number;
}

export interface StreakInfo {
  current: number;
  best: number;
  weekPattern: boolean[];
}

export interface TrainingCalendarProps {
  month: Date;
  days: CalendarDay[];
  stats: CalendarStats;
  selectedDay: SelectedDayDetail | null;
  streak: StreakInfo;
  onMonthChange?: (next: Date) => void;
  onToday?: () => void;
  onSelectDay?: (isoDate: string) => void;
  onViewWorkout?: (isoDate: string) => void;
}



const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
});

const STATUS_STYLES: Record<
  DayStatus,
  { dot: string; text: string }
> = {
  completed: { dot: "bg-emerald-500", text: "text-emerald-400" },
  scheduled: { dot: "bg-sky-500", text: "text-sky-400" },
  missed: { dot: "bg-red-500", text: "text-red-400" },
};



function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function isSameDay(a: Date, b: Date) {
  return toISODate(a) === toISODate(b);
}


function buildMonthGrid(month: Date): Date[][] {
  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // 0 = lunes

  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - firstWeekday);

  const weeks: Date[][] = [];
  const cursor = new Date(gridStart);

  for (let week = 0; week < 6; week++) {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(days);
    if (
      cursor.getMonth() !== month.getMonth() &&
      cursor.getDate() > 7 &&
      week >= 4
    ) {
      break;
    }
  }
  return weeks;
}


function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#18181B]/95 px-5 py-4">
      <div>
        <p className="text-[11px] font-medium tracking-wide text-zinc-500">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      </div>
      {icon}
    </div>
  );
}

function AdherenceRing({ value }: { value: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
      <circle
        cx="26"
        cy="26"
        r={radius}
        fill="none"
        stroke="#27272a"
        strokeWidth="5"
      />
      <circle
        cx="26"
        cy="26"
        r={radius}
        fill="none"
        stroke="#22c55e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 26 26)"
      />
    </svg>
  );
}

function Legend() {
  const items: { label: string; className: string }[] = [
    { label: "Completada", className: "bg-emerald-500" },
    { label: "Programada", className: "bg-sky-500" },
    { label: "Perdida / No completada", className: "bg-red-500" },
    { label: "Hoy", className: "bg-amber-400" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-5 border-t border-zinc-800 px-5 py-3 text-xs text-zinc-400">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${it.className}`} />
          {it.label}
        </div>
      ))}
    </div>
  );
}

function TodayDetailCard({
  isToday,
  detail,
  onViewWorkout,
}: {
  isToday: boolean;
  detail: SelectedDayDetail | null;
  onViewWorkout?: (isoDate: string) => void;
}) {
  const dateLabel = detail
    ? new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date(detail.date))
    : "";

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#18181B]/95 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold capitalize text-white">
          {dateLabel || "Selecciona un día"}
        </h3>
        {isToday && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            HOY
          </span>
        )}
      </div>

      {detail ? (
        <>
          <div className="mt-4 flex items-center gap-2 text-emerald-400">
            <CheckCircleIconSolid className="h-4 w-4" />
            <span className="text-xs font-medium tracking-wide">
              RUTINA COMPLETADA
            </span>
          </div>

          <p className="mt-2 text-xl font-semibold text-white">
            {detail.routineName}
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            {detail.exercises} ejercicios · {detail.series} series ·{" "}
            {detail.durationMinutes} min
          </p>
          <p className="text-sm text-zinc-400">
            Volumen total: {detail.totalVolumeKg.toLocaleString("es-ES")} kg
          </p>

          <button
            onClick={() => onViewWorkout?.(detail.date)}
            className="mt-4 w-full rounded-lg border border-emerald-600/40 bg-emerald-500/10 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            Ver entrenamiento
          </button>
        </>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">
          No hay rutina registrada para este día.
        </p>
      )}
    </div>
  );
}

function StreakCard({ streak }: { streak: StreakInfo }) {
  const labels = ["L", "M", "X", "J", "V", "S", "D"];
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#18181B]/95 p-5">
      <div className="flex items-center gap-2 text-orange-400">
        <FireIcon className="h-4 w-4" />
        <span className="text-xs font-medium tracking-wide">
          RACHA ACTUAL
        </span>
      </div>

      <p className="mt-2 text-3xl font-semibold text-white">
        {streak.current} días
      </p>
      <p className="text-sm text-zinc-500">
        Mejor racha: {streak.best} días
      </p>

      <div className="mt-4 flex items-end justify-between gap-1.5">
        {streak.weekPattern.map((active, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={`h-8 w-3 rounded-full ${
                active ? "bg-emerald-500" : "bg-zinc-800"
              }`}
            />
            <span className="text-[10px] text-zinc-600">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



export default function TrainingCalendar({
  month,
  days,
  stats,
  selectedDay,
  streak,
  onMonthChange,
  onToday,
  onSelectDay,
  onViewWorkout,
}: TrainingCalendarProps) {
  const today = new Date();

  const dayMap = useMemo(() => {
    const map = new Map<string, CalendarDay>();
    days.forEach((d) => map.set(d.date, d));
    return map;
  }, [days]);

  const weeks = useMemo(() => buildMonthGrid(month), [month]);

  const goToMonth = (offset: number) => {
    const next = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    onMonthChange?.(next);
  };

  return (
    <div className="min-h-screen z-2 min-w-[80%] px-6 py-8 text-white">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Calendario</h1>
        <p className="text-sm text-zinc-500">
          Visualiza tus rutinas y tu progreso mensual
        </p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="RUTINAS PROGRAMADAS"
          value={stats.scheduled}
          icon={<CalendarDaysIcon className="h-6 w-6 text-fuchsia-400" />}
        />
        <StatCard
          label="COMPLETADAS"
          value={stats.completed}
          icon={<CheckCircleIconSolid className="h-6 w-6 text-emerald-400" />}
        />
        <StatCard
          label="POR HACER"
          value={stats.pending}
          icon={<ClockIcon className="h-6 w-6 text-sky-400" />}
        />
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#18181B]/95 px-5 py-4">
          <div>
            <p className="text-[11px] font-medium tracking-wide text-zinc-500">
              ADHERENCIA
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {stats.adherence}%
            </p>
          </div>
          <AdherenceRing value={stats.adherence} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden  z-2 rounded-xl border border-zinc-800 bg-[#18181B]/95">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToMonth(-1)}
                className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                aria-label="Mes anterior"
              >
                <ChevronLeftIcon className="h-[18px] w-[18px]" />
              </button>
              <h2 className="w-40 text-center text-lg font-semibold capitalize text-emerald-400">
                {MONTH_FORMATTER.format(month)}
              </h2>
              <button
                onClick={() => goToMonth(1)}
                className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                aria-label="Mes siguiente"
              >
                <ChevronRightIcon className="h-[18px] w-[18px]" />
              </button>
            </div>
            <button
              onClick={onToday}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Hoy
            </button>
          </div>

          <div className="grid grid-cols-7 border-t border-zinc-800 text-center text-xs font-medium text-zinc-500">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {weeks.flat().map((date) => {
              const iso = toISODate(date);
              const info = dayMap.get(iso);
              const inMonth = date.getMonth() === month.getMonth();
              const isToday = isSameDay(date, today);
              const isSelected = selectedDay?.date === iso;

              return (
                <button
                  key={iso}
                  onClick={() => onSelectDay?.(iso)}
                  className={`flex h-[92px] flex-col items-start gap-1 border-b border-r border-zinc-800 p-2 text-left transition-colors last:border-r-0 hover:bg-zinc-800/40 ${
                    !inMonth ? "text-zinc-700" : "text-zinc-200"
                  } ${isSelected ? "ring-1 ring-inset ring-emerald-500" : ""}`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm">{date.getDate()}</span>
                    {isToday && (
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                        HOY
                      </span>
                    )}
                  </div>

                  {info && inMonth && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${STATUS_STYLES[info.status].dot}`}
                      />
                      <span
                        className={`text-[11px] ${STATUS_STYLES[info.status].text}`}
                      >
                        {info.routineName}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <Legend />
        </div>

        <div className="flex flex-col gap-4">
          <TodayDetailCard
            isToday={
              !!selectedDay && isSameDay(new Date(selectedDay.date), today)
            }
            detail={selectedDay}
            onViewWorkout={onViewWorkout}
          />
          <StreakCard streak={streak} />
        </div>
      </div>
    </div>
  );
}