import { useContext } from "react";
import { CartContext } from "../_context/carts";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
