import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  DollarSign, 
  ChevronDown, Users
} from 'lucide-react';

// Expanded Mock Product Data with more categories
const mockProducts = [
  {
    id: 1,
    name: "Sindhi Embroidered Cushion",
    description: "Handcrafted traditional cushion with intricate Sindhi embroidery",
    price: 1200,
    seller: "Fatima's Crafts",
    category: "textile",
    subcategory: "embroidery",
    rating: 4.5,
    image: "/api/placeholder/300/300"
  },
  {
    id: 2,
    name: "Pottery Flower Vase",
    description: "Handmade clay vase with traditional Sindhi design",
    price: 2500,
    seller: "Ceramic Dreams",
    category: "pottery",
    subcategory: "clay",
    rating: 4.8,
    image: "/api/placeholder/300/300"
  },
  {
    id: 3,
    name: "Silver Jhumka Earrings",
    description: "Intricate silver earrings with traditional Sindhi design",
    price: 3500,
    seller: "Heritage Jewels",
    category: "jewelry",
    subcategory: "silver",
    rating: 4.9,
    image: "/api/placeholder/300/300"
  },
  {
    id: 4,
    name: "Handwoven Crochet Shawl",
    description: "Delicate crochet shawl with intricate patterns",
    price: 4000,
    seller: "Craft Collective",
    category: "textile",
    subcategory: "crochet",
    rating: 4.6,
    image: "/api/placeholder/300/300"
  }
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('rating');
  const [products, setProducts] = useState([]);

  // Dynamically generate category and subcategory lists
  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];
  const subcategories = {
    'all': ['all'],
    'textile': ['all', 'embroidery', 'crochet'],
    'pottery': ['all', 'clay', 'ceramic'],
    'jewelry': ['all', 'silver', 'gold']
  };

  useEffect(() => {
    let filteredProducts = mockProducts.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === 'all' || product.category === category;

      const matchesSubcategory =
        subcategory === 'all' || product.subcategory === subcategory;

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
    });

    // Sorting logic
    filteredProducts.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    setProducts(filteredProducts);
  }, [searchTerm, category, subcategory, priceRange, sortBy]);

  const renderProduct = (product) => (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md p-4 flex hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-indigo-700">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign size={16} className="text-green-600" />
          <span>{product.price} PKR</span>
          <Star size={16} className="text-yellow-500" />
          <span>{product.rating}/5</span>
        </div>
        <div className="flex space-x-2">
          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            {product.subcategory}
          </span>
        </div>
        <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center">
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
<div className="min-h-screen bg-gray-50 font-noto-nastaliq relative">
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-3" />  امید | Buy Products
          </h1>
        </div>
      </header>

<div classname="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-4 gap-6 py-12 px-4" >
          {/* Sidebar Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="font-bold text-xl mb-4 flex items-center">
              <Filter size={20} className="mr-2" /> Product Filters
            </h2>

            <div className="mb-4">
              <label className="block mb-2">Product Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory('all'); // Reset subcategory when category changes
                }}
                className="w-full p-2 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Product Subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={category === 'all'}
              >
                {subcategories[category].map(subcat => (
                  <option key={subcat} value={subcat}>{subcat.charAt(0).toUpperCase() + subcat.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Price Range (PKR)</label>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full p-2 border rounded"
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="rating">Highest Rating</option>
                <option value="price">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-4">
            <div className="flex space-x-4">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-full"
                />
                <Search 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
            </div>

            <div className="space-y-4">
              {products.length > 0 ? (
                products.map(renderProduct)
              ) : (
                <div className="text-center text-gray-600 py-8">
                  No products found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>

  );
};

export default ProductsPage;