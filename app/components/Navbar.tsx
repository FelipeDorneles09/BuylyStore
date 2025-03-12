"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircleUserRound,
  Menu,
  Search,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";
import { getCategories } from "@/lib/actions/actions";

interface Category {
  _id: string;
  title: string;
  image: string;
  products: any[];
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
  const [mobileCategories, setMobileCategories] = useState(false); // Separei os estados
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");

  // Refs para controlar os clicks fora dos menus
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const mobileCategoriesRef = useRef<HTMLDivElement>(null);

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

  // Função para realizar a pesquisa
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/${query}`);
    }
  };

  // Handler para a tecla Enter na pesquisa
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Melhor implementação do click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Fecha o menu de categorias desktop
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesMenu(false);
      }

      // Fecha o menu dropdown mobile
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownMenu(false);
        setMobileCategories(false); // Fecha também o submenu dentro do mobile quando clica fora
      }

      // Fecha apenas o submenu de categorias mobile
      // quando clica fora dele mas dentro do menu principal
      if (
        mobileCategoriesRef.current &&
        dropdownRef.current &&
        !mobileCategoriesRef.current.contains(event.target as Node) &&
        dropdownRef.current.contains(event.target as Node)
      ) {
        setMobileCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função para alternar o estado do menu mobile de categorias
  const toggleMobileCategories = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileCategories(!mobileCategories);
  };

  return (
    <div className="sticky top-0 z-10 py-3 px-8 flex gap-4 justify-between items-center bg-gradient-to-r from-blue-50 to-white shadow-sm max-sm:px-3">
      <Link
        href="/"
        className="transition-transform duration-300 hover:scale-105"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={130}
          height={100}
          className="object-contain"
        />
      </Link>

      <div className="flex gap-6 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`relative font-medium transition-colors duration-200 hover:text-blue-600 ${
            pathname === "/"
              ? "text-blue-600 after:absolute after:bottom-[-6px] after:left-0 after:h-[3px] after:w-full after:bg-blue-600 after:rounded-full"
              : "text-gray-700"
          }`}
        >
          Início
        </Link>

        {/* Dropdown de Categorias Desktop */}
        <div className="relative" ref={categoriesRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCategoriesMenu(!categoriesMenu);
            }}
            className={`relative flex items-center gap-1 font-medium transition-colors duration-200 hover:text-blue-600 ${
              pathname.includes("/categories")
                ? "text-blue-600"
                : "text-gray-700"
            }`}
          >
            Categorias
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${categoriesMenu ? "rotate-180" : ""}`}
            />
          </button>
          {categoriesMenu && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border border-gray-100 rounded-lg mt-2 shadow-lg z-50 py-1 min-w-40 overflow-hidden">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="block px-5 py-2 hover:bg-blue-50 hover:text-blue-600 capitalize text-gray-700 text-sm transition-colors duration-150"
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
          className={`relative font-medium transition-colors duration-200 hover:text-blue-600 ${
            pathname === "/wishlist"
              ? "text-blue-600 after:absolute after:bottom-[-6px] after:left-0 after:h-[3px] after:w-full after:bg-blue-600 after:rounded-full"
              : "text-gray-700"
          }`}
        >
          Lista de Desejos
        </Link>

        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`relative font-medium transition-colors duration-200 hover:text-blue-600 ${
            pathname === "/orders"
              ? "text-blue-600 after:absolute after:bottom-[-6px] after:left-0 after:h-[3px] after:w-full after:bg-blue-600 after:rounded-full"
              : "text-gray-700"
          }`}
        >
          Pedidos
        </Link>
      </div>

      {/* Barra de Pesquisa Melhorada */}
      <div className="flex gap-2 border border-gray-200 px-4 py-2 items-center rounded-full bg-white shadow-sm transition-all focus-within:shadow-md focus-within:border-blue-300">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          className="outline-none w-full max-sm:max-w-[120px] text-gray-700 placeholder:text-gray-400"
          placeholder="Pesquisar produtos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          disabled={query.trim() === ""}
          onClick={handleSearch}
          className="text-blue-600 text-sm font-medium disabled:text-gray-300 transition-colors"
        >
          Buscar
        </button>
      </div>

      <div className="flex gap-4 items-center relative">
        <Link
          href="/cart"
          className="flex items-center gap-2 rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 max-md:hidden"
        >
          <ShoppingCart size={18} />
          <p className="text-sm font-medium">
            {cart.cartItems.length > 0
              ? `Carrinho (${cart.cartItems.length})`
              : "Carrinho"}
          </p>
        </Link>

        {/* Menu Mobile */}
        <div ref={dropdownRef} className="lg:hidden">
          <Menu
            className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownMenu(!dropdownMenu);
              if (!dropdownMenu) {
                setMobileCategories(false); // Reseta o estado do submenu ao abrir o menu
              }
            }}
          />

          {dropdownMenu && (
            <div className="absolute top-12 right-0 flex flex-col gap-2 p-4 rounded-lg border bg-white shadow-lg text-base-bold z-50 min-w-48">
              <Link
                href="/"
                className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                onClick={() => setDropdownMenu(false)}
              >
                Início
              </Link>

              <div className="relative" ref={mobileCategoriesRef}>
                <button
                  onClick={toggleMobileCategories}
                  className="flex items-center justify-between w-full px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                >
                  <span>Categorias</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileCategories ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileCategories && (
                  <div className="bg-white border border-gray-100 rounded-lg mt-1 shadow-md py-1 ml-2">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category._id}`}
                        className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 capitalize text-gray-700 text-sm transition-colors"
                        onClick={() => {
                          setMobileCategories(false);
                          setDropdownMenu(false);
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
                className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                onClick={() => setDropdownMenu(false)}
              >
                Lista de Desejos
              </Link>

              <Link
                href={user ? "/orders" : "/sign-in"}
                className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                onClick={() => setDropdownMenu(false)}
              >
                Pedidos
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-2 mt-2 bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-700 transition-colors md:hidden"
                onClick={() => setDropdownMenu(false)}
              >
                <ShoppingCart size={16} />
                <p className="text-sm font-medium">
                  Carrinho ({cart.cartItems.length})
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* Autenticação de Usuário */}
        {user ? (
          <div className="relative">
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "h-10 w-10 rounded-full border border-gray-200 shadow-sm hover:border-blue-300 transition-colors",
                },
              }}
            />
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <CircleUserRound className="text-gray-700" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
