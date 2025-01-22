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
      <div className="flex flex-col items-start text-left md:w-1/2">
        <h2 className="text-heading1-bold md:text-4xl font-bold mb-8">
          Fale Conosco
        </h2>
        <p className="text-xl md:text-2xl">
          Tem perguntas? Sinta-se à vontade para entrar em contato conosco para
          quaisquer dúvidas, esclarecimentos ou assistência. Estamos aqui para
          ajudar e adoraríamos ouvir de você!
        </p>
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-[#3b82f6]"
            >
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="text-lg font-medium text-gray-700">
              +1 (123) 456-7890
            </span>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-[#3b82f6]"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span className="text-lg font-medium text-gray-700">
              buyly@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-[#3b82f6]"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-lg font-medium text-gray-700">
              @BuylyStore
            </span>
          </div>
        </div>
      </div>

      {/* Direita: Formulário */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={sendEmail} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Seu Nome"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="emailFrom"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email_from"
              id="emailFrom"
              placeholder="seunome@example.com"
              value={formData.email_from}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Mensagem
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Escreva sua mensagem aqui..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              className={`${
                isSent ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200`}
              disabled={isSent}
              endIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 14A6 6 0 1 1 14 8 6 6 0 0 1 8 14Z" />
                </svg>
              } // Exemplo de ícone
            >
              {isSent ? "Enviado" : "Enviar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
