"use client";

import Link from "next/link";
import HeartFavorite from "./Heart";
import { Eye, ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { useState } from "react";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Get cart from hook
  const cart = useCart();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  // Function to update user state when wishlist changes
  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  // Function to handle adding to cart with default options
  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault(); // Prevent navigation from Link
    cart.addItem({
      item: product,
      quantity: 1,
      color: product.colors.length > 0 ? product.colors[0] : "",
      size: product.sizes.length > 0 ? product.sizes[0] : "",
    });
  };

  return (
    <div className="h-full">
      <div className="group relative bg-white h-full rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
        {/* Product image with overlay */}
        <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
          <div className="h-full w-full flex justify-center items-center">
            <img
              src={product.media[0]}
              alt={product.title}
              className="h-36 w-36 sm:h-40 sm:w-40 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3">
            <Link href={`/products/${product._id}`}>
              <button className="p-2 sm:p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                <Eye size={16} />
              </button>
            </Link>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="p-2 sm:p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors"
            >
              <ShoppingCart size={16} />
            </button>
            <div className="p-2 sm:p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors">
              <HeartFavorite
                product={product}
                updateSignedInUser={updateSignedInUser}
              />
            </div>
          </div>
        </div>

        {/* Product information */}
        <div className="flex flex-col p-3 gap-1 sm:gap-2 flex-grow">
          {/* Product title */}
          <h3 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1 text-center">
            {product.title}
          </h3>

          {/* Product description */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 text-center">
            {product.description}
          </p>

          {/* Product price */}
          <div className="flex justify-center mt-1 sm:mt-2">
            <span className="text-lg sm:text-xl font-bold text-blue-600">
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          {/* Buttons container with margin-top auto to push to bottom */}
          <div className="mt-auto pt-2 sm:pt-4 flex flex-col gap-2">
            {/* Buy now button */}
            <Link href={`/products/${product._id}`} className="w-full">
              <button className="w-full py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg transition-colors hover:bg-blue-600">
                Comprar Agora
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
