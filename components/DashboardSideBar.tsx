"use client";

import { useState } from "react";
import {
  Squares2X2Icon, // Dashboard
  WrenchScrewdriverIcon, // Ejercicios
  ClipboardDocumentListIcon, // Rutinas
  CalendarDaysIcon, // Calendario
  Cog6ToothIcon, // Configuración
  UserCircleIcon, // Usuario
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export type PageType =
  | "dashboard"
  | "ejercicios"
  | "rutinas"
  | "calendario"
  | "configuracion";

type HeroIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const menuItems: { title: string; icon: HeroIcon; page: PageType }[] = [
  { title: "Dashboard", icon: Squares2X2Icon, page: "dashboard" },
  { title: "Ejercicios", icon: WrenchScrewdriverIcon, page: "ejercicios" },
  { title: "Rutinas", icon: ClipboardDocumentListIcon, page: "rutinas" },
  { title: "Calendario", icon: CalendarDaysIcon, page: "calendario" },
];

interface AppSidebarProps {
  activePage: PageType;
  onPageChange: (page: PageType) => void;
  username?: string;
}

export function AppSidebar({
  activePage,
  onPageChange,
  username = "manutt421",
}: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={[
        "flex flex-col h-screen bg-zinc-900 border-r border-zinc-800 ",
        "transition-all duration-300 ease-in-out select-none",
        collapsed ? "w-18" : "w-56",
      ].join(" ")}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3  py-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4  text-white "
            >
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
            </svg>
          </span>

          {!collapsed && (
            <span className="text-base font-bold text-white truncate tracking-tight">
              GymTrack
            </span>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`flex-shrink-0 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors ${
            collapsed ? "ml-[40px]" : ""
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5 " />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ── Main nav ────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {!collapsed && (
          <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Menú Principal
          </p>
        )}

        <ul className="space-y-0.5">
          {menuItems.map(({ title, icon: Icon, page }) => {
            const active = activePage === page;
            return (
              <li key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  title={collapsed ? title : undefined}
                  className={[
                    "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-green-500/30 text-green-400 border border-[#0B863F]"
                      : " hover:text-zinc-100",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      active
                        ? "text-green-400"
                        : "text-zinc-500 group-hover:text-zinc-300",
                    ].join(" ")}
                  />
                  {!collapsed && <span className="truncate">{title}</span>}

                  {/* Active pill */}
                  {active  && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-green-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer ──────────────────────────────────────────── */}
      <div className="border-t border-zinc-800 px-2 py-3 space-y-0.5">
        {/* Configuración */}
        <button
          onClick={() => onPageChange("configuracion")}
          title={collapsed ? "Configuración" : undefined}
          className={[
            "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
            activePage === "configuracion"
              ? "bg-indigo-600/20 text-indigo-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
          ].join(" ")}
        >
          <Cog6ToothIcon
            className={[
              "h-5 w-5 flex-shrink-0",
              activePage === "configuracion"
                ? "text-indigo-400"
                : "text-zinc-500 group-hover:text-zinc-300",
            ].join(" ")}
          />
          {!collapsed && <span className="truncate">Configuración</span>}
        </button>

        {/* Usuario */}
        <div
          title={collapsed ? username : undefined}
          className="flex items-center gap-3 rounded-lg px-2 py-2"
        >
          <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-zinc-500" />
          {!collapsed && (
            <span className="truncate text-sm text-zinc-500 font-medium">
              {username}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
