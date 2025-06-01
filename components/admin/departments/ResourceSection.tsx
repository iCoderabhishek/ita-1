"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash, FileText, Plus } from "lucide-react";
import { ResourceDialog } from "./ResourceDialogue";
import { toast } from "sonner";

interface ResourceItem {
  id: string;
  title: string;
  pdfLink: string;
  year?: string;
}

interface ResourceSectionProps {
  title: string;
  items: ResourceItem[];
  onUpdate: (items: ResourceItem[]) => void;
  emptyMessage: string;
  resourceType: "syllabus" | "pyq" | "additional";
  showYear?: boolean;
}

export default function ResourceSection({
  title,
  items,
  onUpdate,
  emptyMessage,
  resourceType,
  showYear = false,
}: ResourceSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ResourceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: ResourceItem) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // Optimistic UI update
    const updatedItems = items.filter((item) => item.id !== id);
    onUpdate(updatedItems);

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Resource deleted successfully");
    }, 500);
  };

  const handleSave = (item: ResourceItem) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      let updatedItems: ResourceItem[];

      if (currentItem) {
        // Edit existing item
        updatedItems = items.map((i) =>
          i.id === currentItem.id ? { ...item, id: currentItem.id } : i
        );
      } else {
        // Add new item
        const newId = Date.now().toString();
        updatedItems = [...items, { ...item, id: newId }];
      }

      onUpdate(updatedItems);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      toast.success(`${currentItem ? "Updated" : "Added"} successfully`);
    }, 500);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" /> Add{" "}
          {resourceType === "pyq"
            ? "PYQ"
            : resourceType === "additional"
            ? "PDF"
            : "Syllabus"}
        </Button>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    {showYear && item.year && (
                      <p className="text-sm text-muted-foreground">
                        Year: {item.year}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={item.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View PDF
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    disabled={isSubmitting}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ResourceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        item={currentItem}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        resourceType={resourceType}
        showYear={showYear}
      />
    </Card>
  );
}
