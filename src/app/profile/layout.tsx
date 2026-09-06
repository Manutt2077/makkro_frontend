// app/account/layout.tsx
"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  active = false,
  icon,
}) => (
  <div
    className={`shake-trigger flex items-center space-x-2 p-2 px-4 py-2 rounded-lg cursor-pointer  transition-colors  ${
      active ? " text-white" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon && (
      <div
        className={`shake-image w-5 h-5 transition-all ${active ? "" : ""}`}
        style={{
          filter: active
            ? "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)"
            : "grayscale(100%) brightness(0.5)",
        }}
      >
        {icon}
      </div>
    )}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const user = { id: "manutt421" }; // Simulación

  return (
    <main className=" mx-auto flex h-screen max-h-[800px] max-w-[70%] mt-[100px] mb-[100px]">
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
      <div
        className="absolute rounded-full bg-green-400 opacity-30 blur-[120px]"
        style={{
          width: "200px",
          height: "200px",
          top: "55%",
          left: "30%",
        }}
      ></div>

      <div className="w-64 bg-[#141414]/95 backdrop-blur-3xl border border-white/10 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-white">
                {user?.id || "Desconocido"}
              </div>
              <div className="text-xs text-gray-500">Trial Workspace</div>
            </div>
          </div>
        </div>

  
        <div className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            WORKSPACE
          </div>
          <div className="space-y-1">
            <Link href="account">
              <SidebarItem
                label="Account"
                active={pathname === "/profile/account"}
                icon={
                  <Image
                    src="/icons/profile_img_icon.svg"
                    alt="Icono"
                    width={20}
                    height={20}
                    className="opacity-70"
                  />
                }
              />
            </Link>
            <Link href="settings">
              <SidebarItem
                label="Settings"
                active={pathname === "/profile/settings"}
                icon={
                  <Image
                    src="/icons/settings_img_icon.svg"
                    alt="Icono"
                    width={20}
                    height={20}
                    className="opacity-70"
                  />
                }
              />
            </Link>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            PERSONAL
          </div>
          <div className="space-y-1">
            <SidebarItem label="Account" />
            <SidebarItem label="Notifications" />
            <SidebarItem label="Feature Flags" />
            <SidebarItem label="Tokens" />
            <SidebarItem label="Security" />
          </div>
        </div>
      </div>

      <div className="bg-[#2b2b2b]/20 backdrop-blur-sm border border-white/10 shadow flex-1 overflow-auto">
        {children}
      </div>
    </main>
  );
}
