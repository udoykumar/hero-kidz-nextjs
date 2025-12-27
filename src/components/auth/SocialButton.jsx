import React from "react";
import { FaGoogle } from "react-icons/fa";

const SocialButton = () => {
  return (
    <div className="flex gap-3 mt-4">
      <button className="btn btn-outline btn-error flex-1">
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};

export default SocialButton;
