"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CalendarClock, AlertTriangle, FileText } from "lucide-react";

// Dummy notices data (same as in NoticeScroller component)
const dummyNotices = [
  {
    id: 1,
    title: "Admission Open for 2025-2026 Session",
    date: "2025-05-01",
    important: true,
    category: "Admission",
    content: "Applications are invited from eligible candidates for admission to the Diploma in Engineering programs (CST, EE, ETCE) for the academic year 2025-2026. Admissions will be based on the Joint Entrance Examination (Polytechnic) conducted by WBSCT&VE&SD. For more details, visit the college office or the official website."
  },
  {
    id: 2,
    title: "End Semester Examination Schedule for 6th Semester",
    date: "2025-04-15",
    important: true,
    category: "Examination",
    content: "The End Semester Examination for 6th Semester students will commence from May 10, 2025. Students are advised to check the detailed schedule posted on the department notice boards. Hall tickets will be issued one week prior to the examination. Students with pending fees or attendance shortage should contact their respective departments immediately."
  },
  {
    id: 3,
    title: "Holiday Notice: College will remain closed on 25th April",
    date: "2025-04-10",
    important: false,
    category: "General",
    content: "This is to inform all students and staff that the college will remain closed on 25th April 2025 on account of a public holiday. Regular classes and administrative work will resume on the following working day. Any assignments or submissions due on this date will automatically be extended to the next working day."
  },
  {
    id: 4,
    title: "Diploma Results for December 2024 Announced",
    date: "2025-03-20",
    important: true,
    category: "Results",
    content: "The results for the Diploma Examinations conducted in December 2024 have been announced. Students can check their results on the official website of WBSCT&VE&SD or on the notice board in the administrative block. Those with discrepancies in results should contact the examination cell within 7 days of the result declaration."
  },
  {
    id: 5,
    title: "Industry Visit for Electrical Engineering Department",
    date: "2025-03-15",
    important: false,
    category: "Department",
    content: "An industry visit has been arranged for the 4th Semester students of the Electrical Engineering Department to XYZ Power Plant on March 25, 2025. Students are required to register for the visit with the department office by March 20, 2025. The visit aims to provide practical exposure to power generation and distribution systems."
  },
  {
    id: 6,
    title: "National Level Technical Symposium - TechnoVision 2025",
    date: "2025-03-10",
    important: true,
    category: "Event",
    content: "Itahar Government Polytechnic is organizing a National Level Technical Symposium 'TechnoVision 2025' on April 15-16, 2025. The event will feature technical paper presentations, project exhibitions, coding competitions, and technical quizzes. Students from various institutes are invited to participate. Registration details are available on the college website."
  },
  {
    id: 7,
    title: "Mid-Semester Examination Schedule",
    date: "2025-03-05",
    important: false,
    category: "Examination",
    content: "The Mid-Semester Examinations for all semesters will be conducted from March 20 to March 25, 2025. The detailed schedule has been posted on department notice boards. Students are advised to prepare accordingly and ensure they have no dues in the library or departments to be eligible for the examinations."
  },
  {
    id: 8,
    title: "Workshop on IoT Applications in Industry",
    date: "2025-02-28",
    important: false,
    category: "Workshop",
    content: "A two-day workshop on 'IoT Applications in Industry' will be conducted on March 10-11, 2025, for students of Computer Science and Electronics departments. Industry experts will deliver sessions on IoT architecture, protocols, and implementation. Interested students should register with their department coordinators by March 5, 2025."
  },
  {
    id: 9,
    title: "Campus Recruitment Drive by TechSolutions Ltd",
    date: "2025-02-20",
    important: true,
    category: "Placement",
    content: "TechSolutions Ltd will be conducting a campus recruitment drive for final year students on March 5, 2025. Eligible students from CST, EE, and ETCE departments with minimum 60% aggregate can register for the drive. The selection process will include an aptitude test, technical interview, and HR interview. Registration closes on February 28, 2025."
  },
  {
    id: 10,
    title: "Student Council Election Notification",
    date: "2025-02-15",
    important: false,
    category: "Student Affairs",
    content: "Elections for the Student Council for the academic year 2025-26 will be held on March 15, 2025. Interested candidates can submit their nominations from February 25 to March 1, 2025. The detailed election schedule and code of conduct have been posted on the college notice board. All students are encouraged to participate in the electoral process."
  },
  {
    id: 11,
    title: "Fee Payment Reminder for Even Semester",
    date: "2025-02-10",
    important: true,
    category: "Fees",
    content: "This is a reminder for all students to clear their Even Semester fees by February 28, 2025. Students with financial difficulties can apply for installment payment options through the administrative office. Late payment will attract a penalty as per college rules. All transactions should be completed through the online payment portal or at the college accounts section."
  },
  {
    id: 12,
    title: "Annual Sports Meet 2025",
    date: "2025-02-05",
    important: false,
    category: "Sports",
    content: "The Annual Sports Meet 2025 will be organized from March 8 to March 10, 2025. Various indoor and outdoor sports competitions will be conducted. Interested students can register for events with the Physical Education Department by February 25, 2025. All participants will receive participation certificates, and winners will be awarded medals and trophies."
  }
];

// Categories for filtering
const categories = [
  "All",
  "Admission",
  "Examination",
  "Results",
  "Department",
  "Event",
  "Workshop",
  "Placement",
  "Student Affairs",
  "Fees",
  "Sports",
  "General"
];

export default function Notices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedNoticeId, setExpandedNoticeId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter notices based on search term and selected category
  const filteredNotices = dummyNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner */}
      <div className="bg-primary py-12 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Notice Board</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Stay updated with important announcements, events, and notifications
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notices..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Important Notices Highlight */}
        {filteredNotices.some(notice => notice.important) && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-primary mr-2" />
              Important Notices
            </h2>
            <div className="space-y-4">
              {filteredNotices
                .filter(notice => notice.important)
                .map((notice) => (
                  <motion.div
                    key={notice.id}
                    className="bg-primary/5 border border-primary/30 rounded-lg p-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="font-semibold text-primary flex items-center">
                        <span className="inline-block bg-primary text-white text-xs px-2 py-0.5 rounded mr-2">
                          Important
                        </span>
                        {notice.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1 md:mt-0">
                        <CalendarClock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(notice.date)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                      <button
                        onClick={() => setExpandedNoticeId(expandedNoticeId === notice.id ? null : notice.id)}
                        className="text-primary text-sm hover:underline"
                      >
                        {expandedNoticeId === notice.id ? "Show Less" : "Read More"}
                      </button>
                    </div>
                    {expandedNoticeId === notice.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-700 border-t pt-2"
                      >
                        {notice.content}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FileText className="h-5 w-5 text-primary mr-2" />
            All Notices
          </h2>
          
          {filteredNotices.length > 0 ? (
            <div className="space-y-4">
              {filteredNotices
                .filter(notice => !notice.important)
                .map((notice) => (
                  <motion.div
                    key={notice.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {notice.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1 md:mt-0">
                        <CalendarClock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(notice.date)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                      <button
                        onClick={() => setExpandedNoticeId(expandedNoticeId === notice.id ? null : notice.id)}
                        className="text-primary text-sm hover:underline"
                      >
                        {expandedNoticeId === notice.id ? "Show Less" : "Read More"}
                      </button>
                    </div>
                    {expandedNoticeId === notice.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-700 border-t pt-2"
                      >
                        {notice.content}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No notices found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}