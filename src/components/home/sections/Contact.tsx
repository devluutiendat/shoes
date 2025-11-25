"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form Submitted:", data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <motion.div
        className="md:w-1/2 w-full p-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="your.email@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message
            </label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Your message here..."
              rows={5}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </motion.div>

      <motion.div
        className="hidden md:block w-1/2 h-full"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative h-full min-h-[400px]">
          <Image
            src="/contact-image.jpg"
            alt="Contact illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
