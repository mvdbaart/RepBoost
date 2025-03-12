import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4">
        {message && (
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-600">
              {message}
            </AlertDescription>
          </Alert>
        )}
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-3xl font-bold">ReviewBoost</h1>
          <p className="text-gray-500 mt-2">Sign in to manage your reviews</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
