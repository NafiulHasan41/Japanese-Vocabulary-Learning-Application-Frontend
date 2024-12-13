"use client";

import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

type Lesson = {
  name: string;
  lessonNumber: number;
};

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const axios1 = useAxios();
  const showToast = useToast();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await axios1.get<Lesson[]>("/api/users/lessons");
      setLessons(response.data);
    } catch (error) {
      // console.log(error);
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Available Lessons</h1>
      {loading ? (
        <p>Loading lessons...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <div key={lesson.lessonNumber} className="p-4 shadow-xl border rounded bg-sky-100">
              <h2 className="text-lg font-semibold">Lesson Name: {lesson.name}</h2>
                <p>Lesson Number: {lesson.lessonNumber}</p>
              <Link href={`/lesson/${lesson.lessonNumber}`}>
                <Button className="mt-2 text-black font-bold bg-sky-500">Go to Lesson</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
