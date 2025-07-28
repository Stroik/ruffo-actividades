import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex-grow flex items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4 py-12 md:py-24 lg:py-32 h-full">
        <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center">
          <Image
            src="/ruffo.png"
            alt="Ruffo Logo"
            width={150}
            height={150}
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
            Las actividades de Ruffo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            Se parte de las actividades de Ruffito. Clasificá dinosaurios, armá
            tu equipo ideal o tu gobierno de ensueño. De rancios para rancios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/actividad" passHref>
              <Button size="lg" className="w-full sm:w-auto" variant="outline">
                Ver actividades
              </Button>
            </Link>
            <Link
              href="https://hagoverso.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-transparent"
              >
                Más Información
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
