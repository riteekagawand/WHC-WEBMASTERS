import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../store/auth";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const setTokenState = useSetRecoilState(tokenState);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        setTokenState(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          navigate("/home");
        }, 500);

        return;
      }

      throw new Error(data.message || "Invalid email or password");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful! Please log in.");
        setActiveTab("login");
      } else {
        throw new Error(data.message || "User already exists or server error");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "HERSPACE | USER LOGIN / SIGNUP";
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightpurp">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 py-2 text-center font-semibold ${
              activeTab === "login" ? "border-b-2 border-purple" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-center font-semibold ${
              activeTab === "signup" ? "border-b-2 border-purple" : ""
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded pr-10"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  />
                )}
              </div>
            </div>

            <button className="w-full bg-purple text-white py-2 rounded" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ImSpinner2 className="animate-spin" /> Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded pr-10"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  />
                )}
              </div>
            </div>

            <button className="w-full bg-purple text-white py-2 rounded" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ImSpinner2 className="animate-spin" /> Signing up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
