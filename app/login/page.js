'use client';

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(e) {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response = await fetch("/api/auth/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Login failed"
        );

      }


      // Successful login
      window.location.href = "/";


    } catch (error) {

      setError(error.message);


    } finally {

      setLoading(false);

    }

  }



  return (

    <main className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">


        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Asset Manager
          </h1>


          <p className="mt-2 text-gray-500">
            Sign in to continue
          </p>

        </div>



        {/* Login Form */}

        <form 
          onSubmit={handleLogin}
          className="space-y-5"
        >


          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>


            <input

              id="email"

              type="email"

              placeholder="example@email.com"

              required

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            />

          </div>




          {/* Password */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>


              <Link

                href="/forgot-password"

                className="text-sm text-blue-600 hover:underline"

              >

                Forgot Password?

              </Link>


            </div>



            <input

              id="password"

              type="password"

              placeholder="Enter your password"

              required

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            />


          </div>





          {/* Error Message */}

          {error && (

            <p className="text-sm text-red-600">
              {error}
            </p>

          )}






          {/* Login Button */}

          <button

            type="submit"

            disabled={loading}

            className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"

          >

            {loading ? "Signing in..." : "Login"}

          </button>


        </form>





        {/* Divider */}

        <div className="my-6 flex items-center">

          <div className="flex-1 border-t border-gray-200"></div>


          <span className="px-3 text-sm text-gray-400">
            OR
          </span>


          <div className="flex-1 border-t border-gray-200"></div>


        </div>





        {/* Register Link */}

        <p className="text-center text-gray-600">

          Don't have an account?{" "}

          <Link

            href="/register"

            className="font-semibold text-blue-600 hover:underline"

          >

            Create Account

          </Link>


        </p>


      </div>


    </main>

  );

}