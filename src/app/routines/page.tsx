"use client";

import { useState } from "react";
import RoutinesUser from "./../../../components/RoutinesUser";
import { AppSidebar, PageType } from "../../../components/DashboardSideBar";

export default function RutinasPage() {
  const [activePage, setActivePage] = useState<PageType>("rutinas");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#151518]"> 
      <AppSidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="relative flex-1 overflow-y-auto flex items-center justify-center">
        <div
          className="absolute rounded-full bg-green-400 opacity-30 blur-[120px] pointer-events-none"
          style={{ width: "500px", height: "500px", top: "5%", left: "10%" }}
        />
        <div
          className="absolute rounded-full bg-teal-500 opacity-30 blur-[120px] pointer-events-none"
          style={{ width: "500px", height: "500px", bottom: "10%", right: "5%" }}
        />
        <RoutinesUser />
      </main>
    </div>
  );
}