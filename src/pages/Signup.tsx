import React from "react";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-3xl font-bold">RepBooster</h1>
          <p className="text-gray-500 mt-2">
            Create your account to get started
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
