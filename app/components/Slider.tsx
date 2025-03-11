"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Importe os módulos necessários
Swiper.use([Navigation, Autoplay]);

interface SliderProps {
  collections: CollectionType[]; // Defina o tipo das coleções
}

const Slider: React.FC<SliderProps> = ({ collections }) => {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperRef.current) {
      swiperRef.current = new Swiper(".slider-container", {
        loop: true, // Ativa o loop infinito
        speed: 500, // Velocidade da transição (ms)
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 4000, // Mudar o slide automaticamente a cada 4 segundos
          disableOnInteraction: false, // Continua o autoplay após interação do usuário
        },
        navigation: {
          nextEl: ".slider-button-next",
          prevEl: ".slider-button-prev",
        },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [collections]);

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <div id="Home" className="relative w-full overflow-hidden">
      <div className="swiper slider-container">
        <div className="swiper-wrapper">
          {collections.map((collection: CollectionType) => (
            <div key={collection._id} className="swiper-slide">
              <Link href={`/collections/${collection._id}`}>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={1920}
                  height={800}
                  className="w-full max-sm:h-[40vh] h-[70vh] md:h-[60vh] xl:h-[80vh] object-cover"
                />
              </Link>
            </div>
          ))}
        </div>

        <button className="slider-button-prev absolute ml-3 left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center max-sm-plus:px-1 max-sm-plus:pt-1 max-sm-plus:pb-2 px-2 pt-3 pb-4 md:px-4 md:pt-5 md:pb-6 md:text-[48px] max-sm-plus:text-[24px] text-[32px] text-white hover:bg-transparent-hover bg-transparent hover:text-black z-10">
          &lt;
        </button>
        <button className="slider-button-next absolute mr-3 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center max-sm-plus:px-1 max-sm-plus:pt-1 max-sm-plus:pb-2 px-2 pt-3 pb-4 md:px-4 md:pt-5 md:pb-6 md:text-[48px] max-sm-plus:text-[24px] text-[32px] text-white hover:bg-transparent-hover bg-transparent hover:text-black z-10">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;
