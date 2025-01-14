"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const CategoriesDisplay = ({ categories }) => {
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
      <p className="text-xl font-semibold text-center">No categories found</p>
    );
  }

  // Ordenar as categorias de forma crescente (mais antigas primeiro)
  const sortedCategories = categories.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
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
                <div className="relative overflow-hidden min-h-[320px] lg:min-h-[500px] w-full border-grey-2 border group">
                  <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out border border-white transform hover:scale-105 hover:filter hover:brightness-110 hover:contrast-110 hover:saturate-110"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl font-semibold max-w-[394px] w-full">
                    <h3 className="text-shadow-lg font-oswald text-[24px] uppercase xl:text-[40px] lg:text-[36px] md:text-[28px]">
                      {category.title}
                    </h3>

                    <button className="mt-2 w-3/5 bg-red-600 hover:bg-gray-900 text-white font-medium uppercase py-2 px-4 transition-all duration-300 opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0">
                      Confira
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="slider-navigation absolute top-1/2 left-0 right-0 flex justify-between items-center w-full transform -translate-y-1/2 px-2 z-10">
          <button
            onClick={handlePrev}
            className="text-[32px] text-white hover:text-black bg-transparent p-1 md:p-2 xl-plus:hidden"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="text-[32px] text-white hover:text-black bg-transparent p-1 md:p-2 xl-plus:hidden"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesDisplay;
