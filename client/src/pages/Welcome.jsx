import React from "react";
import { Network, Store, ShoppingCart, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

const WelcomePage = () => {
  const { account } = useAuth();


    const navigate = useNavigate();

    const navigationButtons = [
        {
            label: "Networking",
            icon: <Network size={24} />,
            route: "/network",
            description: "Connect with other rural entrepreneurs"
        },
        {
            label: "Sell Products",
            icon: <Store size={24} />,
            route: "/sell",
            description: "Showcase your handmade items"
        },
        {
            label: "Buy Products",
            icon: <ShoppingCart size={24} />,
            route: "/products",
            description: "Discover local artisanal products"
        },
        {
            label: "Take Courses",
            icon: <Book size={24} />,
            route: "/courses",
            description: "Learn new skills and crafts"
        },
    ];

    return (
      <div className="relative min-h-screen bg-gray-50 font-noto-nastaliq">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="/bgvid1.mp4" // Replace with the path to your video
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

            {/* Overlay Content */}
            <div className="relative z-10">
                <Header />

                <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
                    {/* Main Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-[#4A2511] mb-4">
                            امید | Umeed
                        </h1>
                        <p className="text-2xl text-[#6B3410]">
                            Empowering Rural Women Entrepreneurs of Sindh
                        </p>
                    </div>

                    {/* Navigation Cards */}
                    {account?.username  ? (
                        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                            {navigationButtons.map((button) => (
                                <button
                                    key={button.label}
                                    onClick={() => navigate(button.route)}
                                    className="bg-[#F5DEB3] bg-opacity-90 p-6 rounded-lg flex flex-col items-center
                                        shadow-lg hover:bg-[#E6CCa3] transition-all transform hover:-translate-y-1
                                        border-2 border-[#8B4513]"
                                >
                                    <div className="text-[#4A2511] mb-3">
                                        {button.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#4A2511] mb-2">
                                        {button.label}
                                    </h3>
                                    <p className="text-[#6B3410] text-sm text-center">
                                        {button.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    ) : (
<p></p>
                    )}
                </main>
            </div>

            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-[#F5DEB3] opacity-40 z-0"></div>

            {/* Footer */}
            <footer className="relative z-10 bg-[#C19A6B] bg-opacity-90 py-7">
                <div className="container mx-auto text-center">
                    <p className="text-[#4A2511]">
                        © 2024 امید | Umeed. Empowering Rural Women Entrepreneurs of Sindh
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;