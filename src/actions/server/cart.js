"use server";

import { authOptions } from "@/lib/authOption";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);
export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  //   getcartItem -> user.email && productId
  const query = { email: user?.email, productId: product?._id };
  const isAdded = await cartCollection.findOne(query);
  if (isAdded) {
    const updateData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };
    const result = await cartCollection.updateOne(query, updateData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * product.discount) / 100,
      userName: user?.name,
      userImage: user?.image,
    };
    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};

export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];
  const query = { email: user?.email };
  const result = await cartCollection.find(query).toArray();
  return result;
});

export const deleteItemsFormCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (id?.length !== 24) {
    return { success: false };
  }
  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);
  // if (Boolean(result.deletedCount)) {
  //   revalidatePath("/cart");
  // }
  return { success: Boolean(result.deletedCount) };
};

export const decreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  if (quantity <= 1) {
    return { success: false, message: "quantity can't be empty" };
  }

  const query = { _id: new ObjectId(id) };
  const updatedData = {
    $inc: {
      quantity: -1,
    },
  };
  const result = await cartCollection.updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};
export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  if (quantity > 10) {
    return { success: false, message: "you can't buy 10 products at a time" };
  }

  const query = { _id: new ObjectId(id) };
  const updatedData = {
    $inc: {
      quantity: 1,
    },
  };
  const result = await cartCollection.updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};

export const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  const query = { email: user?.email };
  const result = await cartCollection.deleteMany(query);
  return result;
};
