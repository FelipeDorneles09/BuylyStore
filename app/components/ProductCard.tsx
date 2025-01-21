"use client";

import Link from "next/link";
import Image from "next/image";
import HeartFavorite from "./Heart";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      className="bg-gray-100  h-[450px] text-black rounded-xl"
      key={product._id}
      href={`/products/${product._id}`}
    >
      <div className="h-56 max-sm-plus:px-2 flex justify-center items-center">
        <img
          src={product.media[0]}
          alt={product.title}
          className="max-sm-plus:max-h-40 h-44 w-44"
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
  );
};

export default ProductCard;
