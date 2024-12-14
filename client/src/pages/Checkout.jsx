import React, { useState } from 'react';
import { 
  CreditCard, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  DollarSign 
} from 'lucide-react';

const CheckoutPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash'
  });

  // Cart items (would typically come from global state)
  const [cartItems] = useState([
    {
      id: 1,
      name: "Handwoven Textile Scarf",
      price: 2500,
      quantity: 2
    }
  ]);

  // Order summary calculation
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shippingCost;

  // Form validation state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare order data
      const orderData = {
        ...formData,
        items: cartItems,
        total,
        orderDate: new Date().toISOString()
      };

      // Simulated order submission
      try {
        // In a real app, this would be an API call
        console.log("Order Submitted:", orderData);
        alert("Order placed successfully! Thank you for your purchase.");
      } catch (error) {
        console.error("Order submission failed:", error);
        alert("Order submission failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-noto-nastaliq">
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <CreditCard className="mr-3" /> امید | Checkout
          </h1>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 flex items-center">
                    <User size={16} className="mr-2 text-indigo-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 flex items-center">
                    <Mail size={16} className="mr-2 text-indigo-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 flex items-center">
                  <Phone size={16} className="mr-2 text-indigo-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 flex items-center">
                  <MapPin size={16} className="mr-2 text-indigo-600" />
                  Shipping Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
                  placeholder="Enter your full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* City and Postal Code */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : ''}`}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.postalCode ? 'border-red-500' : ''}`}
                    placeholder="Enter postal code"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price * item.quantity} PKR</span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal} PKR</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `${shippingCost} PKR`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{total} PKR</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white p-3 rounded-full flex items-center justify-center hover:bg-green-600 transition mt-6"
            >
              <CheckCircle2 className="mr-2" />
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;