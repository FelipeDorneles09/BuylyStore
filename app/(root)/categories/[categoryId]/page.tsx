import FilteredProductList from "@/app/components/FilteredProductList";
import { getCategoriesDetails } from "@/lib/actions/actions";

const CategoryDetails = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const categoryDetails = await getCategoriesDetails(params.categoryId);

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px- py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-start gap-8">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-heading1-bold">{categoryDetails.title}</p>
          <p className="text-body-medium mt-2 sm:mt-0">
            {categoryDetails.products.length} produto(s)
          </p>
        </div>
      </div>

      {/* Componente cliente com filtro */}
      <FilteredProductList products={categoryDetails.products} />
    </div>
  );
};

export default CategoryDetails;

export const dynamic = "force-dynamic";
