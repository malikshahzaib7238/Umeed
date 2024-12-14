import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  DollarSign, 
  CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
    const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    // Placeholder cart items - in a real app, this would come from state management or localStorage
    {
      id: 1,
      name: "Handwoven Textile Scarf",
      description: "Elegant traditional textile with intricate patterns",
      price: 2500,
      quantity: 2,
      image: 'https://s3-alpha-sig.figma.com/img/a25d/266a/dc3c77058f886344ea0e6d70f086a23e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AnmkLf5rwu4a-PaaQD0dni3iadBWjtzspkWzaNdzbDCJtB-dKcUmMRo53BXKa0d81jJK5h5EwIlxaIB-7EVkuUrwyhuQ0mdjiiAoAaD~jPh6A44NDyJNFDSf0rjOcLTLH1Uke2K7zyep2FhduKmeuLdtkGbZknSDTSZ1FjhJq-yrdkE2AwR~WmhvmGsUypn-Botj7dw0z5UYRU386NPdONesgLgg6QQrvNVtW6qJbUlxNNFVQrHy6Gy1F-FFE5iTBgHKKrBC9h35a4kE9M5s50yr9ShCUrGDaTCEE2~-~HalSQhkTJvpnUh3E6~K1oWT3xDK2uTh-HrWI1-W-R1sgxQ__'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 5000 ? 0 : 250; // Free shipping over 5000 PKR
  const total = subtotal + shippingCost - discount;

  // Promo code handler
  const applyPromoCode = () => {
    // Simple promo code logic
    if (promoCode.toUpperCase() === 'UMEED10') {
      setDiscount(Math.min(subtotal * 0.1, 1000)); // 10% off, max 1000 PKR
    } else {
      alert('Invalid promo code');
    }
  };

  // Quantity adjustment handlers
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-noto-nastaliq">
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-3" /> امید | Your Cart
          </h1>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items Column */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
            
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                Your cart is empty
              </div>
            ) : (
              cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-md p-4 flex items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-indigo-700">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} className="text-green-600" />
                        <span>{item.price} PKR</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-200 p-1 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-200 p-1 rounded"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 ml-2"
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
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal} PKR</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `${shippingCost} PKR`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{discount} PKR</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total} PKR</span>
              </div>

              {/* Promo Code Section */}
              <div className="mt-4">
                <label className="block mb-2">Promo Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow p-2 border rounded"
                  />
                  <button 
                    onClick={applyPromoCode}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Hint: Try 'UMEED10' for 10% off
                </p>
              </div>

              {/* Checkout Button */}
              <button 
                className="w-full bg-green-500 text-white p-3 rounded-full flex items-center justify-center hover:bg-green-600 transition mt-4"
                disabled={cartItems.length === 0}
              >
                <CheckCircle className="mr-2" onClick={()=>navigate("/checkout")}/>
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