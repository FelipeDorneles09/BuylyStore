import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();

  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Pedidos</p>
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">Você ainda não fez Pedidos.</p>
        ))}

      <div className="flex gap-10 flex-col">
        {orders?.map((order: OrderType) => (
          <div
            key={order._id}
            className="flex flex-col gap-8 p-4 hover:bg-grey-1 border border-grey-1 rounded-lg"
          >
            <div className="flex justify-between max-md:flex-col max-md:gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-base-bold">ID do pedido: {order._id}</p>
                <p className="text-base-bold">Total: R${order.totalAmount}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-base-medium">
                  Método:{" "}
                  <span
                    className={`text-base-bold ${(order.paymentMethod || "stripe") === "pix" ? "text-green-500" : "text-blue-500"}`}
                  >
                    {(order.paymentMethod || "stripe") === "pix"
                      ? "Pix"
                      : "Cartão"}
                  </span>
                </p>
                <p className="text-base-medium">
                  Status:{" "}
                  <span
                    className={`text-base-bold ${(order.status || "pago") === "pago" ? "text-green-500" : "text-red-500"}`}
                  >
                    {(order.status || "pago") === "pago"
                      ? "Pago"
                      : (order.status || "pago") === "pendente"
                        ? "Pendente"
                        : order.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {order.products.map((orderItem: OrderItemType) => (
                <div key={orderItem._id} className="flex gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Produto:{" "}
                      <span className="text-small-bold">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small-medium">
                        Cor:{" "}
                        <span className="text-small-bold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small-medium">
                        Tamanho:{" "}
                        <span className="text-small-bold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}
                    <p className="text-small-medium">
                      Preço da Unidade:{" "}
                      <span className="text-small-bold">
                        R${orderItem.product.price}
                      </span>
                    </p>
                    <p className="text-small-medium">
                      Quantidade:{" "}
                      <span className="text-small-bold">
                        {orderItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
