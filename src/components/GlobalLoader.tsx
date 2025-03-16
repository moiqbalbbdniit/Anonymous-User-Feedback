"use client";
import { useLoader } from "@/context/LoaderContext";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

const GlobalLoader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null; // Hide loader when not loading

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader className="h-12 w-12 text-blue-600 animate-spin" />
    </motion.div>
  );
};

export default GlobalLoader;
