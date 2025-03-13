"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "./Button";

const ContactUs = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email_from: "",
    message: "",
  });

  // Tipagem explícita para o evento de mudança
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Tipagem explícita para o evento de envio de formulário
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceKey = process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY;
    const templateKey = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    if (!serviceKey || !templateKey || !publicKey) {
      console.error("Missing environment variables for EmailJS.");
      return;
    }

    emailjs
      .sendForm(serviceKey, templateKey, e.target as HTMLFormElement, publicKey)
      .then(() => {
        setIsSent(true);
        setFormData({ email_from: "", message: "", name: "" });
        setTimeout(() => setIsSent(false), 3000);
      })
      .catch((err) => {
        console.error("Error sending email:", err);
      });
  };

  return (
    <div
      id="Contact"
      className="px-10 md:py-24 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-20 max-w-7xl mx-auto"
    >
      {/* Esquerda: Título e Texto */}
      <div className="flex flex-col items-start text-left md:w-1/2 relative">
        <div className="absolute bottom-32 right-8 w-24 h-24 bg-blue-50 rounded-full opacity-30"></div>

        <h2 className="text-heading1-bold md:text-4xl font-bold mb-8 relative">
          <span className="inline-block relative">
            Fale Conosco
            <span className="absolute -bottom-4 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
          Tem perguntas? Sinta-se à vontade para entrar em contato conosco para
          quaisquer dúvidas, esclarecimentos ou assistência. Estamos aqui para
          ajudar e adoraríamos ouvir de você!
        </p>

        <div className="space-y-6 w-full">
          <div className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-400">
                Telefone
              </span>
              <span className="text-lg font-medium text-gray-800">
                +55 51 99687-3989
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-400">Email</span>
              <span className="text-lg font-medium text-gray-800">
                buyly@gmail.com
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-400">
                Instagram
              </span>
              <span className="text-lg font-medium text-gray-800">
                @BuylyStore
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>

      {/* Direita: Formulário */}
      <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Entre em contato
        </h2>
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="emailFrom"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                type="email"
                name="email_from"
                id="emailFrom"
                placeholder="seuemail@exemplo.com"
                value={formData.email_from}
                onChange={handleChange}
                className="pl-10 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mensagem
            </label>
            <div className="relative">
              <textarea
                name="message"
                id="message"
                placeholder="Escreva sua mensagem aqui..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="contained"
              className={`w-full ${
                isSent ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-4 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2`}
              disabled={isSent}
            >
              {isSent ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Mensagem Enviada</span>
                </>
              ) : (
                <>
                  <span>Enviar Mensagem</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
