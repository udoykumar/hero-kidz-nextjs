"use client";

import {
  decreaseItemDb,
  deleteItemsFormCart,
  increaseItemDb,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, updateQuantity }) => {
  const { title, image, quantity, price, _id } = item;
  const [loading, setLoading] = useState(false);
  const handleDeleteCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemsFormCart(_id);

        if (result.success) {
          removeItem(_id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "something with worng.",
            icon: "error",
          });
        }
      }
    });
  };

  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItemDb(_id, quantity);
    if (result.success) {
      Swal.fire("success", "quantity increase", "success");
      updateQuantity(_id, quantity + 1);
    }
    setLoading(false);
  };
  const onDecrese = async () => {
    setLoading(true);
    const result = await decreaseItemDb(_id, quantity);
    if (result.success) {
      Swal.fire("success", "quantity decrease", "success");
      updateQuantity(_id, quantity - 1);
    }
    setLoading(false);
  };

  return (
    <div className="card card-side bg-base-100 shadow-md border">
      {/* Image */}
      <figure className="p-3">
        <div className="relative w-24 h-24">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </figure>

      {/* Content */}
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2">{title}</h2>

        <p className="text-sm text-gray-500">Price: ৳{price}</p>

        {/* Quantity Controller */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={onDecrese}
            disabled={quantity === 1 || loading}
            className="btn btn-sm btn-outline"
          >
            <FaMinus />
          </button>

          <span className="font-semibold">{quantity}</span>

          <button
            onClick={onIncrease}
            disabled={quantity >= 10 || loading}
            className="btn btn-sm btn-outline"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-between p-4">
        <button
          onClick={handleDeleteCart}
          className="btn btn-sm btn-error btn-outline"
        >
          <FaTrash />
        </button>

        <p className="font-bold text-right">৳{price * quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
