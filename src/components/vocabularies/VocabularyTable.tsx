"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EditVocabularyDialog from "./EditVocabularyDialog";

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

export default function VocabularyTable() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteVocabularyId, setDeleteVocabularyId] = useState<string | null>(null);
  const [filterLessonNo, setFilterLessonNo] = useState<number | "">("");
  const showToast = useToast();
  const axios1 = useAxios();

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const { data } = await axios1.get<Vocabulary[]>("/api/vocabularies");
        setVocabularies(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
        } else {
          showToast("error", "Failed to fetch vocabularies");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVocabularies();
  }, [showToast]);
 // working fine
  const handleDelete = async () => {
    if (!deleteVocabularyId) return;

    try {
      await axios1.delete(`/api/vocabularies/${deleteVocabularyId}`);
      setVocabularies((prev) => prev.filter((v) => v._id !== deleteVocabularyId));
      showToast("success", "Vocabulary deleted successfully");
      setDeleteVocabularyId(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else {
        showToast("error", "An unknown error occurred");
      }
    }
  };

  const filteredAndSortedVocabularies = vocabularies
    .filter((v) => (filterLessonNo === "" ? true : v?.lesson.lessonNumber === filterLessonNo));

  if (loading) {
    return <p>Loading vocabularies...</p>;
  }

  if (vocabularies.length === 0) {
    return <p>No vocabularies found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Filter by Lesson No"
            value={filterLessonNo === "" ? "" : filterLessonNo}
            onChange={(e) => setFilterLessonNo(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word</TableHead>
            <TableHead>Meaning</TableHead>
            <TableHead>Pronunciation</TableHead>
            <TableHead>When to Say</TableHead>
            <TableHead>Lesson No</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedVocabularies.map((vocabulary) => (
            <TableRow key={vocabulary._id}>
              <TableCell>{vocabulary.word}</TableCell>
              <TableCell>{vocabulary.meaning}</TableCell>
              <TableCell>{vocabulary.pronunciation}</TableCell>
              <TableCell>{vocabulary.whenToSay}</TableCell>
              <TableCell>{vocabulary?.lesson?.lessonNumber}</TableCell>
              <TableCell className="space-x-2 flex flex-col gap-2 md:flex-row">
                <EditVocabularyDialog
                  vocabulary={vocabulary}
                  onSave={(updatedVocabulary) => {
                    setVocabularies((prev) =>
                      prev.map((v) => (v._id === updatedVocabulary._id ? updatedVocabulary : v))
                    );
                    showToast("success", "Vocabulary updated successfully");
                  }}
                />
                <div>
                  <Dialog
                    open={!!deleteVocabularyId}
                    onOpenChange={(isOpen) => !isOpen && setDeleteVocabularyId(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setDeleteVocabularyId(vocabulary._id)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                      </DialogHeader>
                      <p>
                        Are you sure you want to delete the vocabulary &quot;<strong>{vocabulary.word}</strong>&quot;? This
                        action cannot be undone.
                      </p>
                      <DialogFooter className="flex justify-end space-x-2">
                        <Button variant="ghost" onClick={() => setDeleteVocabularyId(null)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
