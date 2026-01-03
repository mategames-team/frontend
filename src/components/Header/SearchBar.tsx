import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import { useSearchParams } from 'react-router-dom';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValue = searchParams.get('search') || '';
  const [value, setValue] = useState<string>(initialValue);

  const debounceDelay = 400;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // update url
  const updateSearchParam = useCallback(
    (newValue: string) => {
      if (newValue) {
        searchParams.set('search', newValue);
        searchParams.set('page', '1');
      } else {
        searchParams.delete('search');
      }

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  // debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateSearchParam(value);
    }, debounceDelay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, updateSearchParam]);

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type='text'
        placeholder='Search game...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {value && (
        <button
          className={styles.clear}
          onClick={() => setValue('')}
          aria-label='Clear search'
        >
          ✕
        </button>
      )}
    </div>
  );
};
