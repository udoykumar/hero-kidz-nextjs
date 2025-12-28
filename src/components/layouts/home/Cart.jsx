"use client";

import { useMemo, useState } from "react";
import CartItem from "../cards/CartItem";

const Cart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const removeItem = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, q) => {
    setItems((prevItem) =>
      prevItem.map((item) =>
        item._id === id ? { ...item, quantity: q } : item
      )
    );
  };

  const handleConfirm = () => {
    console.log("Confirmed Items:", items);
    alert("Order Confirmed ✅");
  };

  return (
    <div>
      <p className="py-3">
        <span className="text-primary font-bold">{items.length}</span> Items
        Found in the cart
      </p>

      <div className="flex gap-6">
        {/* LEFT - CART ITEMS */}
        <div className="flex-[3] space-y-5">
          {items.map((item) => (
            <CartItem
              key={item._id.toString()}
              item={{ ...item, _id: item._id.toString() }}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* RIGHT - SUMMARY CARD */}
        <div className="flex-1">
          <div className="border rounded-xl p-5 shadow-md sticky top-5">
            <h2 className="text-xl font-bold text-primary mb-4 text-center">
              Order Summary
            </h2>

            {/* PRODUCT LIST */}
            <div className="space-y-3 max-h-84 overflow-auto">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-primary font-bold">
                      Q: {item.quantity} × ৳ {item.price}
                    </p>
                  </div>
                  <p className="font-semibold">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-4 space-y-2 border-t pt-4">
              <p className="flex justify-between font-medium">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </p>
              <p className="flex justify-between text-lg font-bold text-primary">
                <span>Total Price:</span>
                <span>৳{totalPrice}</span>
              </p>
            </div>

            {/* CONFIRM BUTTON */}
            <button
              onClick={handleConfirm}
              disabled={!items.length}
              className="mt-5 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
