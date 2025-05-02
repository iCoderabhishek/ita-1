"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function EditProject() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(null);
  const [tagInput, setTagInput] = useState("");

  //   useEffect(() => {
  //     const fetchProject = async () => {
  //       try {
  //         const res = await fetch(`/api/projects/${id}`);
  //         const data = await res.json();
  //         setFormData(data);
  //       } catch (err) {
  //         console.error("Failed to fetch project:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchProject();
  //   }, [id]);

  useEffect(() => {
    // Dummy projects data
    const projects = [
      {
        id: "1",
        title: "Smart Energy Monitoring System",
        description:
          "A system that monitors electricity consumption in real-time and provides insights on energy usage patterns.",
        department: "Electrical Engineering",
        team: ["Amit Kumar", "Priya Singh", "Rajesh Sharma"],
        image:
          "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg",
        tags: ["IoT", "Energy", "Monitoring"],
        year: "2024",
      },
      {
        id: "2",
        title: "AI-Powered Chatbot",
        description:
          "A chatbot that uses NLP to answer queries and automate customer support.",
        department: "Computer Science",
        team: ["Sneha Verma", "Rahul Yadav"],
        image:
          "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg",
        tags: ["AI", "NLP", "Chatbot"],
        year: "2023",
      },
    ];

    const fetchProject = async () => {
      try {
        // 🔄 Simulate network delay
        await new Promise((res) => setTimeout(res, 500));

        const project = projects.find((p) => p.id === id);
        if (project) {
          setFormData(project);
        } else {
          console.error("Project not found");
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData({ ...formData, tags: [...formData.tags, trimmed] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t: string) => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const res = await fetch(`/api/projects/${id}`, {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!res.ok) throw new Error("Update failed");
    //   router.push("/projects"); // 🔁 Redirect after successful update
    // } catch (err) {
    //   console.error("Error updating project:", err);
    // }
  };

  if (loading || !formData) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Project Title"
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <Input
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          placeholder="Department"
        />
        <Input
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          placeholder="Year"
        />
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {formData.tags.map((tag: string) => (
              <Badge key={tag} className="flex items-center gap-1">
                {tag}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
        </div>
        <Input
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit">Update Project</Button>
        </div>
      </form>
    </div>
  );
}
