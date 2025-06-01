import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Contenido principal con fondo #151518 */}
       <main className="pt-24 bg-[#151518] min-h-screen flex flex-col items-center text-white">
      {/* Hero principal */}
      <section className="w-full max-w-6xl min-h-[800px] flex flex-col md:flex-row items-center justify-between px-6 text-center md:text-left border-b border-white/10 gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Monitorea tu progreso en el gimnasio</h2>
          <p className="text-lg mb-6 max-w-xl">
            Lleva tus rutinas, notas y progreso en una app simple y poderosa.
          </p>
          <a
            href="#registro"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            Empieza ahora
          </a>
        </div>
    
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-20 bg-[#151518] max-w-6xl w-full mx-auto px-6  border-b border-white/10 gap-8">
        <h3 className="text-3xl font-bold mb-12 text-center">Beneficios</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl border  border-white/10 shadow text-center ">
              <Image
              src="/progress_img_example.svg" // imagen en public/
              alt="Descripción de la imagen"
              width={120}
              height={50}
              className="mx-auto mb-10"
            />
            <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#2a8f3e] via-[#43d660] to-[#6dff8a] text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(67,214,96,0.4)]">
              Seguimiento de Progreso
            </h4>
            <p>Registra tus entrenamientos, pesos, repeticiones y mejora semana a semana.</p>
          </div>
          <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow text-center">
            <Image
              src="/note_img_example.svg" // imagen en public/
              alt="Descripción de la imagen"
              width={120}
              height={50}
              className="mx-auto mb-10"
            />
            <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#2a8f3e] via-[#43d660] to-[#6dff8a] text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(67,214,96,0.4)]">Observaciones</h4>
            <p>Agrega observaciones sobre tu estado físico o tus rutinas.</p>
          </div>
          <div className="p-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow text-center">
               <Image
              src="/objective_img_example.svg" // imagen en public/
              alt="Descripción de la imagen"
              width={120}
              height={50}
              className="mx-auto mb-10"
            />
            <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#2a8f3e] via-[#43d660] to-[#6dff8a] text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(67,214,96,0.4)]">Objetivos Claros</h4>
            <p>Define metas y ve tu evolución de manera visual.</p>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="funciona" className="py-20 bg-[#151518] max-w-6xl w-full mx-auto px-6  border-b border-white/10 gap-8">
        <h3 className="text-3xl font-bold mb-12 text-center">¿Cómo funciona?</h3>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-2xl font-semibold mb-4">1. Regístrate y crea tu perfil</h4>
            <p className="text-lg">Configura tus objetivos, preferencias y comienza en segundos.</p>
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
            <h4 className="text-2xl font-semibold mb-4">2. Registra y visualiza tu progreso</h4>
            <p className="text-lg">Accede a estadísticas claras y gráficas sobre tu desempeño físico.</p>
          </div>
        </div>
      </section>

      {/* Registro */}
      <section id="registro" className="py-20 bg-[#151518] max-w-6xl w-full mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h3>
        <p className="text-lg mb-6">Regístrate gratis y lleva tu progreso al siguiente nivel.</p>
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
