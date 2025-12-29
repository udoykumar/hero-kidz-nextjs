import { getCart } from "@/actions/server/cart";
import CheckOut from "@/components/layouts/home/CheckOut";
import React from "react";

const CheckOutPage = async () => {
  const cartItem = await getCart();
  const formattedItem = cartItem.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          Check Out Page
        </h2>
      </div>
      <CheckOut cartItem={formattedItem} />
    </div>
  );
};

export default CheckOutPage;
