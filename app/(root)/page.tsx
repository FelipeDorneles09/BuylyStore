import Image from "next/image";

import ProductList from "../components/ProductList";
import CategoriesDisplay from "../components/CategoriesDisplay";
import AboutUs from "../components/Aboutus";
import Trust from "../components/Trust";
import ContactUs from "../components/ContactUs";
import Slider from "../components/Slider";
import { SliderServer } from "../components/SliderServer";
import CategoriesLoader from "../components/CategoriesLoader";
import Info from "../components/Info";

export default async function Home() {
  const collections = await SliderServer(); // Busca as coleções no Server Component
  return (
    <>
      <Slider collections={collections} />
      <Info />
      <CategoriesLoader />
      <ProductList />
      <AboutUs />
      <Trust />
      <ContactUs />
    </>
  );
}

export const dynamic = "force-dynamic";
