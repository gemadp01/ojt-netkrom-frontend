import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { GuestPage } from "@/components/guard/GuestPage";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        // Kalau backend ngirim { success: false, message: "..." }
        // maka otomatis error code 500, error code dibawah itu dijadikan error server
        if (result.success === false) {
          throw new Error(result.message);
        }
        if (result.message) {
          setStatus(result.message);
          return;
        }
      } else {
        setLoginSuccess(true);
        // setStatus(result.message);
        localStorage.setItem("token", result.token);
        dispatch({ type: "USER_LOGIN", payload: result.user });

        setRole(result.user.role);
      }
    } catch (error) {
      setStatus((error.message = "An error occurred"));
    }
  };

  const username = watch("username");
  const password = watch("password");

  useEffect(() => {
    if (status) setStatus("");
  }, [username, password]);

  useEffect(() => {
    if (loginSuccess) {
      let timer; // simpan id timer

      if (role === "admin") {
        timer = setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000);
      } else {
        timer = setTimeout(() => {
          navigate("/products");
        }, 3000);
      }

      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-background rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-heading mb-4">{status}</h2>
            <p className="text-gray-600 mb-6">
              Welcome back! Redirecting you to
              {role === "admin" ? " your Dashboard" : " the Products Page"}...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GuestPage>
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-heading mb-2">
                Welcome Back
              </h2>
              <p className="text-text-secondary">
                Sign in to your account to continue shopping
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  {/* General Error */}
                  {status && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                      <span className="text-red-700">{status}</span>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-foreground" />
                      </div>
                      <input
                        type="text"
                        {...register("username", {
                          required: "Username is required",
                        })}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg  transition-colors"
                        placeholder="Enter your username"
                        autoFocus
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-foreground" />
                      </div>
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-10 pr-12 py-3 border rounded-lg  transition-colors"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    width="full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foreground mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-text-secondary">
                Don't have an account?
                <Link to="/register">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => console.log("Navigate to register")}
                  >
                    Sign up here
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </GuestPage>
  );
};

export default LoginPage;
