"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const cart = useCartStore((state) => state.cart);

  const itemInCart = cart.find((p) => p.id === product.id);
  const [quantity, setQuantity] = useState(itemInCart?.quantity || 0);

  const increment = () => {
    addItem(product);
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      removeItem(product.id);
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Card className="flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">
      <div className="relative">
        <CardContent className="p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="mx-auto"
          />

          <h3 className="mt-4 font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-1">₹{product.price}</p>

          {/* Badge example */}
          {product.new && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </CardContent>
      </div>

      <CardFooter className="p-4 flex justify-between items-center">
        {quantity > 0 ? (
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={decrement}>
              -
            </Button>
            <span>{quantity}</span>
            <Button size="sm" variant="outline" onClick={increment}>
              +
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={increment}>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
