import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const endpoint = login ? '/api/login' : '/api/register';

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      
          if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Server Error" }));

        if (res.status === 404) {
          alert("Email not found. Please register first.");
        } 
        else if (res.status === 401) {
          alert("Incorrect password. Please try again.");
        } 
        else if (res.status === 400) {
          alert(errorData.message || "Missing fields.");
        } 
        else {
          alert(errorData.message || "Something went wrong.");
        }

        return;
      }


      const data = await res.json();
      
      alert(data.message || "Success!");
      
   
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');

    } catch (err) {
      console.error("Auth Error:", err);
      alert("Connection failed. Is the server running?");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      

      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <h1 className="text-6xl font-bold z-10 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Quizzfy.ai
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 lg:px-24">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">
            {login ? "Welcome back" : "Create Account"}
          </h2>
          <p className="text-gray-500 mt-2 mb-8">
            {login ? "Enter your credentials to access your account" : "Sign up to get started"}
          </p>

          
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {!login && (
              <div>
                <label className="block text-sm font-semibold mb-1">Username</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Harsha" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input 
                type="password" 
                name="password" 
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="**********" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            
            <button type="submit" className="w-full bg-[#3364ea] hover:bg-[#2822ce] text-white font-bold py-3 rounded-lg transition mt-6">
              {login ? "Login" : "Sign up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {login ? "Don't have an account? " : "Already have an account? "}
            <span 
              className='text-blue-500 font-bold cursor-pointer' 
              onClick={() => setLogin((prev) => !prev)}
            > 
              {login ? "Sign up" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;