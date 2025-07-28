import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GamepadIcon, MusicIcon, TrophyIcon, Volleyball } from "lucide-react";

const activities = [
  {
    id: "juego-de-streamings",
    title: "Juego de Streamings",
    description: "Selecciona el stream perfecto para cada personaje",
    icon: <GamepadIcon className="w-8 h-8" />,
    difficulty: "Fácil",
    participants: "1.2k",
    status: "Disponible",
    href: "/juego-de-streamings",
  },
  {
    id: "quiz-musical",
    title: "Armá tu banda de death metal",
    description:
      "Producí tu propia banda de death metal eligiendo los mejores músicos y canciones.",
    icon: <MusicIcon className="w-8 h-8" />,
    difficulty: "Medio",
    participants: "856",
    status: "Próximamente",
    href: "#",
  },
  {
    id: "desafio-visual",
    title: "El 11 perfecto",
    description:
      "Crea el equipo de fútbol ideal eligiendo jugadores de diferentes categorías.",
    icon: <Volleyball className="w-8 h-8" />,
    difficulty: "Difícil",
    participants: "432",
    status: "Próximamente",
    href: "#",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Fácil":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Medio":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Difícil":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Disponible":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Próximamente":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function ActividadesPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Actividades Disponibles
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explora nuestras diferentes actividades interactivas. Desde juegos
            de clasificación hasta desafíos creativos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-full w-fit">
                  {activity.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {activity.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {activity.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(activity.difficulty)}>
                    {activity.difficulty}
                  </Badge>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter>
                {activity.status === "Disponible" ? (
                  <Link href={activity.href} className="w-full">
                    <Button className="w-full" variant="default">
                      Jugar Ahora
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Próximamente
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
