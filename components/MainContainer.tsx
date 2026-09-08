import { ReactNode } from "react";
import BreathingDots from "./BreathingDots";

interface MainContainerProps {
  children?: ReactNode;
  className?: string;
}



export default function MainContainerProps({ children, className = "" }: MainContainerProps) {
  return (
    <main
      className={`relative flex-1 overflow-y-auto flex items-center justify-center ${className}`}
    >
      <BreathingDots />
      {children}
    </main>
  );
}