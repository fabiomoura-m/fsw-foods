"use client";
import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/carts";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ProductsComplementary from "./products-complementary";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    // verificar se há algum produto de outro restaurante no carrinho
    const hasDifferentRestaurantProduct = products.some(
      (productCart) => productCart.restaurantId !== product.restaurantId,
    );

    // se houver, abrir o aviso
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({ emptyCart: false });
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((current) => current + 1);
  };

  const handleDecreaseQuantityClick = () => {
    setQuantity((current) => {
      if (current === 1) {
        return 1;
      }

      return current - 1;
    });
  };
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 lg:ml-8 lg:mt-0 lg:rounded-3xl lg:border lg:p-8 lg:py-8">
        <div className="px-5 lg:px-0">
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-6 w-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                sizes="100%"
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </span>
          </div>

          <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {formatCurrency(calculateProductTotalPrice(product))}
                </h2>
                {product.discountPercentage > 0 && (
                  <DiscountBadge product={product} />
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-muted-foreground">
                  De: {formatCurrency(Number(product.price))}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="border border-solid border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon />
              </Button>
              <span className="w-4 text-center">{quantity}</span>
              <Button size="icon" onClick={handleIncreaseQuantityClick}>
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <DeliveryInfo restaurant={product.restaurant} />

          <div className="my-6">
            <h3 className="mb-3 font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>

        <div className="my-6 lg:hidden">
          <ProductsComplementary
            complementaryProducts={complementaryProducts}
          />
        </div>

        <div className="px-5 lg:px-0 lg:pl-8">
          <Button
            className="w-full text-sm font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à Sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você já tem itens adicionados na sua sacola
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja limpar a sacola?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                addToCart({ emptyCart: true });
              }}
            >
              Sim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
