"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaCartPlus } from "react-icons/fa";

const CartButton = ({ product }) => {
  const isLogin = false;
  const router = useRouter();
  const path = usePathname();
  const add2Cart = () => {
    if (isLogin) alert(product._id);
    else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };
  return (
    <div>
      <button
        onClick={add2Cart}
        className="btn btn-primary btn-wide flex gap-2"
      >
        <FaCartPlus />
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
