"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function Navbar() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("system");
      applyTheme("system");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setIsDropdownOpen(false);
  };

  const getThemeIcon = (themeType: Theme) => {
    switch (themeType) {
      case "light":
        return <SunIcon className="w-4 h-4" />;
      case "dark":
        return <MoonIcon className="w-4 h-4" />;
      case "system":
        return <MonitorIcon className="w-4 h-4" />;
    }
  };

  const getThemeLabel = (themeType: Theme) => {
    switch (themeType) {
      case "light":
        return "Claro";
      case "dark":
        return "Oscuro";
      case "system":
        return "Sistema";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          <Image
            src="/ruffo.png"
            alt="Ruffo Logo"
            width={32}
            height={32}
            priority
          />
          <span className="sr-only">Inicio</span>
          <span className="text-gray-900 dark:text-gray-50">Actividades</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            prefetch={false}
          >
            Inicio
          </Link>
          <Link
            href="/actividades"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            prefetch={false}
          >
            Actividades
          </Link>
        </nav>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            aria-label="Seleccionar tema"
          >
            {getThemeIcon(theme)}
            <span className="hidden sm:inline">{getThemeLabel(theme)}</span>
            <ChevronDownIcon className="w-3 h-3" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              <div className="py-1">
                {(["light", "dark", "system"] as Theme[]).map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => handleThemeChange(themeOption)}
                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      theme === themeOption
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {getThemeIcon(themeOption)}
                    <span>{getThemeLabel(themeOption)}</span>
                    {theme === themeOption && (
                      <span className="ml-auto text-blue-600 dark:text-blue-400">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
