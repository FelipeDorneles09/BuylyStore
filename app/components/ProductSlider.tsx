"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import HeartFavorite from "./Heart";
import { Eye, ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { useState } from "react";

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface ProductSliderProps {
  products: ProductType[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  // Get cart from hook
  const cart = useCart();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  // Function to update user state when wishlist changes
  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  // Arrow components for the slider
  function SampleNextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: "999" }}
        onClick={onClick}
      >
        <div className="bg-white p-3 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
          <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M10.5478 14.7197C10.2549 15.0126 10.2549 15.4874 10.5478 15.7803C10.8407 16.0732 11.3156 16.0732 11.6085 15.7803L14.8585 12.5303C15.1513 12.2374 15.1513 11.7626 14.8585 11.4697L11.6085 8.21967C11.3156 7.92678 10.8407 7.92678 10.5478 8.21967C10.2549 8.51256 10.2549 8.98744 10.5478 9.28033L13.2675 12L10.5478 14.7197Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3281 2C6.80528 2 2.32812 6.47715 2.32812 12C2.32812 17.5228 6.80528 22 12.3281 22C17.851 22 22.3281 17.5228 22.3281 12C22.3281 6.47715 17.851 2 12.3281 2ZM3.82812 12C3.82812 7.30558 7.6337 3.5 12.3281 3.5C17.0225 3.5 20.8281 7.30558 20.8281 12C20.8281 16.6944 17.0225 20.5 12.3281 20.5C7.6337 20.5 3.82812 16.6944 3.82812 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, zIndex: "999" }}
        onClick={onClick}
      >
        <div className="bg-white p-3 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
          <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M14.1085 9.28033C14.4013 8.98744 14.4013 8.51256 14.1085 8.21967C13.8156 7.92678 13.3407 7.92678 13.0478 8.21967L9.79779 11.4697C9.5049 11.7626 9.5049 12.2374 9.79779 12.5303L13.0478 15.7803C13.3407 16.0732 13.8156 16.0732 14.1085 15.7803C14.4013 15.4874 14.4013 15.0126 14.1085 14.7197L11.3888 12L14.1085 9.28033Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3281 2C6.80528 2 2.32812 6.47715 2.32812 12C2.32812 17.5228 6.80528 22 12.3281 22C17.851 22 22.3281 17.5228 22.3281 12C22.3281 6.47715 17.851 2 12.3281 2ZM3.82812 12C3.82812 7.30558 7.6337 3.5 12.3281 3.5C17.0225 3.5 20.8281 7.30558 20.8281 12C20.8281 16.6944 17.0225 20.5 12.3281 20.5C7.6337 20.5 3.82812 16.6944 3.82812 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
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

  // Function to handle adding to cart with default options
  const handleAddToCart = (product: ProductType) => {
    cart.addItem({
      item: product,
      quantity: 1,
      color: product.colors.length > 0 ? product.colors[0] : "",
      size: product.sizes.length > 0 ? product.sizes[0] : "",
    });
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="px-2 py-4">
              <div className="group relative bg-white min-h-[420px] rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
                {/* Imagem do produto com overlay */}
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="h-full w-full flex justify-center items-center">
                    <img
                      src={product.media[0]}
                      alt={product.title}
                      className="h-48 w-48 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay com ações */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link href={`/products/${product._id}`}>
                      <button className="p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                        <Eye size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <div className="p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                      <HeartFavorite
                        product={product}
                        updateSignedInUser={updateSignedInUser}
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do produto */}
                <div className="flex flex-col p-4 gap-2 flex-grow">
                  {/* Título do produto */}
                  <h3 className="text-lg font-semibold line-clamp-1 text-center">
                    {product.title}
                  </h3>

                  {/* Descrição do produto */}
                  <p className="text-sm text-gray-600 line-clamp-2 text-center">
                    {product.description}
                  </p>

                  {/* Preço do produto */}
                  <div className="flex justify-center mt-2">
                    <span className="text-xl font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Buttons container with margin-top auto to push to bottom */}
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    {/* Buy now button */}
                    <Link href={`/products/${product._id}`} className="w-full">
                      <button className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg transition-colors hover:bg-blue-600">
                        Comprar Agora
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
