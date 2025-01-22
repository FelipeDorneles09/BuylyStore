import ProductCard from "@/app/components/ProductCard";
import { getSearchedProducts } from "@/lib/actions/actions";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-10 max-sm-plus:px-0 max-sm-plus:py-2 py-5 ">
      <p className="text-heading3-bold my-10 max-sm-plus:px-2">
        Resultados encontrados para {decodedQuery}
      </p>
      {!searchedProducts ||
        (searchedProducts.length === 0 && (
          <p className="text-body-bold my-5">Nenhum resultado encontrado</p>
        ))}
      <div className="mt-8 flex flex-wrap gap-6 sm:gap-10 md:gap-14 justify-center">
        {searchedProducts?.map((product: any) => (
          <div
            className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/5 bg-gray-50"
            key={product._id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

export const dynamic = "force-dynamic";
