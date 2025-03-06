"use client";

import useCart from "@/lib/hooks/useCart";
import React from "react";
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const user = useUser();
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.user?.id,
    email: user?.user?.emailAddresses[0]?.emailAddress, // Acesso corrigido ao primeiro email
    name: user?.user?.fullName,
  };

  const discount = 0.05;
  const shippingFee = 16.99;
  const totalWithDiscount = total * (1 - discount) + shippingFee;
  const totalWithDiscountRounded = parseFloat(totalWithDiscount.toFixed(2));

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Cabeçalhos necessários
            body: JSON.stringify({ cartItems: cart.cartItems, customer }), // Incluindo customer
          }
        );
        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  const handlePixPayment = () => {
    const productDescriptions = cart.cartItems
      .map(
        (cartItems) =>
          ` ${cartItems.quantity}${cartItems.item.title.slice(0, 10)}-${cartItems.size}-${cartItems.color}`
      )
      .join(";");

    router.push(
      `/pix?total=${totalWithDiscountRounded}&desc=${encodeURIComponent(
        productDescriptions
      )}`
    );
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col ">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Carrinho</p>
        <hr className="my-6" />
        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">Nenhum Item no carrinho</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div className="w-full flex max-sm:flex-col max-sm:gap-3 max-sm:items-start bg-grey-1 px-6 py-5 items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() =>
                      cart.decreaseQuantity(
                        cartItem.item._id,
                        cartItem.color ?? "defaultColor",
                        cartItem.size ?? "defaultSize"
                      )
                    }
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() =>
                      cart.increaseQuantity(
                        cartItem.item._id,
                        cartItem.color ?? "defaultColor",
                        cartItem.size ?? "defaultSize"
                      )
                    }
                  />

                  <Trash
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Resumo
          <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Preço Total</span>
          <span>R$ {totalRounded}</span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Continuar para Pagamento
        </button>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white mt-4"
          onClick={handlePixPayment}
        >
          Pagar com Pix
        </button>
      </div>
    </div>
  );
};

export default Cart;

export const dynamic = "force-dynamic";
