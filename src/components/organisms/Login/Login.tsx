import React from "react";

export const Login = () => {
  return (
    <div className="bg-white w-96 h-96 rounded absolute">
      <h1>Login</h1>
      <input type="email" name="" id="" />
      <input
        className="block w-100 border p-1 focus:border-gray-700"
        type="password"
        name=""
        id=""
      />
      <button>Enter</button>
    </div>
  );
};
