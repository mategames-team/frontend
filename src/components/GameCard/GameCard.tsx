import styles from './GameCard.module.scss';

export interface Game {
  id: number;
  name: string;
  rating: number;
}

interface Props {
  game: Game;
}

export const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{game.name}</h3>
      <p className={styles.rating}>Rating: {game.rating}</p>
    </article>
  );
};
