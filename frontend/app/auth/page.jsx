"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  const { login, signup, isAuthenticated, logout } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const token = useAuthStore.getState().token;

  useEffect(() => {
    setIsClient(true);

    // Logout when user visits default or auth page
    if (router.pathname === "/" || router.pathname === "/auth") {
      console.log("log out tok", token);
      logout();  
    }
  }, []);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isLogin ? { email, password } : { name, email, password }
          ),
        }
      );

      if (!response.ok) throw new Error("Authentication failed");

      const { accessToken, userId } = await response.json();

      if (isLogin) {
        login({ userId }, accessToken);
        router.push("/home");
      }

      if (!isLogin) {
        alert("User created successfully.");
        setIsLogin(true); 
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Error logging in/signing up");
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <img
          src="/ram.png"
          alt="Rick and Morty"
          width={300}
          height={300}
          className="mx-auto mb-6"
        />
        <Card className="w-96 bg-gray-800 text-white">
          <CardHeader className="text-center text-xl font-semibold">
            {isLogin ? "Login" : "Sign Up"}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                required
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  autoComplete="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              <div className="flex justify-between mt-4">
                <Button
                  type="submit"
                  className="w-1/2 text-sm border border-gray-700 bg-transparent cursor-pointer m-[3px]"
                  variant="ghost"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
                <Button
                  type="button"
                  className="w-1/2 text-sm border border-gray-700 bg-transparent cursor-pointer m-[3px]"
                  variant="ghost"
                  onClick={toggleForm}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

