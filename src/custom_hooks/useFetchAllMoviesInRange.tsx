/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IMovieData } from "../types/Types";
import { useFetchMiddleware } from "../custom_middlewares/middleware";

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
  const [backToTopButton, setBackToTopButton] = useState(false);

  // Use the middleware
  useFetchMiddleware({
    queryFunction,
    error,
    data,
    startDate,
    endDate,
    page,
    setPage,
    setBackToTopButton,
    setLoadedData,
    setLoading,
  });

  return { loadedData, loading, backToTopButton };
}
