"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import EditLessonDialog from "./EditLessonDialog";


interface Lesson {
  _id: string;
  name: string;
  lessonNumber: number;
  vocabularyCount: number;
}

export default function LessonTable() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const showToast = useToast();
  const axios1 = useAxios();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axios1.get<Lesson[]>("/api/lessons");
        setLessons(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
        } else {
          showToast("error", "Failed to fetch lessons");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [showToast]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      return;
    }

    try {
      await axios1.delete(`/api/lessons/${id}`);
      setLessons((prev) => prev.filter((lesson) => lesson._id !== id));
      showToast("success", "Lesson deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else {
        showToast("error", "An unknown error occurred");
      }
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
            <TableRow key={lesson._id}>
              <TableCell>{lesson.lessonNumber}</TableCell>
              <TableCell>{lesson.name}</TableCell>
              <TableCell>{lesson.vocabularyCount}</TableCell>
              <TableCell className="space-x-2 flex flex-col gap-2 md:flex-row">
                <EditLessonDialog
                  lesson={lesson}
                  onSave={(updatedLesson) => {
                    setLessons((prev) =>
                      prev.map((l) => (l._id === updatedLesson._id ? updatedLesson : l))
                    );
                    showToast("success", "Lesson updated successfully");
                  }}
                />
                <Button variant="destructive" onClick={() => handleDelete(lesson._id)}>
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
