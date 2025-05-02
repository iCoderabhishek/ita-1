"use client";

import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { X } from "lucide-react";

interface EditFacultyProps {
  onClose: () => void;
  showToastMessage?: (msg: string) => void;
  getAllFaculty?: () => void;
  FacultyData?: any;
  type?: "add" | "edit";
}

export default function EditFaculty({
  onClose,
  showToastMessage,
  getAllFaculty,
  FacultyData,
  type = "add",
}: EditFacultyProps) {
  const [title, setTitle] = useState(FacultyData?.title || "");
  const [important, setImportant] = useState(FacultyData?.important || false);
  const [categories, setCategories] = useState([
    "AI",
    "Energy",
    "IoT",
    "Software",
    "Web",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    FacultyData?.category || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [content, setContent] = useState(FacultyData?.content || "");
  const [link, setLink] = useState(FacultyData?.link || "");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [newMember, setNewMember] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  useEffect(() => {
    setDate(FacultyData?.date || new Date().toISOString().slice(0, 10));
  }, [FacultyData]);

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async () => {
    const data = {
      title,
      date,
      important,
      category: selectedCategory,
      content,
      link,
    };

    console.log(`${type === "edit" ? "Editing" : "Adding"} Faculty:`, data);

    // Placeholder logic
    if (type === "edit") {
      showToastMessage?.("Faculty updated successfully!");
    } else {
      showToastMessage?.("Faculty added successfully!");
    }

    getAllFaculty?.();
    onClose();
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  const handleAddMember = () => {
    if (newMember.trim()) {
      setTeamMembers([...teamMembers, newMember.trim()]);
      setNewMember("");
    }
  };

  const toggleCategory = (cat: any) => {
    setSelectedCategory((prev: any) =>
      prev.includes(cat) ? prev.filter((c: any) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[95%] xl:max-w-3xl bg-white rounded-2xl p-4 sm:p-6 h-auto shadow-lg mx-auto space-y-4 overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        onClick={onClose}
      >
        <X className="text-2xl" />
      </button>

      <h2 className="text-2xl font-semibold text-gray-800">
        {type === "edit" ? "Edit Faculty" : "Add Faculty"}
      </h2>

      {/* Faculty Title */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Faculty Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Department */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Department<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="eg., Computer Science and Technology"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* intake */}

      <label className="block mb-1 text-sm font-medium text-gray-700">
        Designation<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="eg., Assistant Professor"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* faculty qualification */}

      <label className="block mb-1 text-sm font-medium text-gray-700">
        Qualification<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="eg., M.Tech in CSE"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* faculty Specialization */}

      <label className="block mb-1 text-sm font-medium text-gray-700">
        Specialization
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="eg., Distributed Sysytems"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Faculty Description */}

      <label className="block mb-1 text-sm font-medium text-gray-700">
        Email Address<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder=""
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Coordinator */}
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder=""
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {type === "edit" ? "Update Faculty" : "Add Faculty"}
      </button>
    </div>
  );
}
