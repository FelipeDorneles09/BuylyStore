"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowProps } from "react-slick"; // Importe a tipagem correta
import Link from "next/link";
import HeartFavorite from "./Heart";

interface ProductSliderProps {
  products: ProductType[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  // Tipando corretamente os props para os componentes de seta
  function SampleNextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: "999" }}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
        >
          <path
            d="M10.5478 14.7197C10.2549 15.0126 10.2549 15.4874 10.5478 15.7803C10.8407 16.0732 11.3156 16.0732 11.6085 15.7803L14.8585 12.5303C15.1513 12.2374 15.1513 11.7626 14.8585 11.4697L11.6085 8.21967C11.3156 7.92678 10.8407 7.92678 10.5478 8.21967C10.2549 8.51256 10.2549 8.98744 10.5478 9.28033L13.2675 12L10.5478 14.7197Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.3281 2C6.80528 2 2.32812 6.47715 2.32812 12C2.32812 17.5228 6.80528 22 12.3281 22C17.851 22 22.3281 17.5228 22.3281 12C22.3281 6.47715 17.851 2 12.3281 2ZM3.82812 12C3.82812 7.30558 7.6337 3.5 12.3281 3.5C17.0225 3.5 20.8281 7.30558 20.8281 12C20.8281 16.6944 17.0225 20.5 12.3281 20.5C7.6337 20.5 3.82812 16.6944 3.82812 12Z"
            fill="#000000"
          />
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: "999" }}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
        >
          <path
            d="M14.1085 9.28033C14.4013 8.98744 14.4013 8.51256 14.1085 8.21967C13.8156 7.92678 13.3407 7.92678 13.0478 8.21967L9.79779 11.4697C9.5049 11.7626 9.5049 12.2374 9.79779 12.5303L13.0478 15.7803C13.3407 16.0732 13.8156 16.0732 14.1085 15.7803C14.4013 15.4874 14.4013 15.0126 14.1085 14.7197L11.3888 12L14.1085 9.28033Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.3281 2C6.80528 2 2.32812 6.47715 2.32812 12C2.32812 17.5228 6.80528 22 12.3281 22C17.851 22 22.3281 17.5228 22.3281 12C22.3281 6.47715 17.851 2 12.3281 2ZM3.82812 12C3.82812 7.30558 7.6337 3.5 12.3281 3.5C17.0225 3.5 20.8281 7.30558 20.8281 12C20.8281 16.6944 17.0225 20.5 12.3281 20.5C7.6337 20.5 3.82812 16.6944 3.82812 12Z"
            fill="#000000"
          />
        </svg>
      </div>
    );
  }

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 728,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {products.map((product) => (
            <Link
              className="bg-gray-50 h-[450px] text-black rounded-xl"
              key={product._id}
              href={`/products/${product._id}`}
            >
              <div className="h-56 flex justify-center items-center">
                <img
                  src={product.media[0]}
                  alt={product.title}
                  className="h-44 w-44"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <div className="flex justify-between w-full items-center">
                  <span className="text-blue-500">{"★".repeat(5)}</span>
                  <HeartFavorite product={product} />
                </div>
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="description text-[12px]">{product.description}</p>
                <div className="w-full flex justify-center items-center">
                  <button className="w-full text-lg font-semibold text-white bg-blue-500 py-2">
                    R${product.price.toFixed(2)}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
