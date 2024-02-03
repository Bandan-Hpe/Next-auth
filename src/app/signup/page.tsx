"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttondissabled, setbuttondissabled] = useState(false);

  const Signup = async () => {
    try {
      const response= await axios.post("/api/users/signup", user);
      console.log("signup success",response.data);
      router.push("/login")
    } catch (error: any) {
      console.log("signup failed ", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttondissabled(false);
    } else {
      setbuttondissabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Sign Up</h1>
      <hr />
      <div className="flex space-x-4 align-center">
        <label htmlFor="username">user Name :</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="p-2 border-gray-300  rounded-lg mb-4 focus:outline-none focus:border-gray-400 text-black"
        />
      </div>
      <div className="flex space-x-12  align-center">
        <label htmlFor="Email">Email :</label>
        <input
          type="text"
          id="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="p-2 border-gray-300  rounded-lg mb-4 focus:outline-none focus:border-gray-400 text-black"
        />
      </div>
      <div className="flex gap-2 align-center">
        <label htmlFor="username">Password :</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="p-2 border-gray-300  rounded-lg mb-4 focus:outline-none focus:border-gray-400 text-black"
        />
      </div>

      <button
        className="p-2 border-none rounded-md bg-blue-500 text-white   focus:outline-none  mb-3"
        onClick={Signup}
      >
        {buttondissabled ? "NO signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default signup;
