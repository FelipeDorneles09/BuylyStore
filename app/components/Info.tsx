"use client";

import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";

const FeatureSection: React.FC = () => {
  useEffect(() => {
    const featureSwiper = new Swiper("#feature-swiper", {
      direction: "horizontal",
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        350: {
          slidesPerView: 2,
        },
        580: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
        },
        1350: {
          slidesPerView: 3,
        },
      },
      navigation: {
        nextEl: "#feature-swiper-next",
        prevEl: "#feature-swiper-prev",
      },
    });

    return () => {
      featureSwiper.destroy();
    };
  }, []);

  return (
    <section className="bg-black text-white py-4 md:py-8 " id="features">
      <div id="feature-swiper" className="swiper max-w-screen-xl mx-auto">
        <div className="swiper-wrapper max-sm-plus:pl-2 md:pl-8">
          <div className="swiper-slide flex items-center justify-center gap-5 p-2 max-sm-plus:ml-0 ml-4 lg:ml-8">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.3em"
                viewBox="0 0 576 512"
                className="text-white max-sm-plus:h-[1.4rem]"
              >
                <path
                  fill="currentColor"
                  d="M32 64l0 64 512 0 0-64L32 64zm0 96l0 64 512 0 0-64L32 160zm0 96l0 192 512 0 0-192L32 256zM0 32l32 0 512 0 32 0 0 32 0 384 0 32-32 0L32 480 0 480l0-32L0 64 0 32zM96 352l96 0 0 32-96 0 0-32zm128 0l160 0 0 32-160 0 0-32z"
                />
              </svg>
              <div className="flex flex-col font-semibold">
                <span className="max-sm-plus:text-[13px] font-semibold text-[17px]">
                  Diversas formas
                </span>
                <span className="max-sm-plus:text-[13px] text-[17px]">
                  De pagamento
                </span>
              </div>
            </div>
          </div>

          <div className="swiper-slide flex items-center justify-center gap-5 p-2 ml-0 mr-2 lg:ml-8">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.3em"
                viewBox="0 0 384 512"
                className="text-white max-sm-plus:h-[1.4rem]"
              >
                <path
                  fill="currentColor"
                  d="M64 96a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 96A64 64 0 1 0 64 64a64 64 0 1 0 0 128zM320 352a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 96a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM379.3 91.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-352 352c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l352-352z"
                />
              </svg>
              <div className="flex flex-col font-semibold">
                <span className="max-sm-plus:text-[13px] text-[17px]">
                  5% de desconto
                </span>
                <span className="max-sm-plus:text-[13px] text-[17px]">
                  Nas compras via pix
                </span>
              </div>
            </div>
          </div>

          <div className="swiper-slide flex items-center justify-center gap-5 p-2">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2.3em"
                viewBox="0 0 448 512"
                className="text-white max-sm-plus:h-[1.4rem]"
              >
                <path
                  fill="currentColor"
                  d="M160 96l0 32 128 0 0-32c0-35.3-28.7-64-64-64s-64 28.7-64 64zm-32 64l-96 0 0 320 384 0 0-320-96 0 0 80 0 16-32 0 0-16 0-80-128 0 0 80 0 16-32 0 0-16 0-80zm0-32l0-32c0-53 43-96 96-96s96 43 96 96l0 32 96 0 32 0 0 32 0 320 0 32-32 0L32 512 0 512l0-32L0 160l0-32 32 0 96 0z"
                />
              </svg>
              <div className="flex flex-col font-semibold">
                <span className="font-semibold max-sm-plus:text-[13px] text-[17px]">
                  Compras simples
                </span>
                <span className="max-sm-plus:text-[13px] text-[17px]">
                  E rápidas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
