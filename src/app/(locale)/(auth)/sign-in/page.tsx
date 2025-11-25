"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      setLoading(true);
      toast.success("Login successful!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.resonpse?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-3" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-3" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="password123"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || isSubmitting}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
