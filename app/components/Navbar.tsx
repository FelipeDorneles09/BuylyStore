"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";
import { getCategories } from "@/lib/actions/actions";

interface Category {
  _id: string;
  title: string;
  image: string;
  products: any[]; // Ajuste conforme o tipo real de produtos
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const { signOut } = useClerk();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100}></Image>
      </Link>
      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-blue-500 ${pathname === "/" && "text-blue-500"}`}
        >
          Home
        </Link>

        {/* New Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCategoriesMenu(!categoriesMenu)}
            className="hover:text-blue-500"
          >
            Categories
          </button>
          {categoriesMenu && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border rounded-lg mt-2 shadow-lg z-50">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="block px-4 py-2 hover:text-blue-500 capitalize text-center"
                  onClick={() => setCategoriesMenu(false)}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-blue-500 ${pathname === "/wishlist" && "text-blue-500"}`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-blue-500 ${pathname === "/orders" && "text-blue-500"}`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-blue-500" />
        </button>
      </div>

      <div className="flex gap-3 items-center relative">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setCategoriesMenu(!categoriesMenu)}
                className="hover:text-blue-500"
              >
                Categories
              </button>
              {categoriesMenu && (
                <div className="absolute right-0 bg-white border rounded-lg mt-2 shadow-lg z-50">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category._id}`}
                      className="block px-4 py-2 hover:text-blue-500 capitalize text-center"
                      onClick={() => {
                        setCategoriesMenu(false);
                        setDropdownMenu(false); // Fecha o menu principal ao selecionar uma categoria
                      }}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-blue-500"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-blue-500"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {user ? (
          <div className="relative">
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-10 w-10 rounded-full border",
                },
              }}
            />
          </div>
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
