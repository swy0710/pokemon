import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const PARAM_KEY = 'types';

export interface UseTypeFilterResult {
  selectedTypes: string[];
  toggleType: (type: string) => void;
  clearTypes: () => void;
}

export const useTypeFilter = (): UseTypeFilterResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTypes: string[] = searchParams.get(PARAM_KEY)
    ? (searchParams.get(PARAM_KEY) ?? '').split(',').filter(Boolean)
    : [];

  const toggleType = useCallback(
    (type: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = (next.get(PARAM_KEY) ?? '').split(',').filter(Boolean);
        const updated = current.includes(type)
          ? current.filter((t) => t !== type)
          : [...current, type];

        if (updated.length === 0) {
          next.delete(PARAM_KEY);
        } else {
          next.set(PARAM_KEY, updated.join(','));
        }

        return next;
      });
    },
    [setSearchParams],
  );

  const clearTypes = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(PARAM_KEY);
      return next;
    });
  }, [setSearchParams]);

  return { selectedTypes, toggleType, clearTypes };
};
