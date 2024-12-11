'use client';
import axios from "axios";
import { useEffect } from "react";

const useAxios = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return instance;
};

export default useAxios;
