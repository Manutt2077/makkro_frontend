"use client";
import { useEffect, useState } from "react";
import { Image } from '@imagekit/next';
import api from "../lib/api";
import axios from "axios";
import Modal from "./Modal";


interface Routine {
  name: string;
  created_date: string;
  finish_day: string;
  dayExercises: {
    day: { name: string };
    exercise: {
      name: string;
      description?: string;
      ex_img?: string;
      type?: string;
      equipment: {
        equipment: {
          name: string;
        };
      }[];
    };
    sets: number;
    reps: number;
    rest: number;
    weight: number;
  }[];
}

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const UserRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<
    Routine["dayExercises"][0] | null
  >(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("routines/user/routines", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoutines(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Error al obtener las rutinas"
          );
        } else {
          setError("Error al obtener las rutinas");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  if (loading)
    return (
      <p className="text-white text-center mt-10">Cargando tus rutinas...</p>
    );
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  const currentRoutine = routines[0];
  const exercisesOfSelectedDay =
    currentRoutine?.dayExercises.filter(
      (item) => item.day.name === selectedDay
    ) || [];

  return (
    <section className="py-16 px-4 max-w-6xl mt-[5%] mb-[5%] h-[900px] min-w-[1000px] mx-auto text-white bg-[#171A21]/60 backdrop-blur-3xl rounded-xl border border-white/10 shadow">
      <h2 className="text-[#4ADE80] text-3xl font-bold text-center mb-2">
        Rutina Semanal Actual
      </h2>
      <p className="text-center text-white/60 mb-6">
        Del {new Date(currentRoutine.created_date).toLocaleDateString()} al{" "}
        {new Date(currentRoutine.finish_day).toLocaleDateString()}
      </p>

      <nav className="flex justify-between overflow-x-auto border-b border-white/10 mb-6">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedDay === day
                ? "text-green-400 border-b-2 border-green-400"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {day}
          </button>
        ))}
      </nav>

      {exercisesOfSelectedDay.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Enfoque: {selectedDay}</h3>

          <div
            className="h-[500px] overflow-y-auto pr-2 
                          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 
                          hover:scrollbar-thumb-white/40 scrollbar-thumb-rounded-full
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-transparent
                          [&::-webkit-scrollbar-thumb]:bg-white/20
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          hover:[&::-webkit-scrollbar-thumb]:bg-white/40"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercisesOfSelectedDay.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a]/20 p-4 backdrop-blur-3xl rounded-xl border border-white/10 shadow text-white 
                           hover:border-white/20 hover:bg-[#2a2a2a]/30 transition-all duration-300 
                           transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg text-white">
                      {item.exercise.name}
                    </h4>
                    <Image
                      src={`/icons/${item.exercise.equipment[0]?.equipment?.name}.svg`}
                      alt="Equipamiento"
                      width={42}
                      height={42}
                      className="opacity-70"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <span className="text-xs text-white/60 block">
                        Series
                      </span>
                      <span className="font-semibold text-lg text-green-400">
                        {item.sets}
                      </span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <span className="text-xs text-white/60 block">Reps</span>
                      <span className="font-semibold text-lg text-blue-400">
                        {item.reps}
                      </span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <span className="text-xs text-white/60 block">
                        Descanso
                      </span>
                      <span className="font-semibold text-lg text-yellow-400">
                        {item.rest}s
                      </span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <span className="text-xs text-white/60 block">Peso</span>
                      <span className="font-semibold text-lg text-purple-400">
                        {item.weight}kg
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedExercise(item);
                      setModalOpen(true); 
                    }}
                    className="w-full mt-2 py-2 px-4 bg-green-500/20 hover:bg-green-500/30 
                        border border-green-500/50 rounded-lg text-green-400 
                        text-sm font-medium transition-all duration-200
                        hover:scale-105 active:scale-95"
                  >
                    Ver Detalles
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <span>Desliza para ver más ejercicios</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.44-.926-6-2.432"
              />
            </svg>
          </div>
          <p className="text-white/50 text-lg">
            No hay ejercicios asignados para este día.
          </p>
          <p className="text-white/30 text-sm mt-2">
            Selecciona otro día o modifica tu rutina.
          </p>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-8">
        <button
          className="bg-gray-700/50 hover:bg-gray-600/50 px-6 py-3 rounded-lg 
                         border border-gray-600/50 text-white font-medium
                         transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Modificar Rutina
        </button>
        <button
          className="bg-green-500/80 hover:bg-green-500 px-6 py-3 rounded-lg 
                         text-white font-medium shadow-lg shadow-green-500/25
                         transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Marcar como Completado
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedExercise?.exercise.name || "Detalles"}
      >
        {selectedExercise ? (
          <div className="grid grid-cols-4 grid-rows-6 gap-4 text-sm text-white">
            <div className="col-span-2 row-span-3  text-[18px] bg-[#22252A] border-[#393B40] border-1  hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5">
              <span className="font-semibold text-[#4ade80] block ml-[4%] mt-[6%]">
                📝 DESCRIPCIÓN
              </span>{" "}
              <p className="text-center w-[90%] mt-[2%]">
                {selectedExercise.exercise.description || "Sin descripción."}
              </p>
            </div>
            <div className="col-span-2 row-span-5  border-[#393B40] border-1 border-dashed  w-[370px] h-[500px]">
            
            <Image 
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT} 
            src={ selectedExercise.exercise.ex_img || "default-img"} 
            alt="Mi imagen" 
            width={0} height={0}
            sizes="100vw"
            className="w-full h-full"
            />
            </div>
            <p className="col-span-2 row-span-1 text-[18px] bg-[#22252A] border-[#393B40] border border-solid hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5">
              <span className="inline-block font-semibold text-[#4ade80] ml-[4%] mt-[6%]">
                🏋️ TIPO:
              </span>{" "}
              {selectedExercise.exercise.type || "No especificado"}
            </p>

            <p className="col-span-2 row-span-1 text-[18px] bg-[#22252A] border-[#393B40] border-1 hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5">
              <span className="inline-block font-semibold text-[#4ade80] ml-[4%] mt-[6%] ">
                🎯 EQUIPAMIENTO:
              </span>{" "}
              {selectedExercise.exercise.equipment
                .map((eq) => eq.equipment.name)
                .join(", ")}
            </p>

            <p className="col-span-1 row-span-1 text-[18px] bg-[#22252A] border-[#393B40] border-1  hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5 text-2xl text-center">
              <span className="block font-semibold text-[#9ca3af]">
                Series:
              </span>{" "}
              <span className="text-[#4ade80] text-[24px] font-[700]">
                {selectedExercise.sets}
              </span>
            </p>

            <p className="col-span-1 row-span-1 text-[18px] text-2xl bg-[#22252A] border-[#393B40] border-1  hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5 text-center">
              <span className="block font-semibold text-[#9ca3af]">Reps:</span>{" "}
              <span className="text-[#4ade80] text-[24px] font-[700]">
                {selectedExercise.reps}
              </span>
            </p>
            <p className="col-span-1 row-span-1 text-[18px]  text-2xl bg-[#22252A] border-[#393B40] border-1  hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5 text-center">
              <span className="block font-semibold text-[#9ca3af]">Peso:</span>{" "}
              <span className="text-[#4ade80] text-[24px] font-[700]">
                {selectedExercise.weight}kg
              </span>
            </p>

            <p className="col-span-1 row-span-1 text-[18px]  text-2xl bg-[#22252A] border-[#393B40] border-1  hover:border-[#4ade804D] hover:bg-[#ffffff14] rounded-lg transform hover:-translate-y-0.5 text-center">
              <span className="block font-semibold text-[#9ca3af]">
                Descanso:
              </span>{" "}
              <span className="text-[#4ade80] text-[24px] font-[700]">
                {selectedExercise.rest}s
              </span>
            </p>
          </div>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </Modal>
    </section>
  );
};

export default UserRoutines;
