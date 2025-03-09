import { create } from "zustand";
import toast from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string, color?: string, size?: string) => void;
  increaseQuantity: (idToIncrease: string, color: string, size: string) => void;
  decreaseQuantity: (idToDecrease: string, color: string, size: string) => void;
  clearCart: () => void;
  calculateTotalPrice: (cartItems: CartItem[]) => number;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,

      // Função para calcular o preço total
      calculateTotalPrice: (cartItems: CartItem[]) => {
        return cartItems.reduce(
          (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
          0
        );
      },

      // Adicionar item ao carrinho
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;

        // Verificar se o item já existe no carrinho
        const isExisting = currentItems.find(
          (cartItem) =>
            cartItem.item._id === item._id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (isExisting) {
          return toast("Item já está no carrinho", { icon: "🛒​" });
        }

        // Adicionar o novo item ao carrinho
        const newCartItems = [...currentItems, { item, quantity, color, size }];
        const newTotalPrice = get().calculateTotalPrice(newCartItems);

        set({ cartItems: newCartItems, totalPrice: newTotalPrice });
        toast.success("Item adicionado ao carrinho", { icon: "🛒​" });
      },

      // Remover item do carrinho
      removeItem: (idToRemove: string, color?: string, size?: string) => {
        let newCartItems = get().cartItems;

        // Se color ou size forem fornecidos, removemos apenas os itens correspondentes
        if (color && size) {
          newCartItems = newCartItems.filter(
            (cartItem) =>
              !(
                cartItem.item._id === idToRemove &&
                cartItem.color === color &&
                cartItem.size === size
              )
          );
        } else {
          // Caso contrário, removemos todos os itens com o id fornecido
          newCartItems = newCartItems.filter(
            (cartItem) => cartItem.item._id !== idToRemove
          );
        }

        const newTotalPrice = get().calculateTotalPrice(newCartItems);

        set({ cartItems: newCartItems, totalPrice: newTotalPrice });
        toast.success("Item removido do carrinho", { icon: "🛒​" });
      },

      // Aumentar a quantidade de um item
      increaseQuantity: (idToIncrease: string, color: string, size: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease &&
          cartItem.color === color &&
          cartItem.size === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        const newTotalPrice = get().calculateTotalPrice(newCartItems);

        set({ cartItems: newCartItems, totalPrice: newTotalPrice });
        toast.success("Quantidade aumentada");
      },

      // Diminuir a quantidade de um item
      decreaseQuantity: (idToDecrease: string, color: string, size: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToDecrease &&
          cartItem.color === color &&
          cartItem.size === size
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );

        // Verificar se algum item tem quantidade 0 ou menor e removê-lo do carrinho
        const filteredItems = newCartItems.filter(
          (cartItem) => cartItem.quantity > 0
        );

        const newTotalPrice = get().calculateTotalPrice(filteredItems);

        // Atualizar o carrinho com os itens restantes
        set({ cartItems: filteredItems, totalPrice: newTotalPrice });

        // Caso a quantidade seja 1 após a redução, removemos o item
        if (filteredItems.length < newCartItems.length) {
          toast.success("Item removido do carrinho", { icon: "🛒​" });
        } else {
          toast.success("Quantidade diminuída");
        }
      },

      // Limpar o carrinho
      clearCart: () => set({ cartItems: [], totalPrice: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
