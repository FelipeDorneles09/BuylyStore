import Gallery from "@/app/components/Gallery";
import ProductCard from "@/app/components/ProductCard";
import ProductInfo from "@/app/components/ProductInfo";
import { getProductsDetails, getRelatedProducts } from "@/lib/actions/actions";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductsDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews?productId=${params.productId}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="pb-16 max-sm:pt-2 pt-6">
      <div className="flex justify-center items-start gap-16 max-sm:pt-2 py-10 px-5 max-lg-sm:flex-col max-lg-sm:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      <div className="flex flex-col items-center py-4 px-4 sm:px-6 md:px-10">
        <p className="text-heading3-bold">Produtos Relacionados</p>
        {/* Grid de produtos relacionados - ajustado para melhor responsividade */}
        <div className="mt-8 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {relatedProducts?.map((product: ProductType) => (
            <div className="w-full" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 mx-4 sm:mx-8 md:mx-16 lg:mx-32">
        <p className="text-heading3-bold">Avaliações dos Clientes</p>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review: any) => (
              <div
                key={review._id}
                className="border rounded-lg p-4 shadow-lg bg-white"
              >
                <div className="flex justify-between">
                  <p className="text-base-bold capitalize">{review.userName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <p>
                  <span className="text-blue-500">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-gray-400">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </p>
                <p className="text-small-medium mt-3 capitalize">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
