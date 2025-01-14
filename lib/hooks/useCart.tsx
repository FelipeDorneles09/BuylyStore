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
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string, color?: string, size?: string) => void; // Torne color e size opcionais
  increaseQuantity: (idToIncrease: string, color: string, size: string) => void;
  decreaseQuantity: (idToDecrease: string, color: string, size: string) => void;
  clearCart: () => void;
}
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;

        // Verificar se o item com a mesma combinação de produto, cor e tamanho já existe
        const isExisting = currentItems.find(
          (cartItem) =>
            cartItem.item._id === item._id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (isExisting) {
          return toast("Item already in cart", { icon: "🛒​" });
        }

        // Adicionar o novo item com suas variações
        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart", { icon: "🛒​" });
      },

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

        set({ cartItems: newCartItems });
        toast.success("Item removed from cart", { icon: "🛒​" });
      },

      increaseQuantity: (idToIncrease: string, color: string, size: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease &&
          cartItem.color === color &&
          cartItem.size === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },

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

        // Atualizar o carrinho com os itens restantes
        set({ cartItems: filteredItems });

        // Caso a quantidade seja 1 após a redução, removemos o item
        if (filteredItems.length < newCartItems.length) {
          toast.success("Item removed from cart", { icon: "🛒​" });
        } else {
          toast.success("Item quantity decreased");
        }
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
