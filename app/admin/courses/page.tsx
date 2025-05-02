"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";
import EditCourses from "@/components/courses/EditCourses";
import { toast } from "sonner";

// Dummy courses data
const courses = [
  {
    id: 1,
    name: "Computer Science & Technology",
    code: "CST",
    duration: "3 Years",
    seats: 60,
    coordinator: "Dr. John Doe",
    description:
      "Diploma program covering computer programming, software development, and IT infrastructure.",
    subjects: [
      "Programming Fundamentals",
      "Database Management",
      "Web Development",
      "Computer Networks",
    ],
  },
  {
    id: 2,
    name: "Electrical Engineering",
    code: "EE",
    duration: "3 Years",
    seats: 60,
    coordinator: "Dr. Jane Smith",
    description:
      "Comprehensive program in electrical systems, power generation, and control systems.",
    subjects: [
      "Circuit Theory",
      "Power Systems",
      "Electrical Machines",
      "Control Systems",
    ],
  },
  {
    id: 3,
    name: "Electronics and Telecommunication Engineering",
    code: "ETCE",
    duration: "3 Years",
    seats: 60,
    coordinator: "Dr. Robert Johnson",
    description:
      "Program focusing on electronic circuits, communication systems, and signal processing.",
    subjects: [
      "Electronic Devices",
      "Communication Systems",
      "Digital Electronics",
      "Microprocessors",
    ],
  },
];

const fetchAllCourses = () => {};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Course Management
          </h1>
          <p className="text-gray-600">
            Manage diploma programs and their details
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Course
        </button>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/40">
          <EditCourses
            onClose={() => setShowAddModal(false)}
            getAllCourses={fetchAllCourses}
            showToastMessage={(msg) => toast.success(msg)}
          />
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {course.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Code: {course.code}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">
                  {course.seats} seats
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Course Coordinator
              </h4>
              <p className="text-sm text-gray-600">{course.coordinator}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Core Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {course.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
