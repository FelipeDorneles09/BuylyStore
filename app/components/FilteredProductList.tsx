"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface FilteredProductListProps {
  products: ProductType[];
}

const FilteredProductList = ({ products }: FilteredProductListProps) => {
  const [sortOrder, setSortOrder] = useState("recent");
  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price; // Menor preço
      } else if (sortOrder === "desc") {
        return b.price - a.price; // Maior preço
      } else if (sortOrder === "recent") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ); // Mais recentes
      }
      return 0;
    });
    setSortedProducts(sorted);
  }, [sortOrder, products]);

  return (
    <div>
      {/* Dropdown para selecionar a ordem */}
      <div className="flex sm:ml-auto sm:mt-0 mt-4 w-full sm:w-auto">
        <select
          className="border p-2 rounded-md text-body-medium"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="recent">Recente</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>

      {/* Grid de produtos - ajustado para melhor responsividade */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <div className="w-full" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredProductList;
