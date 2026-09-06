import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="pt-24 bg-[#151518] min-h-screen flex flex-col items-center text-white">
        <section className="w-full  z-10  min-h-[600px] flex flex-col md:flex-row items-center justify-center px-6 text-center md:text-left bg-[#171A21]/60 backdrop-blur-3xl border-white/10 shadow ">
          <div
            className="absolute z-0  rounded-full bg-green-400 opacity-30 blur-[120px]"
            style={{
              width: "500px",
              height: "500px",
              top: "20%",
              left: "80%",
            }}
          ></div>
          <div className="mx-auto  flex flex-col md:flex-row items-center justify-between gap-8 max-w-[90%] w-full">
            <div className="flex-1 w-[40%] h-[700px] flex flex-col items-center ">
              <h2 className="text-[58px] font-bold mb-4 mt-[10%] text-center ">
                Transforma tu Fitness con
                <strong className="brilliant text-[58px]"> Makkro</strong>
              </h2>
              <p className="glass-text sheen text-white/60 leading-relaxed mb-6 max-w-xl text-[28px]">
                La plataforma definitiva para planificar, seguir y optimizar tus
                entrenamientos. Únete a más de 50,000 atletas que ya están
                transformando sus vidas.
              </p>
              <a
                href="#registro"
                className="text-center flex justify-center items-center gap-2 bg-green-500/80
                            hover:bg-green-500 px-6 py-3 rounded-lg text-white font-medium shadow-lg shadow-green-500/25 
                              transition-all duration-200 hover:scale-105 active:scale-95 hover:cursor-pointer"
              >
                Empieza ahora
              </a>
            </div>
            <div className="w-full max-w-[60%]  ">
              <Image
                src="/profile/laptop_example.png"
                alt="Imagen de ejemplo"
                width={800}
                height={600}
              />
            </div>
          </div>
        </section>
        <section
          id="beneficios"
          className="py-20 bg-[#151518] max-w-6xl w-full mx-auto px-6  border-b border-white/10 gap-8"
        >
          <h3 className="text-3xl font-bold mb-12 text-center">Beneficios</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl border  border-white/10 shadow text-center ">
              <Image
                src="/progress_img_example.svg" 
                alt="Descripción de la imagen"
                width={120}
                height={50}
                className="mx-auto mb-10"
              />
              <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#2a8f3e] via-[#43d660] to-[#6dff8a] text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(67,214,96,0.4)]">
                Seguimiento de Progreso
              </h4>
              <p>
                Registra tus entrenamientos, pesos, repeticiones y mejora semana
                a semana.
              </p>
            </div>
            <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow text-center">
              <Image
                src="/note_img_example.svg" 
                alt="Descripción de la imagen"
                width={120}
                height={50}
                className="mx-auto mb-10"
              />
              <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#2a8f3e] via-[#43d660] to-[#6dff8a] text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(67,214,96,0.4)]">
                Observaciones
              </h4>
              <p>Agrega observaciones sobre tu estado físico o tus rutinas.</p>
            </div>
            <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow text-center">
              <Image
                src="/objective_img_example.svg"
                alt="Descripción de la imagen"
                width={120}
                height={50}
                className="mx-auto mb-10"
              />
              <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#2a8f3e] via-[#43d660] to-[#6dff8a] text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(67,214,96,0.4)]">
                Objetivos Claros
              </h4>
              <p>Define metas y ve tu evolución de manera visual.</p>
            </div>
          </div>
        </section>

        <section
          id="funciona"
          className="py-20 bg-[#151518] max-w-6xl w-full mx-auto px-6  border-b border-white/10 gap-8"
        >
          <h3 className="text-3xl font-bold mb-12 text-center">
            ¿Cómo funciona?
          </h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-4">
                1. Regístrate y crea tu perfil
              </h4>
              <p className="text-lg">
                Configura tus objetivos, preferencias y comienza en segundos.
              </p>
            </div>
            <img
              src="/images/step-register.png"
              alt="Registro"
              className="w-full max-w-sm mx-auto rounded-xl shadow"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <img
              src="/images/step-track.png"
              alt="Seguimiento"
              className="w-full max-w-sm mx-auto rounded-xl shadow"
            />
            <div>
              <h4 className="text-2xl font-semibold mb-4">
                2. Registra y visualiza tu progreso
              </h4>
              <p className="text-lg">
                Accede a estadísticas claras y gráficas sobre tu desempeño
                físico.
              </p>
            </div>
          </div>
        </section>

        <section
          id="registro"
          className="py-20 bg-[#151518] max-w-6xl w-full mx-auto px-6 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h3>
          <p className="text-lg mb-6">
            Regístrate gratis y lleva tu progreso al siguiente nivel.
          </p>
          <a
            href="#"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            Crear cuenta
          </a>
        </section>
      </main>
    </>
  );
}
