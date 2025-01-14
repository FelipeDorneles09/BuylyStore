// components/SliderServer.tsx

import { getCollections } from "@/lib/actions/actions"; // Ajuste conforme necessário

// Server Component que busca as coleções
export async function SliderServer() {
  const collections = await getCollections();

  return collections; // Retorna as coleções para o Client Component
}
