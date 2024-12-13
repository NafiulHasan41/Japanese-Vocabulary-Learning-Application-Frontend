"use client";

import { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Link from "next/link";

type Vocabulary = {
  word: string;
  pronunciation: string;
  whenToSay: string;
};

export default function LessonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const axios1 = useAxios();
  const showToast = useToast();
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchVocabularies();
  }, [id]);

  const fetchVocabularies = async () => {
    setLoading(true);
    try {
      const response = await axios1.get<Vocabulary[]>(`/api/users/lessons/${id}/vocabularies`);
      setVocabularies(response.data);
    } catch (error) {
      showToast("error", "Failed to fetch vocabularies");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const pronounceWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP"; // Japanese
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return <div className="p-6">Loading vocabularies...</div>;
  }

  if (completed) {
    return (
      <div className="p-6 text-center">
        <Confetti width={width} height={height} />
        <h1 className="text-2xl font-bold mb-4">Congratulations! Lesson Completed</h1>
        <Link href="/">
          <Button className="mt-4 bg-sky-400">Go Back to Lessons</Button>
        </Link>
      </div>
    );
  }

  if (vocabularies.length === 0) {
    return <div className="p-6">No vocabularies found for this lesson.</div>;
  }

  const { word, pronunciation, whenToSay } = vocabularies[currentIndex];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lesson {id}</h1>
      <div className="p-4 border rounded shadow text-center">
        <button className="text-xl font-semibold" onClick={() => pronounceWord(word)}>
          {word}
        </button>
        <p>{pronunciation}</p>
        <p className="text-gray-500">{whenToSay}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={handlePrevious} disabled={currentIndex === 0} className="text-black font-semibold bg-sky-400">
          Previous
        </Button>
        <Button onClick={handleNext} className="bg-sky-400 text-black font-semibold">
          {currentIndex === vocabularies.length - 1 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
}
