"use client";

import { useState } from "react";
import ProductList from "@/components/products/ProductList";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative">
      

      <ProductList />

      {/* Cart Drawer */}
      
    </div>
  );
}
