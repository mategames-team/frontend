import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGames } from '@/api/games';
import type { Game } from '@/types/Game';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [value, setValue] = useState<string>(searchParams.get('search') || '');
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (!value.trim()) return;

    const timer = setTimeout(async () => {
      try {
        const res = await getGames({ search: value, page_size: 5 });
        setSuggestions(res.content);
        setIsDropdownOpen(true);
      } catch (e) {
        console.error(e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (value: string) => {
    const newValue = value;
    setValue(newValue);

    if (!newValue.trim()) {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const resetSearch = () => {
    setValue('');
    setSuggestions([]);
    setIsDropdownOpen(false);
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleSelectGame = (gameId: number) => {
    setIsDropdownOpen(false);
    navigate(`/catalogue/${gameId}`);
  };

  const handleViewAll = () => {
    setIsDropdownOpen(false);
    navigate(`/catalogue?search=${encodeURIComponent(value)}`);
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
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsDropdownOpen(false);
              navigate(`/catalogue?search=${encodeURIComponent(value)}`);
            }
          }}
        />

        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={styles.clear}
            onClick={resetSearch}
            aria-label='Clear search'
          >
            ✕
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isDropdownOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={styles.dropdown}
          >
            <motion.div
              className={styles.suggestionsList}
              initial='hidden'
              animate='show'
              variants={{
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {suggestions.map((game) => (
                <motion.div
                  key={game.apiId}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 },
                  }}
                  whileHover={{
                    x: 5,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  }}
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
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.viewAll}
              onClick={handleViewAll}
            >
              View all results
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
