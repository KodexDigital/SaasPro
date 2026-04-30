import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // TODO: connect to backend later
    console.log("Register data:", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - Branding */}
      <div className="hidden md:flex w-1/2 bg-black text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">SaaS Pro Platform</h1>
          <p className="mt-4 text-gray-300">
            Build, manage and scale your business efficiently.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Trusted by modern teams worldwide
        </p>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="center">
            <h2 className="text-2xl font-bold">Create account</h2>
            <p className="text-gray-500 text-sm">
              Start your journey in minutes
            </p>
          </div>

          <div className="space-y-2">
            <input
              name="firstName"
              placeholder="First name"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition: all 0.2s ease"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last name"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />

            <input
              name="phoneNumber"
              placeholder="Phone number"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Create account
            </button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-black font-medium cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}