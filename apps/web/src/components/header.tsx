import { Link } from "@tanstack/react-router";
import { ModeSwitcher } from "./mode-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-sidebar/80 backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/50">
      <div className="container relative flex h-16 w-full items-center justify-between gap-2 px-4 sm:px-6">
        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5 font-heading text-2xl sm:text-[1.625em]">
          <Link to="/">Lective</Link>
        </div>
        <div className="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
