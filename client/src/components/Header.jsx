import React, { useState } from 'react';
import { ShoppingCart, LogOut, UserCircle, Users, ShoppingBag, Book, User, CreditCard, ShoppingBasket } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
    const { logout, account } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    const getTitle = () => {
        const titles = {
            "/": { icon: Users, text: "امید | Umeed" },
            "/network": { icon: Users, text: "امید | Professional Network" },
            "/products": { icon: ShoppingCart, text: "امید | Buy Products" },
            "/sell": { icon: ShoppingBag, text: "امید | Selling Platform" },
            "/courses": { icon: Book, text: "امید | Buy Courses" },
            "/cart": { icon: ShoppingCart, text: "امید | Your Cart" },
            "/setup": { icon: User, text: "امید | Profile Setup" },
            "/checkout": { icon: CreditCard, text: "امید | Checkout" },
            "/orders": { icon: ShoppingBasket, text: "امید | Your Orders" }
        };

        const route = titles[location.pathname];
        if (!route) return null;

        const Icon = route.icon;
        return (
            <h1 className="text-2xl font-bold flex items-center">
                <Icon className="mr-3" />{route.text}
            </h1>
        );
    };

    return (
        <header className="bg-[#C19A6B] bg-opacity-90 text-[#4A2511] p-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {getTitle()}
                <nav className="space-x-4">
                    {account?.username ? (
                        <div className="relative">
                            <div className="flex flex-row gap-4">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center bg-[#8B4513] text-[#F5DEB3] px-4 py-2 rounded-md hover:bg-[#6B3410] transition-colors"
                                >
                                    <UserCircle className="mr-2" />
                                    <span className="hidden md:inline">{account.username}</span>
                                </button>

                                <button
                                    onClick={() => navigate("/cart")}
                                    className="flex items-center bg-[#8B4513] text-[#F5DEB3] px-4 py-2 rounded-md hover:bg-[#6B3410] transition-colors"
                                >
                                    <ShoppingCart className="mr-2" />
                                    <span className="hidden md:inline">Cart</span>
                                </button>

                                <button
                                    onClick={() => navigate("/orders")}
                                    className="flex items-center bg-[#8B4513] text-[#F5DEB3] px-4 py-2 rounded-md hover:bg-[#6B3410] transition-colors"
                                >
                                    <ShoppingBasket className="mr-2" />
                                    <span className="hidden md:inline">Orders</span>
                                </button>
                            </div>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#F5DEB3] shadow-lg rounded-md z-10">
                                    <ul>
                                        <li className="px-4 py-2 text-[#4A2511] hover:bg-[#E6CCa3] cursor-pointer transition-colors"
                                            onClick={() => navigate("/setup")}>Profile</li>
                                        <li className="px-4 py-2 text-[#4A2511] hover:bg-[#E6CCa3] cursor-pointer transition-colors"
                                            onClick={logout}>
                                            <LogOut className="mr-2 inline" /> Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                className="bg-[#8B4513] text-[#F5DEB3] px-4 py-2 rounded-md hover:bg-[#6B3410] transition-colors"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="bg-[#F5DEB3] text-[#4A2511] px-4 py-2 rounded-md hover:bg-[#E6CCa3] transition-colors"
                                onClick={() => navigate("/login")}
                            >
                                Register
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}