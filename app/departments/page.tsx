"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen, Award, Cpu, Zap, Radio } from "lucide-react";

// //faculty
// Department data
const departments = [
  {
    id: "cst",
    name: "Computer Science and Technology",
    shortName: "CST",
    hod: "Ms. MOUSUMI BISWAS",
    icon: (
      <Cpu className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-full" />
    ),
    image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
    description:
      "The Department of Computer Science and Technology focuses on providing education in various areas of computer science including programming, software development, web technologies, database management, and computer networks. The department is equipped with modern computer labs and software to ensure students receive practical experience alongside theoretical knowledge.",
    facilities: [
      "Computer Programming Lab",
      "Networking Lab",
      "Database Lab",
      "Web Development Lab",
      "Project Lab",
    ],
    achievements: [
      "Students won 1st prize in State Level Technical Project Competition 2024",
      "Faculty published research papers in national and international journals",
      "Organized workshop on Advanced Web Technologies",
    ],

    faculty: ["Ms. Mousomi Biswas (HOD)", "Mr. Somnath Roy (Lecturer)"],
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    shortName: "EE",
    hod: "Mr. ALMAS HOSSAIN MOLLAH",
    icon: (
      <Zap className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-full" />
    ),
    image: "https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg",
    description:
      "The Department of Electrical Engineering provides comprehensive education in electrical circuits, machines, power systems, electrical measurements, control systems, and electrical installation. The department has well-equipped laboratories that allow students to gain hands-on experience in various aspects of electrical engineering.",
    facilities: [
      "Electrical Machines Lab",
      "Power Systems Lab",
      "Electrical Measurements Lab",
      "Control Systems Lab",
      "Electrical Workshop",
    ],
    achievements: [
      "Students participated in National Power System Competition",
      "Faculty conducted research on renewable energy systems",
      "Organized industrial visit to power plants",
    ],
    faculty: [
      "Mr. Almas Hossain Mollah (HOD)",
      "Mr. Snehasis Dhali (Lecturer)",
    ],
  },
  {
    id: "etce",
    name: "Electronics and Telecommunication Engineering",
    shortName: "ETCE",
    hod: "Mr. CHANDI CHARAN JANA",
    icon: (
      <Zap className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-full" />
    ),
    image: "https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg",
    description:
      "The Department of Electrical Engineering provides comprehensive education in electrical circuits, machines, power systems, electrical measurements, control systems, and electrical installation. The department has well-equipped laboratories that allow students to gain hands-on experience in various aspects of electrical engineering.",
    facilities: [
      "Electrical Machines Lab",
      "Power Systems Lab",
      "Electrical Measurements Lab",
      "Control Systems Lab",
      "Electrical Workshop",
    ],
    achievements: [
      "Students participated in National Power System Competition",
      "Faculty conducted research on renewable energy systems",
      "Organized industrial visit to power plants",
    ],
    faculty: [
      "Mr. Chandi Charan Jana (HOD)",
      "Mr. Abhishek Chaterjee (Lecturer)",
    ],
  },
  // Add other departments here...
];

export default function Departments() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner */}
      <div className="bg-primary py-12 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Our Departments
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Explore our academic departments offering specialized technical
            education in various engineering disciplines
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Academic Departments
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Itahar Government Polytechnic houses specialized departments
            dedicated to providing quality education in various engineering
            disciplines. Each department is equipped with modern facilities and
            led by experienced faculty members.
          </p>
        </motion.div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                  <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="mr-3">{dept.icon}</div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Department of
                    </span>
                    <h3 className="font-bold text-gray-800">
                      {dept.shortName}
                    </h3>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Head of Department
                  </span>
                  <p className="font-semibold text-gray-800">{dept.hod}</p>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {dept.description.substring(0, 120)}...
                </p>
                <Link
                  href={`#${dept.id}`}
                  className="text-primary hover:underline font-medium inline-flex items-center"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Department Sections */}
        <div className="space-y-16">
          {departments.map((dept, index) => (
            <motion.section
              key={dept.id}
              id={dept.id}
              className="scroll-mt-24 bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {" "}
              <h2 className="text-3xl font-bold text-primary mb-6">
                {dept.name}
              </h2>{" "}
              <p className="text-lg text-gray-700 mb-6">{dept.description}</p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Facilities
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {dept.facilities.map((facility, idx) => (
                    <li key={idx}>{facility}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Achievements
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {dept.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Faculty
                </h3>
                <ul className="space-y-2">
                  {dept?.faculty?.map((faculty, idx) => (
                    <li key={idx} className="text-gray-600">
                      <span className="font-semibold">{faculty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}
