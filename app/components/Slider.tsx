// components/Slider.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SliderProps {
  collections: CollectionType[]; // Defina o tipo das coleções
}

const Slider: React.FC<SliderProps> = ({ collections }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = collections.length;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Mudar o slide automaticamente a cada 4 segundos
    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-all duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {collections.map((collection: CollectionType) => (
          <div key={collection._id} className="flex-shrink-0 w-full">
            <Link href={`/collections/${collection._id}`}>
              <Image
                src={collection.image}
                alt={collection.title}
                width={1920}
                height={800}
                className="w-full max-sm:h-[40vh] h-[70vh] md:h-[60vh] xl:h-[80vh] object-cover" // A imagem ocupará 50% da altura da tela em celulares e 80% em telas maiores
              />
            </Link>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute ml-3 left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center max-sm-plus:px-1 max-sm-plus:pt-1 max-sm-plus:pb-2 px-2 pt-3 pb-4 md:px-4 md:pt-5 md:pb-6 md:text-[48px] max-sm-plus:text-[24px] text-[32px] text-white hover:bg-transparent-hover bg-transparent hover:text-black"
      >
        &lt; {/* Substituído por "<" */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute mr-3 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center max-sm-plus:px-1 max-sm-plus:pt-1 max-sm-plus:pb-2 px-2 pt-3 pb-4 md:px-4 md:pt-5 md:pb-6 md:text-[48px] max-sm-plus:text-[24px] text-[32px] text-white hover:bg-transparent-hover bg-transparent hover:text-black"
      >
        &gt;
      </button>
    </div>
  );
};

export default Slider;
