/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IMovieData } from "../types/Types";

export function useFetchAllMoviesInRange(
  queryFunction: any,
  error: any,
  data: any,
  startDate: Date,
  endDate: Date
) {
  const [page, setPage] = useState(1);
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button

  useEffect(() => {
    queryFunction({ startDate, endDate, page }); // Fetch movies by release date range and page
  }, [queryFunction, page]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.results) {
      setLoadedData((prevData) => [...prevData, ...data.results]); // Update loadedData with newly fetched data

      setLoading(false);
    }
  }, [data]);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; // Show/hide back to top button based on scroll position

    if (scrollTop > 100) {
      setBackToTopButton(true);
    } else {
      setBackToTopButton(false);
    }

    if (
      window.innerHeight + scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1); // Load more movies if user reaches bottom
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { loadedData, loading, backToTopButton };
}
