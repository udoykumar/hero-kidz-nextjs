"use client";

import { createOrder } from "@/actions/server/order";
import OrderSummary from "@/components/OrderSummary";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStickyNote,
  FaShoppingCart,
} from "react-icons/fa";
import Logo from "../Logo";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckOut = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);
  const session = useSession();
  const router = useRouter();
  console.log("session", session);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.phone.value,
      address: form.address.value,
      instruction: form.instruction.value,
    };
    // 👉 API call here
    const result = await createOrder(payload);
    if (result.success) {
      Swal.fire("success", "Order Added", "success");
      router.push("/");
    } else {
      Swal.fire("error", "something with worng", "error");
      router.push("/cart");
    }
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  if (session.status == "loading") {
    return (
      <>
        <div className="flex flex-col min-h-screen justify-center items-center">
          <h2 className="text-5xl font-bold animate-pulse">Loading</h2>
          <div className="animate-ping">
            <Logo />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE – FORM */}
        <div className="md:col-span-2 bg-base-100 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FaShoppingCart /> Delivery Informaion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaUser /> Full Name
                  </span>
                </label>
                <input
                  name="name"
                  value={session?.data?.user?.name}
                  placeholder="Your name"
                  className="input input-bordered w-full"
                  required
                  readOnly
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaEnvelope /> Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={session?.data?.user?.email}
                  placeholder="Your email"
                  className="input input-bordered w-full"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaPhone /> Contact Number
                </span>
              </label>
              <input
                name="phone"
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaMapMarkerAlt /> Delivery Address
                </span>
              </label>
              <textarea
                name="address"
                placeholder="Full delivery address"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            {/* Instruction */}
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaStickyNote /> Special Instruction
                </span>
              </label>
              <textarea
                name="instruction"
                placeholder="Optional"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Check Out with Cash on delivery{" "}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="flex-1">
          <div className="border rounded-xl p-5 shadow-md sticky top-5">
            <h2 className="text-xl font-bold text-primary mb-4 text-center">
              Order Summary
            </h2>

            {/* PRODUCT LIST */}
            <div className="space-y-3 max-h-70 overflow-auto">
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
            {/* <div className="mt-5 w-full">
              {" "}
              <Link
                href={"/"}
                disabled={!items.length}
                className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Confirm Order
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
