"use client";

import React, { useState, useEffect } from "react";
import ProductCardSlider from "./ProductCardSlider";

interface ProductSliderProps {
  products: ProductType[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4); // Número inicial de itens por visualização

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 580) {
        setItemsPerView(1); // 1 produto por vez em telas muito pequenas
      } else if (width < 768) {
        setItemsPerView(2); // 2 produtos por vez em telas pequenas
      } else if (width < 1024) {
        setItemsPerView(3); // 3 produtos por vez em telas médias
      } else {
        setItemsPerView(4); // 4 produtos por vez em telas grandes
      }
    };

    updateItemsPerView(); // Chama na inicialização
    window.addEventListener("resize", updateItemsPerView); // Atualiza ao redimensionar a tela

    return () => window.removeEventListener("resize", updateItemsPerView); // Limpeza do evento
  }, []);

  useEffect(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex, products.length - itemsPerView)
    );
  }, [itemsPerView, products.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerView, products.length - itemsPerView)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerView, 0));
  };

  return (
    <div
      id="card-slider-2_1731412961206_27"
      className="card-slider-2 w-full h-[50vh] mx-auto mt-8 mb-12"
    >
      <div className="relative flex items-center h-full overflow-hidden">
        <button
          className="absolute left-0 hover:bg-black hover:text-white text-heading2-bold z-10"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>

        <div className="swiper-wrapper flex overflow-hidden h-full">
          <div
            className="flex transition-transform duration-300 h-full"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              width: `${(100 / itemsPerView) * products.length}%`,
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="swiper-slide flex-shrink-0 h-full"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <ProductCardSlider product={product} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute right-0 hover:bg-black hover:text-white text-heading2-bold z-10"
          onClick={handleNext}
          disabled={currentIndex >= products.length - itemsPerView}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
