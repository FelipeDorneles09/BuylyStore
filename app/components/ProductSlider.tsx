"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import HeartFavorite from "./Heart";
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { useState } from "react";

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function SampleNextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow next-arrow"
      style={{
        position: "absolute",
        top: "50%",
        right: "-40px",
        transform: "translateY(-50%)",
        zIndex: 999,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="bg-white p-3 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
        <ChevronRight size={20} />
      </div>
    </div>
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow prev-arrow"
      style={{
        position: "absolute",
        top: "50%",
        left: "-40px",
        transform: "translateY(-50%)",
        zIndex: 999,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="bg-white p-3 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
        <ChevronLeft size={20} />
      </div>
    </div>
  );
}

interface ProductSliderProps {
  products: ProductType[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  const cart = useCart();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

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

  const handleAddToCart = (product: ProductType) => {
    cart.addItem({
      item: product,
      quantity: 1,
      color: product.colors.length > 0 ? product.colors[0] : "",
      size: product.sizes.length > 0 ? product.sizes[0] : "",
    });
  };

  return (
    <div className="w-3/4 m-auto" id="Product">
      <div className="mt-20">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="px-2 py-4">
              <div className="group relative bg-white min-h-[420px] rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="h-full w-full flex justify-center items-center">
                    <img
                      src={product.media[0]}
                      alt={product.title}
                      className="h-48 w-48 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
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
                <div className="flex flex-col p-4 gap-2 flex-grow">
                  <h3 className="text-lg font-semibold line-clamp-1 text-center">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 text-center">
                    {product.description}
                  </p>
                  <div className="flex justify-center mt-2">
                    <span className="text-xl font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-auto pt-4 flex flex-col gap-2">
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
