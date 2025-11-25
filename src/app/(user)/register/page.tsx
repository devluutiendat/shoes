"use client";
import "../globals.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { registerUser } from "@/api/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .refine((val) => !val.includes(" "), "Email cannot contain spaces"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number must contain 10-15 digits"),
  name: z.string().min(1, "Name is required"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await registerUser(data);
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Register</CardTitle>
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

          <div>
            <Label className="mb-3" htmlFor="phone">
              Phone
            </Label>
            <Input
              type="text"
              id="phone"
              {...register("phone")}
              placeholder="1234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-3" htmlFor="name">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name")}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || isSubmitting}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
