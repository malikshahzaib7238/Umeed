import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  DollarSign, 
  CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/useCartContext';
import Header from '../components/Header';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    // const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState('');
    const [cartTotal, setCartTotal] = useState(0);

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 5000 ? 0 : 250;
    const total = subtotal + shippingCost - discount;


    return (
        <div className="min-h-screen bg-[#F5DEB3] bg-opacity-30 font-noto-nastaliq">
            <Header/>

            <div className="container mx-auto py-12 px-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Cart Items Column */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold mb-4 text-[#4A2511]">Cart Items</h2>

                        {cartItems.length === 0 ? (
                            <div className="text-center text-[#8B4513] py-8 bg-[#F5DEB3] bg-opacity-50 rounded-xl shadow-md">
                                Your cart is empty
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-[#F5DEB3] bg-opacity-90 rounded-xl shadow-md p-4 flex items-center border border-[#8B4513] border-opacity-20"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md mr-4 border-2 border-[#8B4513]"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-[#4A2511]">{item.name}</h3>
                                        <p className="text-[#8B4513]">{item.description}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center space-x-2 text-[#4A2511]">
                                                <DollarSign size={16} />
                                                <span>{item.price} PKR</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="bg-[#C19A6B] p-1 rounded hover:bg-[#8B4513] hover:text-[#F5DEB3] transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="text-[#4A2511]">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="bg-[#C19A6B] p-1 rounded hover:bg-[#8B4513] hover:text-[#F5DEB3] transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-[#8B4513] ml-2 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary Column */}
                    <div className="bg-[#F5DEB3] bg-opacity-90 rounded-xl shadow-md p-6 border border-[#8B4513] border-opacity-20 h-fit">
                        <h2 className="text-2xl font-bold mb-4 text-[#4A2511]">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[#4A2511]">
                                <span>Subtotal</span>
                                <span>{subtotal} PKR</span>
                            </div>
                            <div className="flex justify-between text-[#4A2511]">
                                <span>Shipping</span>
                                <span>{shippingCost === 0 ? 'Free' : `${shippingCost} PKR`}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-700">
                                    <span>Discount</span>
                                    <span>-{discount} PKR</span>
                                </div>
                            )}
                            <hr className="border-[#8B4513] border-opacity-20" />
                            <div className="flex justify-between font-bold text-[#4A2511]">
                                <span>Total</span>
                                <span>{total} PKR</span>
                            </div>


                            {/* Checkout Button */}
                            <button
                                className="w-full bg-[#8B4513] text-[#F5DEB3] p-3 rounded-full flex items-center justify-center hover:bg-[#6B3410] transition-colors mt-4 disabled:opacity-50"
                                disabled={cartItems.length === 0}
                                onClick={() => navigate("/checkout")}
                            >
                                <CheckCircle className="mr-2" />
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;