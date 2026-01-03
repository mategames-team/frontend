import { api } from '@/api/auth';
import styles from './GamesSection.module.scss';
import { GameCard } from '@/components/GameCard/GameCard';
import { useEffect, useState } from 'react';
import type { GameDto } from '@/types/Game';

export const GamesSection = ({ status }: { status: string }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);

      try {
        const response = await api.get('/api/user-games', {
          params: {
            status: status,
          },
        });
        setGames(response.data.content);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status) {
      fetchGames();
    }
  }, [status]);

  const handleRemoveFromLocalState = (userGameId: number): void => {
    setGames((prev) => prev.filter((item: GameDto) => item.id !== userGameId));
  };

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <ul className={styles.games}>
      {games.map((game: GameDto) => (
        <GameCard
          key={game.id}
          game={game.gameDto}
          currentTabStatus={status}
          onStatusUpdated={() => handleRemoveFromLocalState(game.id)}
        />
      ))}
    </ul>
  );
};
