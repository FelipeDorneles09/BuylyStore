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
      className="flex flex-col shadow-none w-full h-full"
    >
      {/* Imagem do Produto */}
      <div className="relative w-full max-sm-plus:h-[40vh]  h-[60%] max-sm:mt-8 mt-4 flex justify-center items-center rounded-t-lg">
        <Image
          src={product.media[0]}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="max-w-full max-h-full"
        />
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-col justify-center items-center gap-2 sm:pt-4 md:gap-4 md:h-1/3 h-1/4">
        <h3 className="text-heading4-bold font-semibold text-center sm:text-base max-sm-plus:text-[14px]">
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
