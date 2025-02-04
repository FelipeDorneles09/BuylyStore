export const getCollections = async () => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/collections`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return [];
  }
};

export const getCollectionsDetails = async (collectionId: string) => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/collections/${collectionId}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch collection details:", error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const getProductsDetails = async (productId: string) => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return null;
  }
};

export const getSearchedProducts = async (query: string) => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search/${query}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch searched products:", error);
    return [];
  }
};

export const getOrders = async (customerId: string) => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/customers/${customerId}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

export const getRelatedProducts = async (productId: string) => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/related`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export const getCategoriesDetails = async (categoryId: string) => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch category details:", error);
    return null;
  }
};

export const getAboutUs = async () => {
  try {
    return await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/aboutus`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Failed to fetch about us:", error);
    return null;
  }
};

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = 3,
  timeout = 20000 // 10 segundos
) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao buscar ${url}:`, error.message);
      } else {
        console.error(`Erro desconhecido ao buscar ${url}:`, error);
      }

      if (attempt < retries - 1) {
        console.warn(`Retrying fetch: attempt ${attempt + 1}`);
        continue;
      }

      throw error;
    }
  }
};
