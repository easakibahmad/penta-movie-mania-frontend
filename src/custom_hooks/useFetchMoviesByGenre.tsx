/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IMovieData } from "../types/Types";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { formatDateString } from "../utils/Utils";
import { useFetchMiddleware } from "../custom_middlewares/middleware";

export function useFetchMoviesByGenre(
  genreId: string,
  queryFunction: any,
  data: any,
  error: any
) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button

  const dateRange = useAppSelector((state: RootState) => state.dateRange);
  const startDate = formatDateString(dateRange.dateRange.startDate);
  const endDate = formatDateString(dateRange.dateRange.endDate);
  useFetchMiddleware({
    genreId,
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
