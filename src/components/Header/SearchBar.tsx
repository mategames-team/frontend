import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGames } from '@/api/games';
import type { Game } from '@/types/Game';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [value, setValue] = useState<string>(searchParams.get('name') || '');
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const debounceDelay = 400;
  // const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const newParams = new URLSearchParams(searchParams);
      if (value.trim()) {
        newParams.set('name', value);
        newParams.set('page', '1');

        try {
          const res = await getGames({ name: value, size: 5 });
          console.log(res);
          setSuggestions(res.content);
          setIsDropdownOpen(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        newParams.delete('name');
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
      setSearchParams(newParams);
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelectGame = (gameId: number) => {
    setIsDropdownOpen(false);
    navigate(`/games/${gameId}`);
  };

  const handleViewAll = () => {
    setIsDropdownOpen(false);
    navigate(`/catalogue?name=${encodeURIComponent(value)}`);
  };

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type='text'
          placeholder='Search game...'
          value={value}
          onFocus={() => value && setIsDropdownOpen(true)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsDropdownOpen(false);
              navigate(`/catalogue?name=${encodeURIComponent(value)}`);
            }
          }}
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

      {isDropdownOpen && suggestions.length > 0 && (
        <div className={styles.dropdown}>
          <div className={styles.suggestionsList}>
            {suggestions.map((game) => (
              <div
                key={game.apiId}
                className={styles.suggestionItem}
                onClick={() => handleSelectGame(game.apiId)}
              >
                <img
                  src={game.backgroundImage}
                  alt={game.name}
                  className={styles.gameImg}
                />
                <div className={styles.gameInfo}>
                  <h4 className={styles.gameName}>{game.name}</h4>
                  <p className='text-secondary-semibold'>
                    {game.year || 'Year'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.viewAll} onClick={handleViewAll}>
            View all results
          </button>
        </div>
      )}
    </div>
  );
};
