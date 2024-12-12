"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";

interface Lesson {
  _id: string;
  name: string;
  lessonNumber: number;
  vocabularyCount: number;
}

interface EditLessonDialogProps {
  lesson: Lesson;
  onSave: (updatedLesson: Lesson) => void;
}

export default function EditLessonDialog({ lesson, onSave }: EditLessonDialogProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: lesson.name,
      lessonNumber: lesson.lessonNumber,
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const axios1 = useAxios();

  const handleEditSubmit = async (data: { name: string; lessonNumber: number }) => {
    setLoading(true);
    try {
      const response = await axios1.put(`/api/lessons/${lesson._id}`, data);
      onSave({ ...lesson, ...data });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset(); 
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
          <div>
            <label>Lesson Name</label>
            <Input {...register("name", { required: true })} placeholder="Lesson Name" />
          </div>
          <div>
            <label>Lesson Number</label>
            <Input
              type="number"
              {...register("lessonNumber", { required: true, valueAsNumber: true })}
              placeholder="Lesson Number"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
