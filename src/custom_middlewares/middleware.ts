/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

interface MiddlewareProps
{
    genreId?: any;
  queryFunction: any;
  error: any;
  data: any;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  setPage?: any; // Setter function for page state
  setBackToTopButton?: any; // Setter function for backToTopButton state
  setLoadedData: any; // Setter function for loadedData state
  setLoading?: any; // Setter function for loadedData state
}

export function useFetchMiddleware ( {
    genreId,
  queryFunction,
  error,
  data,
  startDate,
  endDate,
  setPage,
  page,
  setBackToTopButton,
  setLoadedData,
  setLoading,
}: MiddlewareProps) {
  useEffect(() => {
    queryFunction({ startDate, genreId, endDate, page }); // Fetch movies by release date range and page

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
        setPage((prevPage: number) => prevPage + 1); // Load more movies if user reaches bottom
        setLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [queryFunction, page, genreId, setPage, setBackToTopButton]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.results) {
      setLoadedData((prevData: any) => [...prevData, ...data.results]); // Update loadedData with newly fetched data
      setLoading(false);
    }
  }, [data, setLoadedData]);
}
