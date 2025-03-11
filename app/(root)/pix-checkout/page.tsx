"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/lib/hooks/useCart"; // Assumindo que você tem um hook de carrinho
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const PixCheckoutPage = () => {
  const router = useRouter();
  const { cartItems, totalPrice } = useCart();
  const { userId } = useAuth();

  // Calcular valor com desconto de 5% e frete
  const FRETE = 16.9;
  const descontoPercentual = 0.05;
  const descontoValor = totalPrice * descontoPercentual;
  const totalComDesconto = totalPrice - descontoValor;
  const totalFinal = Number((totalComDesconto + FRETE).toFixed(2));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    state: "",
    city: "",
    street: "",
    complement: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: value }));
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCEP(e.target.value);
    setFormData((prev) => ({ ...prev, cep: value }));

    // Se o CEP estiver completo, buscar informações de endereço
    if (value.replace(/\D/g, "").length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            state: data.uf,
            city: data.localidade,
            street: data.logradouro,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    try {
      setLoading(true);

      // Preparar os itens do carrinho para o formato esperado pelo backend
      const items = cartItems.map((item) => ({
        product: item.item._id,
        color: item.color || "N/A",
        size: item.size || "N/A",
        quantity: item.quantity,
      }));

      // Criar um pedido temporário no banco de dados
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/pix`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerInfo: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              cpf: formData.cpf,
              clerkId: userId,
            },
            shippingAddress: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              postalCode: formData.cep.replace(/\D/g, ""),
              country: "BR",
              complement: formData.complement,
            },
            items,
            totalAmount: totalFinal,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Redirecionar para a página do PIX com o ID do pedido e valor
        router.push(`/pix?orderId=${data.orderId}&total=${totalFinal}`);
      } else {
        toast.error("Erro ao processar pagamento");
      }
    } catch (error) {
      console.error("Erro ao processar checkout:", error);
      toast.error("Ocorreu um erro ao processar o pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <h1 className="text-heading3-bold my-10">Checkout PIX</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-heading4-medium mb-6">Suas informações</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-small-medium mb-1">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-small-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-small-medium mb-1">
                  Telefone *
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={15}
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-small-medium mb-1">
                  CPF *
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={14}
                />
              </div>
            </div>

            <h2 className="text-heading4-medium mt-6 mb-4">
              Endereço de entrega
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="cep" className="block text-small-medium mb-1">
                  CEP *
                </label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCEPChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={9}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-small-medium mb-1"
                  >
                    Estado *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-small-medium mb-1"
                  >
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="street"
                  className="block text-small-medium mb-1"
                >
                  Rua/Avenida *
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label
                  htmlFor="complement"
                  className="block text-small-medium mb-1"
                >
                  Complemento
                </label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Processando..." : "Pagar com PIX"}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-heading4-medium mb-6">Resumo do pedido</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Desconto PIX (5%):</span>
              <span>- R$ {descontoValor.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Frete:</span>
              <span>R$ {FRETE.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total:</span>
              <span>R$ {totalFinal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>* Ao pagar com PIX você tem 5% de desconto!</p>
            <p>* O pagamento PIX é processado instantaneamente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixCheckoutPage;
