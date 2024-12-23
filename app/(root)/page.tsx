import Image from "next/image";

import Collections from "../components/Collections";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import AboutUs from "../components/Aboutus";

export default function Home() {
  return (
    <>
      <Image
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen"
      />
      <Collections />
      <Categories />
      <ProductList />
      <AboutUs />
    </>
  );
}

export const dynamic = "force-dynamic";
