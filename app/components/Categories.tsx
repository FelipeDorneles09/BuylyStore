import { getCategories } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const categories = await getCategories();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <div>
        <p className="text-[12px] text-center">Shop by categories</p>
        <p className="text-heading1-bold font-bold text-center">Categories</p>
      </div>

      <div className="w-16 h-[2px] bg-blue-500 mx-auto mb-6"></div>

      {!categories || categories.length === 0 ? (
        <p className="text-xl font-semibold text-center">No categories found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category: CategoryType) => (
            <Link href={`/categories/${category._id}`} key={category._id}>
              <div className="max-md:w-[150px] max-md:h-[200px] w-[215px] h-[300px] relative cursor-pointer">
                <Image
                  src={category.image}
                  alt={category.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {/* Fundo fixo */}
                <p className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-white max-md:w-[100px] max-md:h-[30px] w-[160px] h-[40px] flex items-center justify-center text-center font-semibold text-gray-800 shadow-md rounded">
                  {category.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
