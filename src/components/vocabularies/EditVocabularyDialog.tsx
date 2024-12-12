"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import useToast from "@/hooks/useToast";

interface Vocabulary {
    _id: string;
    word: string;
    meaning: string;
    pronunciation: string;
    whenToSay: string;
    lesson: {
      _id: string;
      name: string;
      lessonNumber: number;
    };
  }

interface EditVocabularyDialogProps {
  vocabulary: Vocabulary;
  onSave: (updatedVocabulary: Vocabulary) => void;
}

export default function EditVocabularyDialog({
  vocabulary,
  onSave,
}: EditVocabularyDialogProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      word: vocabulary.word,
      pronunciation: vocabulary.pronunciation,
      meaning: vocabulary.meaning,
      whenToSay: vocabulary.whenToSay,
      lessonNumber: vocabulary.lesson.lessonNumber,
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const axiosInstance = useAxios();
  const showToast = useToast();

  const handleEditSubmit = async (data: {
    word: string;
    pronunciation: string;
    meaning: string;
    whenToSay: string;
    lessonNumber: number;
  }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/vocabularies/${vocabulary._id}`, data);
      onSave({ ...vocabulary, ...data });
      setIsOpen(false); 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
          } else if (error instanceof Error) {
            showToast("error", error.message);
          } else {
            showToast("error", "An unknown error occurred");
          }
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
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vocabulary</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
          <div>
            <label>Word</label>
            <Input {...register("word", { required: true })} placeholder="Word" />
          </div>
          <div>
            <label>Pronunciation</label>
            <Input {...register("pronunciation", { required: true })} placeholder="Pronunciation" />
          </div>
          <div>
            <label>Meaning</label>
            <Input {...register("meaning", { required: true })} placeholder="Meaning" />
          </div>
          <div>
            <label>When to Say</label>
            <Input {...register("whenToSay", { required: true })} placeholder="When to Say" />
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
