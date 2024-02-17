/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IMovieData } from "../types/Types";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { formatDateString } from "../utils/Utils";

export function useShuffledMoviesByGenre(
  genreId: string | number,
  limit: number = 6,
  queryFunction: any,
  data: any,
  error: any
) {
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const dateRange = useAppSelector((state: RootState) => state.dateRange);

  useEffect(() => {
    const startDate = formatDateString(dateRange.dateRange.startDate);
    const endDate = formatDateString(dateRange.dateRange.endDate);

    queryFunction({ startDate, endDate, genreId });
  }, [queryFunction, dateRange, genreId]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.results) {
      const shuffledResults = shuffleArray(data.results); // Shuffle the array of movie results
      const limitedResults = shuffledResults.slice(0, limit); // Limit the results
      setLoadedData(limitedResults);
    }
  }, [data, limit]);

  const shuffleArray = (array: IMovieData[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return { loadedData };
}
