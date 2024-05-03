"use client";
import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCartClick = () => {
    addProductToCart(product, quantity);
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
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="px-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
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
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <div className="my-6">
        <h3 className="mb-3 px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <div className="px-5">
            <Button
              className="w-full text-sm font-semibold"
              onClick={handleAddToCartClick}
            >
              Adicionar à Sacola
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductDetails;
