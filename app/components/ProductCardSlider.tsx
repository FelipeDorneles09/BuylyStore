"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: ProductType;
}

const ProductCardSlider = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-none  w-full h-full"
    >
      {/* Imagem do Produto */}
      <div className="relative w-full h-full flex justify-center items-center pt-6 rounded-t-lg">
        <Image
          src={product.media[0]}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="pt-6"
        />
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-col justify-between  md:gap-4 py-10 md:h-1/3 h-1/2">
        <h3 className="sm:text-heading4-bold text-[17px] font-semibold text-center">
          {product.title}
        </h3>

        {/* Preço e Parcelas */}
        <div className="flex flex-col items-center">
          <p className="text-body-semibold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            ou 6x de ${(product.price / 6).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardSlider;
