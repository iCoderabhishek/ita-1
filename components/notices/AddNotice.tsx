"use client";

import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";

export default function AddNotice() {
  const [title, setTitle] = useState("");
  const [important, setImportant] = useState(false);
  const [categories, setCategories] = useState([
    "Admission",
    "Exams",
    "Events",
    "Results",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Admission");
  const [newCategory, setNewCategory] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      date,
      important,
      category: selectedCategory,
      content,
      link,
    };
    console.log("Submitted Notice:", data);
    // Replace with your actual logic
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto m-10 px-4 md:px-8 py-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create Notice</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-gray-700 font-medium">Mark as Important</label>
        <Switch checked={important} onCheckedChange={setImportant} />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Notice Link (PDF)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/notice.pdf"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Notice
      </button>
    </form>
  );
}
