import React, { useState } from 'react';
import { Users, ShoppingBag, BookOpen, ImagePlus } from 'lucide-react';

const SellPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    skillLevel: ''
  });

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    setProductDetails(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log(selectedType === 'product' ? productDetails : courseDetails);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-noto-nastaliq relative">
              <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingBag className="mr-3" />  امید | Selling Platform
          </h1>
        </div>
      </header>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">What Would You Like to Sell?</h1>

        {!selectedType && (
          <div className="grid md:grid-cols-2 gap-6">
            <button 
              onClick={() => handleTypeSelection('product')}
              className="bg-white border-2 border-indigo-200 p-6 rounded-xl hover:shadow-lg transition flex items-center space-x-4"
            >
              <ShoppingBag size={40} className="text-indigo-600" />
              <div>
                <h2 className="text-xl font-semibold">Handmade Products</h2>
                <p className="text-gray-600">Sell your crafts, artworks, and traditional items</p>
              </div>
            </button>

            <button 
              onClick={() => handleTypeSelection('course')}
              className="bg-white border-2 border-indigo-200 p-6 rounded-xl hover:shadow-lg transition flex items-center space-x-4"
            >
              <BookOpen size={40} className="text-indigo-600" />
              <div>
                <h2 className="text-xl font-semibold">Skill Development Courses</h2>
                <p className="text-gray-600">Share your expertise and teach skills</p>
              </div>
            </button>
          </div>
        )}

        {selectedType === 'product' && (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">List Your Handmade Product</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={productDetails.name}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-2">Price (PKR)</label>
                <input 
                  type="number" 
                  name="price"
                  value={productDetails.price}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2">Description</label>
                <textarea 
                  name="description"
                  value={productDetails.description}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded" 
                  rows="4"
                  required 
                />
              </div>
              <div>
                <label className="block mb-2">Category</label>
                <select 
                  name="category"
                  value={productDetails.category}
                  onChange={handleProductChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  <option value="textiles">Textiles</option>
                  <option value="pottery">Pottery</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Product Image</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="file" 
                    name="image"
                    onChange={handleProductChange}
                    className="hidden"
                    id="product-image"
                    accept="image/*"
                  />
                  <label 
                    htmlFor="product-image" 
                    className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded cursor-pointer"
                  >
                    <ImagePlus size={20} />
                    <span>Upload Image</span>
                  </label>
                  {productDetails.image && (
                    <span>{productDetails.image.name}</span>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
            >
              List Product
            </button>
          </form>
        )}

        {selectedType === 'course' && (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Create Your Skill Course</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Course Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={courseDetails.title}
                  onChange={handleCourseChange}
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block mb-2">Price (PKR)</label>
                <input 
                  type="number" 
                  name="price"
                  value={courseDetails.price}
                  onChange={handleCourseChange}
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2">Course Description</label>
                <textarea 
                  name="description"
                  value={courseDetails.description}
                  onChange={handleCourseChange}
                  className="w-full p-2 border rounded" 
                  rows="4"
                  required 
                />
              </div>
              <div>
                <label className="block mb-2">Course Duration</label>
                <select 
                  name="duration"
                  value={courseDetails.duration}
                  onChange={handleCourseChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Duration</option>
                  <option value="1week">1 Week</option>
                  <option value="2weeks">2 Weeks</option>
                  <option value="1month">1 Month</option>
                  <option value="2months">2 Months</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Skill Level</label>
                <select 
                  name="skillLevel"
                  value={courseDetails.skillLevel}
                  onChange={handleCourseChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
            >
              Create Course
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellPage;