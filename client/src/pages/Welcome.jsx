import React, { useState } from "react";
import {
  HelpCircle,
  ShoppingCart,
  BookOpen,
  Users,
  Network,
  Store,
  Book,
  UserCircle,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Simulated user authentication state
// In a real app, this would come from your authentication context/service


const WelcomePage = () => {

  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showDropdown, setShowDropdown] = useState(false);

  const sections = {
    overview: {
      title: "Empowering Rural Women Entrepreneurs",
      description:
        "A platform designed to connect, support, and elevate women entrepreneurs in Sindh, Pakistan.",
    },
    marketplace: {
      title: "Marketplace",
      description:
        "Showcase and sell your handmade products to a global audience.",
    },
    courses: {
      title: "Skill Development",
      description:
        "Share your expertise or learn new skills through our comprehensive courses.",
    },
  };

  // Navigation buttons with routes
  const navigationButtons = [
    {
      label: "Networking",
      icon: <Network size={20} />,
      route: "/network",
    },
    {
      label: "Sell Products",
      icon: <Store size={20} />,
      route: "/sell",
    },
    {
      label: "Buy Products",
      icon: <ShoppingCart size={20} />,
      route: "/products",
    },
    {
      label: "Take Courses",
      icon: <Book size={20} />,
      route: "/courses",
    },
  ];
  const { user, logout, account } = useAuth();
  console.log(user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-noto-nastaliq">
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">امید | Umeed </h1>
          <nav className="space-x-4">
            {account?.username ? (
              <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center bg-white text-indigo-700 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <UserCircle className="mr-2" />
                <span className="hidden md:inline">{account?.username || "Username"}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                  <ul>
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate("/setup")}>Profile</li>
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                      <LogOut className="mr-2 inline" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

            ) : (
              <>
                <button
                  className="hover:bg-indigo-800 px-3 py-2 rounded"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-white text-indigo-700 px-4 py-2 rounded font-semibold"
                  onClick={() => navigate("/login")}
                >
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              {sections[activeSection].title}
            </h2>
            <p className="text-gray-600 text-lg">
              {sections[activeSection].description}
            </p>

            <div className="flex space-x-4">
              {Object.keys(sections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                    activeSection === key
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {key === "overview" && <HelpCircle size={20} />}
                  {key === "marketplace" && <ShoppingCart size={20} />}
                  {key === "courses" && <BookOpen size={20} />}
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </button>
              ))}
            </div>

            {/* New Navigation Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {navigationButtons.map((button) => (
                  <button
                    key={button.label}
                    onClick={() => navigate(button.route)}
                    className="bg-white border border-indigo-200 text-indigo-700 px-4 py-3 rounded-lg
                    flex items-center justify-center space-x-3
                    hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                    {button.icon}
                    <span className="font-semibold">{button.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4 border border-gray-100">
            <div className="flex items-center space-x-4">
              <Users size={40} className="text-indigo-600" />
              <div>
                <h3 className="font-bold text-lg">Community-Driven Platform</h3>
                <p className="text-gray-600">
                  Connect with mentors, peers, and potential customers.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <BookOpen size={40} className="text-indigo-600" />
              <div>
                <h3 className="font-bold text-lg">Skill Development</h3>
                <p className="text-gray-600">
                  Access training resources and sell your own courses.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ShoppingCart size={40} className="text-indigo-600" />
              <div>
                <h3 className="font-bold text-lg">Global Marketplace</h3>
                <p className="text-gray-600">
                  Showcase and sell your unique handmade products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 امید | Umeed. Empowering Rural Women Entrepreneurs
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
