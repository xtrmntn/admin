import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFirstCall, setFirstCall] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams({
        ...Object.fromEntries(prev.entries()),
        search: debouncedSearch,
      });

      if (debouncedSearch) {
        if (!isFirstCall) {
          params.delete('page');
        }
      } else {
        params.delete('search');
      }

      return params;
    });
    setFirstCall(false);
  }, [debouncedSearch]);

  return [search, setSearch] as const;
};
