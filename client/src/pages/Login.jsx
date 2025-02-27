import React, { useState } from 'react';
import { Users, Lock, EyeOff, Eye, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { login, register, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const user = await login({ username: formData.username, password: formData.password });
        setUser(user);
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const user = await register({
          username: formData.username,
          password: formData.password
        });
        setUser(user);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center font-noto-nastaliq">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="/bgvid1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-[#F5DEB3] opacity-40"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-[#F5DEB3] bg-opacity-90 shadow-xl rounded-xl border-2 border-[#8B4513] p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#4A2511] mb-2">
              امید | Umeed
            </h1>
            <p className="text-[#6B3410]">
              {isLogin
                ? 'Welcome back! Please login to your account'
                : 'Create a new account to join our community'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="text-[#8B4513]" size={20} />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-80 border-2 border-[#8B4513] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3410]"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-[#8B4513]" size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-80 border-2 border-[#8B4513] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3410]"
                />
              </div>
            )}

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-[#8B4513]" size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 bg-white bg-opacity-80 border-2 border-[#8B4513] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3410]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <Eye className="text-[#8B4513]" size={20} />
                ) : (
                  <EyeOff className="text-[#8B4513]" size={20} />
                )}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-[#8B4513]" size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-80 border-2 border-[#8B4513] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3410]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#8B4513] text-white py-2 rounded-md hover:bg-[#6B3410] transition duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </button>

            {error && <p className="text-red-700 text-sm text-center mt-2">{error}</p>}
          </form>

          <div className="text-center mt-6">
            <p className="text-[#4A2511]">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#6B3410] hover:underline font-semibold"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>

        <footer className="text-center mt-4 text-[#4A2511]">
          <p>© 2024 امید | Umeed. Empowering Rural Women Entrepreneurs of Sindh</p>
        </footer>
      </div>
    </div>
  );
};

export default AuthPage;