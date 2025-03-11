"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserPublicMetadata {
  wishlist?: string[]; // Defina que wishlist é opcional e um array de strings
}

interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Check if product is in wishlist when component mounts or user changes
  useEffect(() => {
    if (isLoaded && user) {
      const publicMetadata = user.publicMetadata as UserPublicMetadata;
      const wishlist = publicMetadata.wishlist || [];
      setIsLiked(wishlist.includes(product._id));
    } else {
      // Reset if user is not logged in
      setIsLiked(false);
    }
  }, [user, isLoaded, product._id]);

  // Also check server-side data to keep in sync with other components
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const userData = await res.json();
          if (userData && userData.wishlist) {
            setIsLiked(userData.wishlist.includes(product._id));
          }
        }
      } catch (err) {
        console.error("[wishlist_check]", err);
      }
    };

    if (isLoaded && user) {
      checkWishlistStatus();
    }
  }, [isLoaded, user, product._id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const updatedUser = await res.json();
        // Update local state
        setIsLiked(updatedUser.wishlist.includes(product._id));
        // Update parent component if callback provided
        if (updateSignedInUser) {
          updateSignedInUser(updatedUser);
        }
        // Force a refresh to ensure UI is updated
        router.refresh();
      }
    } catch (err) {
      console.error("[wishlist_POST]", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="w-full h-full flex items-center justify-center"
    >
      <Heart
        size={18}
        fill={isLiked ? "red" : "none"}
        color={isLiked ? "red" : "currentColor"}
      />
    </button>
  );
};

export default HeartFavorite;
