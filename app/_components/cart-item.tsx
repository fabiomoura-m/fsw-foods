import Image from "next/image";
import { CartContext, CartProduct } from "../_context/carts";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity } =
    useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            fill
            alt={cartProduct.name}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">
              {formatCurrency(calculateProductTotalPrice(cartProduct))}
            </span>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price))}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-4 text-center text-sm">
              {cartProduct.quantity}
            </span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        className="border-[ #EEEEEE] h-8 w-8 border border-solid"
        variant="ghost"
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
