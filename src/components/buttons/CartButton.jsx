"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = session?.status == "authenticated";
  const handleAdd2Cart = async () => {
    setIsLoading(true);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        Swal.fire("added to cart", product?.title, "success");
      } else {
        Swal.fire("opps", "something wrong happen", "error");
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleAdd2Cart}
        disabled={session.status == "loading" || isLoading}
        className="btn btn-primary w-full "
      >
        <FaCartPlus size={20} />
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
