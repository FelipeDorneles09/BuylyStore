import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-12">
      <footer className="bg-gradient-to-r from-gray-900 to-black px-4 md:px-16 lg:px-28 py-12">
        <div className="container mx-auto">
          {/* Logo e descrição */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-blue-500">Buyly</span> Store
            </h1>
            <p className="text-gray-400 mt-2 max-w-md">
              Somos uma equipe dedicada a fornecer os melhores produtos e
              serviços aos nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-6">
            {/* Sobre */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-white border-b border-blue-500 pb-2 inline-block">
                Sobre nós
              </h2>
              <p className="text-gray-300 mb-4">
                Oferecemos produtos de alta qualidade com preços acessíveis e
                atendimento personalizado.
              </p>

              {/* Informações de contato */}
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />
                  <span>Av. Principal, 1234, São Paulo</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <FaPhoneAlt className="text-blue-500 mr-2" />
                  <span>(11) 9999-9999</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <FaEnvelope className="text-blue-500 mr-2" />
                  <span>contato@buylystore.com</span>
                </li>
              </ul>
            </div>

            {/* Links Rápidos */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-white border-b border-blue-500 pb-2 inline-block">
                Links Rápidos
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}#Home`}
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Início
                  </a>
                </li>
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}#Product`}
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Produtos
                  </a>
                </li>
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}#Contact`}
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Contato
                  </a>
                </li>
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}#About`}
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> PIX
                  </a>
                </li>
              </ul>
            </div>

            {/* Serviços */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-white border-b border-blue-500 pb-2 inline-block">
                Serviços
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Suporte 24/7
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Devolução fácil
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Entrega rápida
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> Pagamento seguro
                  </a>
                </li>
              </ul>
            </div>

            {/* Redes Sociais */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-white border-b border-blue-500 pb-2 inline-block">
                Redes Sociais
              </h2>
              <p className="text-gray-300 mb-4">
                Siga-nos nas redes sociais e fique por dentro das novidades!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-full transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-blue-400 text-white p-3 rounded-full transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-pink-600 text-white p-3 rounded-full transition duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Métodos de pagamento */}
          <div className="border-t border-gray-700 pt-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-white font-semibold mb-2">Aceitamos</h3>
                <div className="flex space-x-2">
                  {["Visa", "Mastercard", "PayPal", "PIX"].map((payment) => (
                    <span
                      key={payment}
                      className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {payment}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-center">
                © {currentYear}{" "}
                <span className="text-blue-500 font-semibold">Buyly Store</span>
                . Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
