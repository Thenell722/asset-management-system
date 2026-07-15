'use client';

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleRegister(e) {

    e.preventDefault();

    setError("");

    // Check passwords match
    if(password !== confirmPassword){

      setError("Passwords do not match.");
      return;

    }


    setLoading(true);


    try {

      const response = await fetch("/api/auth/register", {

        method: "POST",

        headers:{
          "Content-Type":"application/json"
        },

        body: JSON.stringify({

          name,
          email,
          password

        })

      });


      const data = await response.json();


      if(!response.ok){

        throw new Error(data.message || "Registration failed");

      }


      // Registration successful
      window.location.href = "/login";


    } catch(error){

      setError(error.message);


    } finally {

      setLoading(false);

    }

  }


  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">


        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Register to start managing your assets
          </p>

        </div>



        {/* Register Form */}
        <form 
          onSubmit={handleRegister}
          className="space-y-5"
        >


          {/* Full Name */}
          <div>

            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>


            <input

              id="fullName"
              type="text"
              placeholder="John Smith"
              required

              value={name}

              onChange={(e)=>setName(e.target.value)}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            />

          </div>




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

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            />

          </div>





          {/* Password */}
          <div>

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>


            <input

              id="password"
              type="password"
              placeholder="Create a password"
              required

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            />

          </div>





          {/* Confirm Password */}
          <div>

            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>


            <input

              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required

              value={confirmPassword}

              onChange={(e)=>setConfirmPassword(e.target.value)}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            />

          </div>





          {/* Error Message */}

          {error && (

            <p className="text-sm text-red-600">
              {error}
            </p>

          )}






          {/* Register Button */}

          <button

            type="submit"

            disabled={loading}

            className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"

          >

            {loading ? "Creating Account..." : "Create Account"}

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






        {/* Login Link */}

        <p className="text-center text-gray-600">

          Already have an account?{" "}

          <Link

            href="/login"

            className="font-semibold text-blue-600 hover:underline"

          >

            Login

          </Link>

        </p>


      </div>

    </main>
  );
}