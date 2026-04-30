// import { useState } from "react";
// import { login } from "./api";
// import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
//   const setAuth = useAuthStore((s) => s.setAuth);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
    //   const data = await login(email, password);
    //   setAuth(data.user, data.token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 border rounded w-80 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        {/* <input
          className="w-full border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /> */}

        <input
          className="w-full border p-2"
          placeholder="Email"
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
        />
        {/* <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /> */}

        <button
          className="w-full bg-black text-white p-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
            Don't have an account yet?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-black font-medium cursor-pointer"
            >
              Sign up
            </span>
          </p>
      </div>
    </div>
  );
}