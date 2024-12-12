"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";

interface Lesson {
  id: string;
  name: string;
  lessonNumber: number;
  vocabularyCount: number;
}

export default function LessonTable() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const showToast = useToast();
  const axios1 = useAxios();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axios1.get<Lesson[]>("/api/lessons");
        // console.log("inside ", data);
        setLessons(data);
      } catch (error) {
        showToast("error", "Failed to fetch lessons");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [showToast]);

  const handleEdit = (id: string) => {
    router.push(`/lessons/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      return;
    }

    try {
      await axios1.delete(`/api/lessons/${id}`);
      showToast("success", "Lesson deleted successfully");
      setLessons((prev) => prev.filter((lesson) => lesson.id !== id)); // Update local state
    } catch (error) {
      showToast("error", "Failed to delete lesson");
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return <p>Loading lessons...</p>;
  }

  if (lessons.length === 0) {
    return <p>No lessons found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lesson Number</TableHead>
            <TableHead>Lesson Name</TableHead>
            <TableHead>Vocabulary Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.lessonNumber}</TableCell>
              <TableCell>{lesson.name}</TableCell>
              <TableCell>{lesson.vocabularyCount}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(lesson.id)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(lesson.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
