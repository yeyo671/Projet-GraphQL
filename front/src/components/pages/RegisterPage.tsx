import { useState } from "react";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 font-bold ${
                activeTab === "register"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
            <button
              className={`px-4 py-2 font-bold ml-4 ${
                activeTab === "login"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
          </div>
          {activeTab === "register" ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="login-email"
                type="email"
                placeholder="Email"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="login-password"
                type="password"
                placeholder="Password"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
