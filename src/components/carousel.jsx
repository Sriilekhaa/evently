import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?q=80&w=1470&fit=crop",
    alt: "Web3 Innovation Summit",
    title: "Web3 Innovation Summit 2024"
  },
  {
    src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&fit=crop",
    alt: "AI & Blockchain Forum",
    title: "AI & Blockchain Convergence Forum"
  },
  {
    src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1470&fit=crop",
    alt: "DeFi Workshop",
    title: "DeFi Development Workshop"
  },
  {
    src: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1512&fit=crop",
    alt: "Metaverse Gaming",
    title: "Metaverse Gaming Conference"
  }
];

export function CarouselDemo() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-sm:hidden">
      <CarouselContent>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex relative h-[40vh] w-full p-0 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">
                      {image.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
