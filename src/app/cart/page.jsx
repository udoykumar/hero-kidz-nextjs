import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/layouts/cards/CartItem";
import React from "react";

const CartPage = async () => {
  const cartItem = await getCart();
  console.log(cartItem[0]);
  return (
    <div>
      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
        <p className="py-3">
          <span className="text-primary font-bold">{cartItem.length}</span>
          Itmes Found in the cart
        </p>
      </div>
      <div className="flex ">
        <div className="flex-3 space-y-5">
          {cartItem.map((item) => (
            <CartItem key={item._id.toString()} item={item} />
          ))}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default CartPage;
