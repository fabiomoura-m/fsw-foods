/* eslint-disable no-unused-vars */
"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Product, quantity: number) => {
    // verificar se já está no carrinho
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    // se estiver, aumenta a quantidade
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );
    }
    // se não estiver, adiciona o produto
    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
