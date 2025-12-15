'use client';
import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const cart = useCartStore((state) => state.cart); // for badge

    return (
        <>
            <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    
                    {/* Logo / Brand */}
                    <Link href="/">
                        <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
                            StallOrder
                        </h1>
                    </Link>

                    {/* Right Side */}
                    <nav className="flex items-center gap-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">
                            Products
                        </Link>

                        {/* Cart Button with Badge */}
                        <Button onClick={() => setCartOpen(true)} className="relative">
                            Cart
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Placeholder to avoid content being hidden behind fixed header */}
            <div className="h-16"></div>

            {/* Cart Drawer */}
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
