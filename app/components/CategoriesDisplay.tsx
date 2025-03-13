"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// Tipando a prop categories
interface CategoryType {
  _id: string;
  title: string;
  image: string;
  createdAt: string; // Definindo a data de criação
}

interface CategoriesDisplayProps {
  categories: CategoryType[];
}

const CategoriesDisplay = ({ categories }: CategoriesDisplayProps) => {
  const [isSingleRow, setIsSingleRow] = useState(false);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    // Inicializando o swiper
    swiperRef.current = new Swiper(".images-menu-slider", {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      breakpoints: {
        220: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        660: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        920: {
          slidesPerView: 3,
          loop: false,
        },
        1150: {
          slidesPerView: 4,
          loop: false,
        },
        1300: {
          slidesPerView: 4,
          loop: false,
        },
      },
    });

    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        const isOneRow = swiperInstance.slides.length <= 4;
        setIsSingleRow(isOneRow);
      });
    }

    return () => {
      swiperRef.current?.destroy();
    };
  }, [categories]);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  if (!categories || categories.length === 0) {
    return (
      <p className="text-xl font-semibold text-center">
        Nenhuma categoria encontrada
      </p>
    );
  }

  // Ordenar as categorias de forma crescente (mais antigas primeiro)
  const sortedCategories = categories.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Exibir as 4 primeiras categorias ordenadas
  const displayedCategories = sortedCategories.slice(0, 4);

  return (
    <section
      className="bg-white border bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.droriginals.com.br/imagem/www.droriginals.com.br/1731413443376.png')",
      }}
    >
      <div className="swiper images-menu-slider max-w-[1600px] mx-auto">
        <div className="swiper-wrapper">
          {displayedCategories.map((category) => (
            <div
              className="swiper-slide pt-12 pb-12 min-h-[320px] lg:min-h-[500px]"
              key={category._id}
            >
              <Link href={`/categories/${category._id}`}>
                <div className="relative overflow-hidden max-sm-plus:min-h-[260px] min-h-[320px] lg:min-h-[500px] w-full border-blue-200 border rounded-lg shadow-lg group">
                  <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out transform hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none group-hover:bg-opacity-40 transition duration-300"></div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full max-w-[394px]">
                    <h3 className="font-oswald text-[24px] uppercase xl:text-[40px] lg:text-[36px] md:text-[28px] font-bold tracking-wide">
                      {category.title}
                    </h3>

                    <button className="mt-4 w-3/5 bg-blue-600 hover:bg-blue-700 text-white font-medium uppercase py-3 px-4 rounded-md transition-all duration-300 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 shadow-md">
                      Confira
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="slider-navigation absolute top-1/2 left-0 right-0 flex justify-between items-center w-full transform -translate-y-1/2 px-2 z-10">
          <button
            onClick={handlePrev}
            className="text-[32px] max-sm-plus:text-[24px] text-white hover:text-black bg-transparent p-1 md:p-2 xl-plus:hidden"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="text-[32px] max-sm-plus:text-[24px]  text-white hover:text-black bg-transparent p-1 md:p-2 xl-plus:hidden"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesDisplay;
