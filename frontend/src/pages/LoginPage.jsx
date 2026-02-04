import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left Side: Brand Section */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-black relative overflow-hidden">
        {/* Simple Grid Background Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <h1 className="text-6xl font-bold z-10 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
  Quizzfy.ai
    </h1>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 lg:px-24">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-2 mb-8">Enter your credentials to access your account</p>

         

          {/* Form Fields */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input type="text" placeholder="Harsha" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input type="email" placeholder="name @example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input type="password" placeholder="**********" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button className="w-full bg-[#3364ea] hover:bg-[#2822ce] text-white font-bold py-3 rounded-lg transition mt-6">
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;