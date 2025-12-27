"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const SocialButton = () => {
  const searchParams = useSearchParams();
  console.log();
  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: "false",
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
    console.log(result);
    if (result.ok) {
      Swal.fire("success", "welcome", "success");
    } else {
      Swal.fire("error", "something worng", "error");
    }
  };
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="btn btn-outline btn-error flex-1"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};

export default SocialButton;
