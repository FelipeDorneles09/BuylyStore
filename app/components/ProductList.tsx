import { getProducts } from "@/lib/actions/actions";
import React from "react";
import ProductSlider from "./ProductSlider";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <div
      id="Products"
      className="flex flex-col items-center gap-4 md:gap-10 py-10 md:py-16"
    >
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-center">Os melhores produtos</p>
        <p className="text-heading1-bold font-bold text-center">Produtos</p>
      </div>

      <div className="w-16 h-[2px] bg-blue-500 mx-auto"></div>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">Nenhum produto encontrado</p>
      ) : (
        <ProductSlider products={products} />
      )}
    </div>
  );
};

export default ProductList;
