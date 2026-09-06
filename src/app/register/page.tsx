import RegisterForm from "./../../../components/RegisterForm";

export default function RegisterPage() {
  return (
       <main className="relative min-h-screen flex items-center justify-center bg-[#151518] overflow-hidden">

        <div
          className="absolute rounded-full bg-green-400 opacity-30 blur-[120px]"
          style={{
            width: "500px",
            height: "500px",
            top: "5%",
            left: "10%",
          }}
        ></div>
             
        <div
          className="absolute rounded-full bg-teal-500 opacity-30 blur-[120px]"
          style={{
            width: "500px",
            height: "500px",
            bottom: "10%",
            right: "5%",
          }}
        ></div>
     
      <RegisterForm />
    </main>
  );
}
