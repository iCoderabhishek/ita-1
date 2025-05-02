"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import AddEditNotice from "@/components/notices/AddNotice";
import { toast } from "sonner";

// Dummy notices data
const notices = [
  {
    id: 1,
    title: "Admission Open for 2025-2026 Session",
    content:
      "Applications are invited from eligible candidates for admission to the Diploma in Engineering programs.",
    category: "Admission",
    important: true,
    date: "2025-05-01",
  },
  {
    id: 2,
    title: "End Semester Examination Schedule",
    content:
      "The End Semester Examination for 6th Semester will commence from May 10, 2025.",
    category: "Examination",
    important: true,
    date: "2025-04-15",
  },
  // Add more notices...
];

const fetchNotices = () => {};

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Notice Management
          </h1>
          <p className="text-gray-600">
            Manage and publish notices for students and staff
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Notice
        </button>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <AddEditNotice
            onClose={() => setShowAddModal(false)}
            getAllNotices={fetchNotices}
            showToastMessage={(msg) => toast.success(msg)}
          />
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="all">All Categories</option>
            <option value="admission">Admission</option>
            <option value="examination">Examination</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNotices.map((notice) => (
                <motion.tr
                  key={notice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {notice.important && (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {notice.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-md">
                          {notice.content}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {notice.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(notice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        notice.important
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {notice.important ? "Important" : "Regular"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
