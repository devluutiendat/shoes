"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Premium Quality",
    description:
      "We carefully select materials to ensure durability and comfort.",
  },
  {
    title: "Trendy Designs",
    description: "Stay ahead of the fashion curve with our latest collections.",
  },
  {
    title: "Affordable Prices",
    description: "Get the best value without compromising on quality.",
  },
  {
    title: "Customer Satisfaction",
    description: "Your happiness is our priority.",
  },
];

const AboutUs = () => {
  return (
    <section id="About" className="relative bg-gray-900 text-white py-20 px-6">
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl font-bold">About Us</h2>
          <p className="text-2xl text-gray-300">
            At My Shop, we believe the right pair of shoes can elevate your
            confidence and style. Our mission is to provide high-quality,
            stylish, and comfortable footwear that suits every occasion.
          </p>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
