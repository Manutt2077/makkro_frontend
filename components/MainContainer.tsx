import { ReactNode } from "react";

interface MainContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function MainContainerProps({ children, className = "" }: MainContainerProps) {
  return (
  <main
  className={`relative flex-1 overflow-y-auto flex items-center justify-center ${className}`}
>
 
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle, #ffffff12 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />

  {children}
</main>
  );
}