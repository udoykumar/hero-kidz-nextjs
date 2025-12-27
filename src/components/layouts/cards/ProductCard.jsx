import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
const ProductCard = ({ product }) => {
  const { title, image, price, discount, ratings, reviews, sold, _id } =
    product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
      <div className="mx-auto">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="object-cover w-90 h-80"
        />
      </div>

      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2">{title}</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <FaStar className="text-warning" />
          <span className="font-medium">{ratings}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        {/* Sold */}
        <p className="text-sm text-gray-500">Sold: {sold}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {discount && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Add to cart */}
        <button className="btn btn-primary btn-sm mt-3 gap-2">
          <FaShoppingCart />
          Add to Cart
        </button>
        <Link
            href={`/products/${_id}`}
          className="btn btn-primary btn-sm mt-3 gap-2"
        >
          <FcViewDetails />
          View Details
        </Link>
      </div>
    </div>
  );
};
export default ProductCard;
