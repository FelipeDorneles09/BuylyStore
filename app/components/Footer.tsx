import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="pt-12 ">
      <footer className="bg-black px-4 md:px-16 lg:px-28 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
          <div>
            <h2 className="text-body-bold mb-4 text-white">Sobre nós</h2>
            <p className="text-gray-300">
              Somos uma equipe dedicada a fornecer os melhores produtos e
              serviços aos nossos clientes
            </p>
          </div>

          <div>
            <h2 className="text-body-bold mb-4 text-white">Links Rápidos</h2>
            <ul>
              <li>
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}#Home`}
                  className="hover:underline text-gray-300"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}#Product`}
                  className="hover:underline text-gray-300"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}#Contact`}
                  className="hover:underline text-gray-300"
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}#About`}
                  className="hover:underline text-gray-300"
                >
                  PIX
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-body-bold mb-4 text-white">Redes Socias</h2>
            <ul className="flex space-x-4">
              <li>
                <FaFacebookF className="text-blue-500 mb-2 text-heading4-bold" />
                <a href="" className="hover:underline text-gray-300">
                  Facebook
                </a>
              </li>
              <li>
                <FaTwitter className="text-blue-500 mb-2 text-heading4-bold" />
                <a href="" className="hover:underline text-gray-300">
                  Twitter
                </a>
              </li>
              <li>
                <FaInstagram className="text-blue-500 mb-2 text-heading4-bold" />
                <a href="" className="hover:underline text-gray-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-6 text-gray-300 text-center mt-6">
          <p>© 2024 Buyly Store. Todos direitos reservados. </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
