"use client";
import { AppDispatch } from "@/store";
import { addToCart, CartItem } from "@/store/cartSlice";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface buttonProps {
  item: CartItem;
}

const AddCartButton = ({ item }: buttonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <button
      onClick={() => handleAddToCart}
      className="flex-1 bg-foreground text-background px-6 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
    >
      ADD TO CART
    </button>
  );
};

export default AddCartButton;
