"use client";

import { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import axios from "axios";

type Video = {
  title: string;
  url: string;
};

export default function TutorialPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const axios1 = useAxios();
  const showToast = useToast();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios1.get<Video[]>("/api/users/tutorial");
      setVideos(response.data);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Japanese Language Tutorials</h1>
      {loading ? (
        <p>Loading tutorials...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="border rounded shadow p-4">
              <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
              <iframe
                width="100%"
                height="200"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
