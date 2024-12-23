import ProductCard from "@/app/components/ProductCard";
import { getCategoriesDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CategoryDetails = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const categoryDetails = await getCategoriesDetails(params.categoryId);

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <p className="mt-12 text-heading1-bold">{categoryDetails.title}</p>
      <div className="mt-8 flex flex-wrap gap-16 justify-center">
        {categoryDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;

export const dynamic = "force-dynamic";
