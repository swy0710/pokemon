import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const PARAM_KEY = 'generation';

export interface UseGenerationFilterResult {
  selectedGeneration: string | null;
  setGeneration: (gen: string | null) => void;
}

export const useGenerationFilter = (): UseGenerationFilterResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedGeneration: string | null = searchParams.get(PARAM_KEY);

  const setGeneration = useCallback(
    (gen: string | null) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (gen === null) {
          next.delete(PARAM_KEY);
        } else {
          next.set(PARAM_KEY, gen);
        }
        return next;
      });
    },
    [setSearchParams],
  );

  return { selectedGeneration, setGeneration };
};
