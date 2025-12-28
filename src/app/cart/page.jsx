import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/layouts/cards/CartItem";
import Cart from "@/components/layouts/home/Cart";
import React from "react";

const CartPage = async () => {
  const cartItem = await getCart();
  const formattedItem = cartItem.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
      </div>
      <Cart cartItem={formattedItem} />
    </div>
  );
};

export default CartPage;
