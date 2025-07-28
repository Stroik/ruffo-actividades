import Link from "next/link";
import Image from "next/image";

export function Navbar() {
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
      </div>
    </header>
  );
}
