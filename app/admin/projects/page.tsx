"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, Tag, Users } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

// Dummy projects data
const projects = [
  {
    id: 1,
    title: "Smart Energy Monitoring System",
    description:
      "A system that monitors electricity consumption in real-time and provides insights on energy usage patterns.",
    department: "Electrical Engineering",
    team: ["Amit Kumar", "Priya Singh", "Rajesh Sharma"],
    image: "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg",
    tags: ["IoT", "Energy", "Monitoring"],
    year: "2024",
  },
  {
    id: 2,
    title: "Automated Attendance System",
    description:
      "A facial recognition-based attendance system that automatically records student attendance.",
    department: "Computer Science & Technology",
    team: ["Sneha Patel", "Vikram Joshi"],
    image: "https://images.pexels.com/photos/5952738/pexels-photo-5952738.jpeg",
    tags: ["AI", "Computer Vision"],
    year: "2024",
  },
  // Add more projects...
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Projects</h1>
          <p className="text-gray-600">Manage and showcase student projects</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="all">All Departments</option>
            <option value="cst">Computer Science & Technology</option>
            <option value="ee">Electrical Engineering</option>
            <option value="etce">Electronics and Telecommunication</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => redirect("/admin/edit-project")}
                  className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center mb-3">
                <Tag className="h-4 w-4 text-primary mr-2" />
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center mb-2">
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm text-gray-600">Team Members:</span>
              </div>
              <div className="pl-6 space-y-1">
                {project.team.map((member, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {member}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {project.department}
                </span>
                <span className="text-sm font-medium text-primary">
                  {project.year}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
