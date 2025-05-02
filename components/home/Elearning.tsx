"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const resources = [
  {
    title: "Discrete Mathematics",
    description:
      "Fundamental concepts of discrete structures essential for computer science.",
    tags: ["CST", "Mathematics", "Theory"],
    link: "https://www.cse.iitb.ac.in/~akg/courses/cs207/notes/DiscrMath.pdf",
  },
  {
    title: "Computer Organization and Architecture",
    description: "Study of computer system structures and functioning.",
    tags: ["CST", "Hardware", "Architecture"],
    link: "https://www.cse.iitk.ac.in/users/amit/courses/core/notes/lec-01.pdf",
  },
  {
    title: "Electronic Devices & Circuits",
    description: "Understanding electronic components and circuit analysis.",
    tags: ["CST", "Electronics", "Circuits"],
    link: "http://www.nitttrc.ac.in/econtent/cse/electronics/pdf/Electronic%20Devices%20and%20Circuits.pdf",
  },
  {
    title: "Data Structures and Algorithms",
    description:
      "Efficient data organization and algorithmic problem-solving techniques.",
    tags: ["CST", "Programming", "Algorithms"],
    link: "https://www.tutorialspoint.com/data_structures_algorithms/data_structures_algorithms_tutorial.pdf",
  },
  {
    title: "Microprocessor & Microcontroller",
    description: "In-depth study of microprocessors and microcontrollers.",
    tags: ["CST", "Hardware", "Microcontrollers"],
    link: "https://www.vssut.ac.in/lecture_notes/EC305.pdf",
  },
  {
    title: "Electrical Circuit & Network",
    description: "Analysis of electrical circuits and network theorems.",
    tags: ["EE", "Circuits", "Networks"],
    link: "https://nptel.ac.in/content/storage2/courses/108106025/download/Lec-01.pdf",
  },
  {
    title: "Electrical Machines – I",
    description: "Introduction to electrical machines and their operations.",
    tags: ["EE", "Machines", "Electromechanics"],
    link: "https://nptel.ac.in/content/storage2/courses/108105017/pdf/Lec-01.pdf",
  },
  {
    title: "Basic Electronics",
    description: "Fundamentals of electronic devices and applications.",
    tags: ["EE", "Electronics", "Basics"],
    link: "http://www.uptu.ac.in/pdf/EBE%20NOTES.pdf",
  },
  {
    title: "Electrical Measuring Instruments",
    description: "Techniques and tools for electrical measurements.",
    tags: ["EE", "Measurements", "Instruments"],
    link: "https://nptel.ac.in/content/storage2/courses/108105059/pdf/Lec-01.pdf",
  },
  {
    title: "Analog Electronics – I",
    description: "Study of analog electronic circuits and systems.",
    tags: ["ETCE", "Analog", "Electronics"],
    link: "https://nptel.ac.in/content/storage2/courses/108102047/pdf/L-1.pdf",
  },
  {
    title: "Digital Electronics",
    description: "Principles of digital systems and logic design.",
    tags: ["ETCE", "Digital", "Logic Design"],
    link: "https://nptel.ac.in/content/storage2/courses/117106086/pdf/Lec-01.pdf",
  },
  {
    title: "Microcontroller and Applications",
    description: "Programming and applications of microcontrollers.",
    tags: ["ETCE", "Microcontrollers", "Applications"],
    link: "https://www.iare.ac.in/sites/default/files/lecture_notes/MCA_Lecture_Notes.pdf",
  },
  {
    title: "Communication Engineering",
    description: "Basics of analog and digital communication systems.",
    tags: ["ETCE", "Communication", "Systems"],
    link: "https://nptel.ac.in/content/storage2/courses/117102059/pdf/Module1/Lec1.pdf",
  },
  {
    title: "Signals and Systems",
    description: "Analysis of signals and their behavior in systems.",
    tags: ["ETCE", "Signals", "Systems"],
    link: "https://nptel.ac.in/content/storage2/courses/117101055/downloads/Lec-01.pdf",
  },
  {
    title: "Control Systems",
    description: "Study of control system principles and applications.",
    tags: ["EE", "Control", "Systems"],
    link: "https://nptel.ac.in/content/storage2/courses/108102043/pdf/Lecture_Notes/Lec_01.pdf",
  },
  {
    title: "Power Electronics",
    description: "Conversion and control of electric power using electronics.",
    tags: ["EE", "Power", "Electronics"],
    link: "https://nptel.ac.in/content/storage2/courses/108105066/pdf/Lec-01.pdf",
  },
  {
    title: "Software Engineering",
    description: "Principles and practices of software development.",
    tags: ["CST", "Software", "Engineering"],
    link: "https://www.cse.iitb.ac.in/~soumen/os/lectures/intro.pdf",
  },
  {
    title: "Database Management System",
    description: "Design and management of database systems.",
    tags: ["CST", "Database", "Management"],
    link: "https://www.cse.iitb.ac.in/~sudarsha/db-book/slide-dir/ch1.pdf",
  },
  {
    title: "Object Oriented Programming",
    description: "Concepts and applications of OOP in software development.",
    tags: ["CST", "OOP", "Programming"],
    link: "https://www.cse.iitb.ac.in/~akg/courses/cs213/book/chap1.pdf",
  },
  {
    title: "Digital Signal Processing",
    description: "Processing of digital signals and applications.",
    tags: ["ETCE", "DSP", "Signals"],
    link: "https://nptel.ac.in/content/storage2/courses/117102060/pdf/Lec-01.pdf",
  },
  {
    title: "Web Technology",
    description: "Introduction to web development technologies.",
    tags: ["CST", "Web", "Development"],
    link: "https://www.cse.iitb.ac.in/~srikanth/coreweb/lectures/module1-intro.pdf",
  },
  {
    title: "Operating Systems",
    description: "Fundamental concepts of operating systems.",
    tags: ["CST", "Systems", "OS"],
    link: "https://www.cse.iitk.ac.in/pages/amit/courses/os/notes/intro.pdf",
  },
  {
    title: "Electrical Machines – II",
    description: "Further study of AC electrical machines.",
    tags: ["EE", "Machines", "AC Machines"],
    link: "https://nptel.ac.in/content/storage2/courses/108105017/pdf/Lec-14.pdf",
  },
  {
    title: "Power Systems",
    description:
      "Generation, transmission, and distribution of electrical power.",
    tags: ["EE", "Power", "Systems"],
    link: "https://nptel.ac.in/content/storage2/courses/108107012/download/Lec-01.pdf",
  },
  {
    title: "Analog Electronics – II",
    description: "Advanced analog electronic circuits and applications.",
    tags: ["ETCE", "Analog", "Electronics"],
    link: "https://nptel.ac.in/content/storage2/courses/108102047/pdf/L-22.pdf",
  },
  {
    title: "VLSI Design",
    description: "Introduction to Very Large Scale Integration design.",
    tags: ["ETCE", "VLSI", "Design"],
    link: "https://nptel.ac.in/content/storage2/courses/117106093/pdf/Lecture1.pdf",
  },
  {
    title: "Computer Networks",
    description: "Principles of computer networking and protocols.",
    tags: ["CST", "Networking", "Communication"],
    link: "https://www.cse.iitk.ac.in/users/dheeraj/cs425/lec01.pdf",
  },
  {
    title: "Mobile Communication",
    description: "Fundamentals of mobile communication systems.",
    tags: ["ETCE", "Communication", "Mobile"],
    link: "https://nptel.ac.in/content/storage2/courses/117102062/pdf/Module1/Lec1.pdf",
  },
  {
    title: "Instrumentation and Control",
    description: "Principles of industrial instrumentation and control.",
    tags: ["EE", "Instrumentation", "Control"],
    link: "https://nptel.ac.in/content/storage2/courses/108105062/pdf/Lec-01.pdf",
  },
  {
    title: "Renewable Energy Sources",
    description: "Introduction to various renewable energy technologies.",
    tags: ["EE", "Energy", "Renewable"],
    link: "https://nptel.ac.in/content/storage2/courses/108107084/pdf/Lecture-1.pdf",
  },
];

export default function ElearningPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            E-Learning Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Curated learning modules to enhance your technical knowledge and
            skills.
          </p>
        </motion.div>

        {/* Uneven Masonry Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
        >
          {resources.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid p-6 bg-white border border-gray-100 hover:border-primary/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={item.link}
                className="text-sm text-primary hover:text-primary/80 font-medium transition"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="https://webscte.co.in/E-Learning"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-primary hover:text-primary/80 font-semibold transition"
          >
            Explore More E-Learning Resources →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
