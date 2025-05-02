"use client";

import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { X } from "lucide-react";

interface EditCourseProps {
  onClose: () => void;
  showToastMessage?: (msg: string) => void;
  getAllCourses?: () => void;
  CourseData?: any;
  type?: "add" | "edit";
}

export default function EditCourse({
  onClose,
  showToastMessage,
  getAllCourses,
  CourseData,
  type = "add",
}: EditCourseProps) {
  const [title, setTitle] = useState(CourseData?.title || "");
  const [important, setImportant] = useState(CourseData?.important || false);
  const [categories, setCategories] = useState([
    "AI",
    "Energy",
    "IoT",
    "Software",
    "Web",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    CourseData?.category || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [content, setContent] = useState(CourseData?.content || "");
  const [link, setLink] = useState(CourseData?.link || "");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [newMember, setNewMember] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  useEffect(() => {
    setDate(CourseData?.date || new Date().toISOString().slice(0, 10));
  }, [CourseData]);

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

    console.log(`${type === "edit" ? "Editing" : "Adding"} Course:`, data);

    // Placeholder logic
    if (type === "edit") {
      showToastMessage?.("Course updated successfully!");
    } else {
      showToastMessage?.("Course added successfully!");
    }

    getAllCourses?.();
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
        {type === "edit" ? "Edit Course" : "Add Course"}
      </h2>

      {/* Course Title */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Course Title<span className="text-red-500">*</span>
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
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select department</option>
          <option value="CST">Computer Science and Technology (CST)</option>
          <option value="EE">Electrical Engineering (EE)</option>
          <option value="ETCE">Electronics and Telecommunication (ETCE)</option>
        </select>
      </div>

      {/* intake */}

      <label className="block mb-1 text-sm font-medium text-gray-700">
        Total Intake<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="No. of seats to intake"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Course Description */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Course Description<span className="text-red-500">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Coordinator */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Add Coordinator<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Enter coordinator name"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <ul className="mt-2 mb-2 list-disc list-inside text-gray-700 space-y-1">
          {teamMembers.map((member, idx) => (
            <li key={idx}>{member}</li>
          ))}
        </ul>
      </div>

      {/* Course Link */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Course Link (Optional)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {type === "edit" ? "Update Course" : "Add Course"}
      </button>
    </div>
  );
}
