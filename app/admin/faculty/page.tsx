"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

// Dummy faculty data
const faculty = [
  {
    id: 1,
    name: "Dr. John Doe",
    designation: "Head of Department",
    department: "Computer Science & Technology",
    qualification: "Ph.D. in Computer Science",
    email: "john.doe@itahargpoly.edu.in",
    phone: "+91 98765 43210",
    image: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg",
    specializations: [
      "Database Systems",
      "Machine Learning",
      "Web Technologies",
    ],
  },
  {
    id: 2,
    name: "Prof. Jane Smith",
    designation: "Associate Professor",
    department: "Electrical Engineering",
    qualification: "M.Tech in Power Systems",
    email: "jane.smith@itahargpoly.edu.in",
    phone: "+91 98765 43211",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    specializations: [
      "Power Systems",
      "Control Systems",
      "Electrical Machines",
    ],
  },
  {
    id: 3,
    name: "Dr. Robert Johnson",
    designation: "Assistant Professor",
    department: "Electronics and Telecommunication",
    qualification: "Ph.D. in Electronics",
    email: "robert.johnson@itahargpoly.edu.in",
    phone: "+91 98765 43212",
    image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
    specializations: [
      "Digital Electronics",
      "VLSI Design",
      "Communication Systems",
    ],
  },
];

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredFaculty = faculty.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === "All" || member.department === selectedDepartment)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Faculty Management
          </h1>
          <p className="text-gray-600">
            Manage faculty members and their information
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Faculty
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science & Technology">
              Computer Science & Technology
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Electronics and Telecommunication">
              Electronics and Telecommunication
            </option>
          </select>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {member.name}
                </h3>
                <p className="text-primary font-medium">{member.designation}</p>
                <p className="text-sm text-gray-600">{member.department}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 text-primary mr-2" />
                  {member.qualification}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-primary mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-primary mr-2" />
                  {member.phone}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
