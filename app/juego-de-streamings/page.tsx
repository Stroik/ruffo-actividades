"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const voteOptions = ["Luzu", "Olga", "Blender", "Carajo", "Gelatina"];

type Vote = {
  image: string;
  category: string;
};

export default function ActividadPage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [usedImages, setUsedImages] = useState<string[]>([]);
  const [votedCategory, setVotedCategory] = useState<string | null>(null);
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [used, setUsed] = useState<string[]>([]);

  const allImagesRef = useRef<string[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const res = await fetch("/api/characters/list");
      const { images } = await res.json();
      allImagesRef.current = images;
    };
    loadAll();
  }, []);

  useEffect(() => {
    const savedVotes = localStorage.getItem("votos");
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
    loadImage();
  }, []);

  useEffect(() => {
    localStorage.setItem("votos", JSON.stringify(votes));
  }, [votes]);

  const loadImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/characters/random");
      if (!res.ok) throw new Error(res.statusText);
      const { image } = await res.json();

      // Si ya se mostró esa imagen, pedí otra
      if (usedImages.includes(image)) {
        if (usedImages.length >= allImagesRef.current.length) {
          setDone(true);
          setCurrentImage(null);
          return;
        }
        loadImage(); // intentar de nuevo
        return;
      }

      setCurrentImage(image);
      setUsedImages((prev) => [...prev, image]);
    } catch {
      setError("No se pudo cargar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAndPreload = async () => {
      const res = await fetch("/api/characters/list");
      const { images } = await res.json();

      // Precargar en memoria
      images.forEach((src: string) => {
        const img = document.createElement("img");
        img.src = src;
      });

      setImagePool(images);
      setUsed([]);
      setDone(false);
      showNextImage(images, []);
    };

    loadAndPreload();
  }, []);

  const showNextImage = (pool = imagePool, usedImages = used) => {
    const remaining = pool.filter((img) => !usedImages.includes(img));

    if (remaining.length === 0) {
      setDone(true);
      setCurrentImage(null);
      return;
    }

    const next = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentImage(next);
    setUsed((prev) => [...prev, next]);
  };

  const handleVote = (category: string) => {
    if (!currentImage || done) return;
    setVotedCategory(category);
    setVotes((v) => [...v, { image: currentImage, category }]);
    setTimeout(() => {
      setVotedCategory(null);
      showNextImage();
    }, 500);
  };

  const handleReset = async () => {
    localStorage.removeItem("votos");
    setVotes([]);
    setUsed([]);
    setDone(false);
    showNextImage(imagePool, []);
  };

  const handleLogoByCategory = (category: string): string => {
    switch (category.toLowerCase()) {
      case "luzu":
        return "/logos/luzu-logo-100x100.png";
      case "olga":
        return "/logos/olga-logo-100x100.png";
      case "blender":
        return "/logos/blender-logo-100x100.png";
      case "carajo":
        return "/logos/carajo-logo-100x100.png";
      case "gelatina":
        return "/logos/gelatina-logo-100x100.png";
      default:
        return "/logos/default-logo-100x100.png";
    }
  };

  const B = 140;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <main
        className="flex-grow flex flex-col items-center justify-center p-4 md:p-6"
        style={{ paddingBottom: !done ? `${B + 24}px` : undefined }}
      >
        <AnimatePresence>
          {votedCategory && (
            <motion.div
              key="vote-feedback"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow-xl">
                <Image
                  src={handleLogoByCategory(votedCategory)}
                  alt={votedCategory}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {loading ? (
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl">
                Buscando personajes...
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-4">
              <Skeleton className="w-full h-[400px] rounded-lg" />
            </CardContent>
            <CardFooter className="flex justify-center gap-2 p-4">
              {voteOptions.map((o) => (
                <Skeleton key={o} className="min-w-[100px] h-10" />
              ))}
            </CardFooter>
          </Card>
        ) : error ? (
          <Card className="w-full max-w-2xl shadow-lg text-center p-8">
            <CardTitle className="text-red-500 text-2xl mb-4">
              Wopiti, algo ha fallado
            </CardTitle>
            <p className="text-gray-700 dark:text-gray-300">{error}</p>
            <Button onClick={loadImage} className="mt-6">
              Volver a jugar
            </Button>
          </Card>
        ) : done ? (
          <Card className="w-full max-w-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl">
                ¡Gracias por participar!
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4 p-4">
              {votes.map((v, i) => (
                <div
                  key={i}
                  className="w-32 flex flex-col items-center relative"
                >
                  <Image
                    src={v.image}
                    alt={v.category}
                    width={120}
                    height={120}
                    className="rounded-md object-cover aspect-square border border-gray-200 dark:border-gray-600"
                  />
                  <Image
                    src={handleLogoByCategory(v.category)}
                    alt={v.category}
                    width={40}
                    height={40}
                    className="mt-2 rounded-md absolute bottom-2"
                  />
                </div>
              ))}
            </CardContent>
            {done && (
              <CardFooter className="justify-center">
                <Button variant="outline" onClick={handleReset}>
                  Reiniciar
                </Button>
              </CardFooter>
            )}
          </Card>
        ) : (
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl">
                ¿A qué streaming pertenece?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-4">
              <Image
                src={currentImage || "/fin.png"}
                alt="Imagen aleatoria"
                width={600}
                height={400}
                className="rounded-lg object-contain max-h-[400px] w-full"
                priority
              />
            </CardContent>
            <CardFooter className="flex flex-wrap justify-center gap-4 p-4">
              {voteOptions.map((opt) => (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={opt}
                  onClick={() => handleVote(opt)}
                  className="p-1"
                >
                  <Image
                    src={`/logos/${opt.toLowerCase()}-logo-100x100.png`}
                    alt={opt}
                    width={80}
                    height={80}
                    className="rounded-md object-cover cursor-pointer"
                  />
                </motion.button>
              ))}
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
