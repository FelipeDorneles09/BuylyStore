// CategoriesLoader.tsx
import { getCategories } from "@/lib/actions/actions";
import CategoriesDisplay from "./CategoriesDisplay";

const CategoriesLoader = async () => {
  const categories = await getCategories();
  return <CategoriesDisplay categories={categories} />;
};

export default CategoriesLoader;
