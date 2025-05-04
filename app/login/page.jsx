"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!studentId) {
      toast.error("Student ID is required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Login successful!");
        router.push("/home");
      } else {
        toast.error(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-md rounded-xl shadow-xl overflow-hidden  border-gray-700">
          <div className="bg-black-700  ">
            {/* <h1 className="text-2xl font-bold text-white tracking-tight">
              <span className="text-violet-400">CODE</span>
              <span className="text-gray-300">X</span>
            </h1> */}
            {/* <img src="https://res.cloudinary.com/dl2dd2gyl/image/upload/v1746361925/IMG_7633_z1imge.png" alt="" /> */}
            <img
  src="https://res.cloudinary.com/dl2dd2gyl/image/upload/v1746361925/IMG_7633_z1imge.png"
  alt="logo"
  className="w-40 object-contain mx-auto "
/>

          </div>

          <div className="px-8 py-5">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Please enter your student ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-400 hover:bg-white text-black font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
