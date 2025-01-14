import { getAboutUs } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const AboutUs = async () => {
  const aboutus = await getAboutUs();
  return (
    <>
      {aboutus.map((about: AboutUsType) => (
        <div className="px-10 md:py-24 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-20 max-w-7xl mx-auto">
          <div className="flex flex-col items-start text-left md:w-1/2">
            <h1 className="text-heading1-bold md:text-4xl font-bold mb-8">
              {about.title}
            </h1>

            <p className="text-xl md:text-2xl">{about.description}</p>
          </div>

          <div className="flex justify-center md:w-1/2">
            <Image
              src={about.image}
              alt={about.title}
              width={700} // Tamanho maior para imagem
              height={400} // Tamanho maior para imagem
              className="rounded-lg object-cover cursor-pointer"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default AboutUs;
