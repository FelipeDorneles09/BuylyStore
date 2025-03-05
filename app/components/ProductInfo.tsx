"use client";

import { useState } from "react";
import HeartFavorite from "./Heart";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [buttonState, setButtonState] = useState<
    "default" | "submitting" | "submitted" | "failed"
  >("default");

  const submitReview = async () => {
    setButtonState("submitting");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productInfo._id,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        setButtonState("submitted");
        setTimeout(() => {
          setButtonState("default");
          setRating(0);
          setComment("");
        }, 3000);
      } else {
        setButtonState("failed");
        setTimeout(() => {
          setButtonState("default");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setButtonState("failed");
      setTimeout(() => {
        setButtonState("default");
      }, 3000);
    }
  };

  return (
    <div className="max-w-[450px] max-sm-plus:max-w-[300px] lg:max-w-[500px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Categoria: </p>
        <p className="text-base-bold">
          {productInfo.categories[0]?.title || "Sem Categoria"}
        </p>
      </div>

      <p className="text-heading3-bold">R$ {productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Descrição: </p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-bold text-grey-2">Cores:</p>
          <div className="flex flex-wrap gap-2 ">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedColor === color && "bg-black text-white"}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-bold text-grey-2">Tamanhos:</p>
          <div className="flex flex-wrap gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedSize === size && "bg-black text-white"}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantidade:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Adcionar ao Carrinho
      </button>
      <div className="mt-8">
        <p className="text-heading3-bold">Deixe uma Avaliação</p>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-2xl ${rating >= star ? "text-blue-500" : "text-gray-400"}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          className="w-full border p-2 rounded-lg mt-2 resize-none h-20"
          placeholder="Escreva seu comentário aqui..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className={`mt-4 ${buttonState === "submitting" ? "bg-gray-400" : buttonState === "submitted" ? "bg-blue-500" : buttonState === "failed" ? "bg-red-500" : "bg-black"} text-white px-4 py-2 rounded-lg`}
          onClick={submitReview}
          disabled={buttonState === "submitting"}
        >
          {buttonState === "submitting"
            ? "Enviando"
            : buttonState === "submitted"
              ? "Enviado"
              : buttonState === "failed"
                ? "Tente Novamente"
                : "Enviar Avaliação"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
