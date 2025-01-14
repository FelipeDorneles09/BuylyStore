"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="flex flex-col items-center gap-4 w-[265px]  md:w-[220px] lg:w-[280px] xl:w-[300px]  p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Imagem do Produto */}
      <div className="relative w-full h-48 flex justify-center items-center pt-6 rounded-t-lg">
        <Image
          src={product.media[0]}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain pt-6"
        />
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-col justify-between pt-12 p-4 md:pt-10 md:p-6 h-36">
        <h3 className="text-md font-medium text-center text-gray-800">
          {product.title}
        </h3>

        {/* Preço e Parcelas */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            ou 6x de ${(product.price / 6).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
