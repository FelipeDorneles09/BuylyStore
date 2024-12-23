export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/collections`,
    { cache: "no-store" }
  );
  return await collections.json();
};

export const getCollectionsDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/collections/${collectionId}`,
    { cache: "no-store" }
  );
  return await collection.json();
};

export const getProducts = async () => {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    {
      cache: "no-store",
    }
  );
  return await products.json();
};

export const getProductsDetails = async (productId: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
    {
      cache: "no-store",
    }
  );
  return await product.json();
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/search/${query}`,
    {
      cache: "no-store",
    }
  );
  return await searchedProducts.json();
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/customers/${customerId}`,
    {
      cache: "no-store",
    }
  );
  return await orders.json();
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/related`,
    {
      cache: "no-store",
    }
  );
  return await relatedProducts.json();
};

export const getCategories = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    { cache: "no-store" }
  );
  return await categories.json();
};

export const getCategoriesDetails = async (categoryId: string) => {
  const category = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
    { cache: "no-store" }
  );
  return await category.json();
};

export const getAboutUs = async () => {
  const aboutus = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aboutus`,
    { cache: "no-store" }
  );
  return await aboutus.json();
};
