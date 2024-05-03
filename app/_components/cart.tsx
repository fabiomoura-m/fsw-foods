import { useContext } from "react";
import { CartContext } from "../_context/carts";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, totalDiscounts, totalPrice, subtotalPrice } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col justify-between py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>

      {products.length > 0 && (
        <div className="">
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products[0].restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Grátis</span>
                  ) : (
                    <span>
                      {Number(products[0].restaurant.deliveryFee)} min
                    </span>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrency(totalDiscounts)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-6 w-full">Finalizar Pedido</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
