import FilteredProductList from "@/app/components/FilteredProductList";
import { getCollectionsDetails } from "@/lib/actions/actions";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionsDetails(params.collectionId);

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px- py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-start gap-8">
      {/* Título e descrição */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-heading1-bold">{collectionDetails.title}</p>
          <p className="text-[16px] text-grey-2 w-[85%]">
            {collectionDetails.description}
          </p>
          <p className="text-body-medium mt-2 sm:mt-0">
            {collectionDetails.products.length} produto(s)
          </p>
        </div>
      </div>

      {/* Componente cliente com filtro */}
      <FilteredProductList products={collectionDetails.products} />
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
