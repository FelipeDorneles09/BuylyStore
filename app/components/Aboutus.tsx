import { getAboutUs } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const AboutUs = async () => {
  const aboutus = await getAboutUs();
  return (
    <>
      {aboutus.map((about: AboutUsType) => (
        <div
          id="About"
          className="px-10 md:py-24 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-20 max-w-7xl mx-auto"
        >
          <div className="flex flex-col items-start text-left md:w-1/2">
            <h1 className="text-heading1-bold md:text-4xl font-bold">
              {about.title}
            </h1>

            <p className="text-xl md:text-2xl my-8">{about.description}</p>

            <a href="https://web.whatsapp.com/send?phone=5551996873989">
              <button className="text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 bg-blue-500">
                Pagar com PIX
              </button>
            </a>
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
