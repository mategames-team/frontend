import styles from './GamesSection.module.scss';
import type { ProfileTab } from '@/types/profileTabs';
import {
  newGames as backlogGames,
  popularGames as inProgressGames,
} from '@/mock/mockGames';
import { GameCard } from '@/components/GameCard/GameCard';

type Props = {
  activeTab: ProfileTab;
};

export const GamesSection: React.FC<Props> = ({ activeTab }) => {
  const getGamesByTab = (tab: ProfileTab) => {
    switch (tab) {
      case 'backlog':
        return backlogGames;
      case 'in-progress':
        return inProgressGames;
      case 'completed':
        return backlogGames;
      case 'reviews':
        return inProgressGames;
    }
  };

  return (
    <ul className={styles.games}>
      {getGamesByTab(activeTab).map((game, index) => (
        <GameCard key={index} game={game} size='large' />
      ))}
    </ul>
  );
};
