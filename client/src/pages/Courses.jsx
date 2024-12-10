import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Star,
  DollarSign,
  Clock,
  User,
  Book,
  Bookmark,
  Zap
} from 'lucide-react';
import Header from '../constants/Header';
// Expanded and More Diverse Course Catalog
const mockCourses = [
  {
    id: 1,
    title: "Sindhi Embroidery Mastery",
    description: "A comprehensive journey through traditional and modern Sindhi embroidery techniques, from basic stitches to complex design creation",
    price: 3500,
    instructor: "Amina Khan",
    duration: "6 Weeks",
    skillLevel: "All Levels",
    category: "traditional-arts",
    subcategory: "textile-crafts",
    learningOutcomes: [
      "Master traditional Sindhi embroidery stitches",
      "Create complex embroidery designs",
      "Understand cultural significance of patterns"
    ],
    certificateProvided: true,
    rating: 4.7,
    totalStudents: 250
  },
  {
    id: 2,
    title: "Digital Marketing for Craft Entrepreneurs",
    description: "Learn strategic online marketing techniques specifically tailored for artisans and craft businesses to expand your digital presence",
    price: 5000,
    instructor: "Zara Ahmed",
    duration: "8 Weeks",
    skillLevel: "Intermediate",
    category: "business-skills",
    subcategory: "digital-marketing",
    learningOutcomes: [
      "Create compelling social media content",
      "Build an online brand strategy",
      "Use digital platforms for sales"
    ],
    certificateProvided: true,
    rating: 4.9,
    totalStudents: 180
  },
  {
    id: 3,
    title: "Advanced Ceramic Arts Workshop",
    description: "Dive deep into professional ceramic techniques, exploring both traditional Pakistani pottery methods and contemporary design approaches",
    price: 6000,
    instructor: "Hassan Ali",
    duration: "10 Weeks",
    skillLevel: "Advanced",
    category: "craft-skills",
    subcategory: "ceramics",
    learningOutcomes: [
      "Master wheel throwing techniques",
      "Develop unique glazing methods",
      "Create professional ceramic art pieces"
    ],
    certificateProvided: true,
    rating: 4.6,
    totalStudents: 120
  },
  {
    id: 4,
    title: "Creative Entrepreneurship Essentials",
    description: "A holistic program designed to transform creative individuals into successful business owners, covering everything from business planning to financial management",
    price: 4500,
    instructor: "Mariam Malik",
    duration: "7 Weeks",
    skillLevel: "Beginner",
    category: "business-skills",
    subcategory: "entrepreneurship",
    learningOutcomes: [
      "Develop a comprehensive business plan",
      "Understand financial management",
      "Learn pitch and presentation skills"
    ],
    certificateProvided: true,
    rating: 4.8,
    totalStudents: 210
  }
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [skillLevel, setSkillLevel] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('rating');
  const [courses, setCourses] = useState([]);

  // Sophisticated Filtering Setup
  const categories = ['all', ...new Set(mockCourses.map(c => c.category))];
  const subcategories = {
    'all': ['all'],
    'traditional-arts': ['all', 'textile-crafts', 'folk-art'],
    'business-skills': ['all', 'digital-marketing', 'entrepreneurship', 'finance'],
    'craft-skills': ['all', 'ceramics', 'woodworking', 'metalwork']
  };
  const skillLevels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  useEffect(() => {
    let filteredCourses = mockCourses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === 'all' || course.category === category;

      const matchesSubcategory =
        subcategory === 'all' || course.subcategory === subcategory;

      const matchesSkillLevel =
        skillLevel === 'all' || course.skillLevel === skillLevel;

      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch &&
             matchesCategory &&
             matchesSubcategory &&
             matchesSkillLevel &&
             matchesPrice;
    });

    // Enhanced Sorting Logic
    filteredCourses.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'students') return b.totalStudents - a.totalStudents;
      return 0;
    });

    setCourses(filteredCourses);
  }, [searchTerm, category, subcategory, skillLevel, priceRange, sortBy]);

  const renderCourse = (course) => (
    <div
      key={course.id}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl text-indigo-700 group-hover:text-indigo-900 transition">
          {course.title}
        </h3>
        {course.certificateProvided && (
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            title="Certificate Provided Upon Completion"
          >
            <Bookmark size={14} className="mr-1" /> Certified
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4">{course.description}</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <User size={16} className="text-indigo-600" />
          <span className="text-sm">{course.instructor}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-green-600" />
          <span className="text-sm">{course.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign size={16} className="text-blue-600" />
          <span className="text-sm">{course.price} PKR</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star size={16} className="text-yellow-500" />
          <span className="text-sm">{course.rating}/5 ({course.totalStudents} Students)</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-md mb-2 flex items-center">
          <Zap size={16} className="mr-2 text-orange-500" />
          Learning Outcomes
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {course.learningOutcomes.map((outcome, index) => (
            <li key={index}>{outcome}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-2">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
          {course.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          {course.skillLevel}
        </span>
      </div>

      <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center">
        <BookOpen size={16} className="mr-2" />
        Enroll Now
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-noto-nastaliq relative">
    <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <Book className="mr-3" />  امید | Buy Courses
          </h1>
        </div>
      </header>
        <div className="grid md:grid-cols-4 gap-6 py-12 px-4">
          {/* Advanced Sidebar Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="font-bold text-xl mb-4 flex items-center">
              <Filter size={20} className="mr-2" /> Course Filters
            </h2>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Course Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory('all');
                }}
                className="w-full p-2 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Course Subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={category === 'all'}
              >
                {subcategories[category].map(subcat => (
                  <option key={subcat} value={subcat}>
                    {subcat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Price Range Inputs */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Price Range (PKR)</label>
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

            {/* Sorting Dropdown */}
            <div>
              <label className="block mb-2 font-semibold">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Price: Low to High</option>
                <option value="students">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Course Listings */}
          <div className="col-span-3 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border rounded-full shadow-sm"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {courses.length > 0 ? (
                courses.map(renderCourse)
              ) : (
                <div className="col-span-2 text-center text-gray-600 py-8">
                  No courses found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CoursesPage;