"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validate";
import { loginUser } from "@/lib/actions/auth";
import { login } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setAdmin } from "@/store/adminSlice";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdmin } = useSelector((state: RootState) => state.admin);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: login) => {
    try {
      const user = await loginUser(data);
      dispatch(setAdmin(user.admin));
      setLoading(true);
      toast.success("Login successful!");
      if (user.admin === true) router.push("/admin/products");
      else router.push("/");
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
