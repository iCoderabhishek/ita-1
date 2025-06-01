"use client";

import { motion } from "framer-motion";
import FacultyComponent from "@/components/faculty/FacultyComponent";

export default function FacultyPage() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner */}
      <div className="bg-primary py-12 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Faculty</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Meet our experienced and dedicated faculty members who are
              committed to providing quality education
            </p>
          </motion.div>
        </div>
      </div>

      {/* Faculty Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FacultyComponent />
      </motion.div>
    </main>
  );
}
