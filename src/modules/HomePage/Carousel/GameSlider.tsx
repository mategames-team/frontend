import styles from './GameSlider.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import { GameCard } from '@/components/GameCard/GameCard';
import type { Game } from '@/types/Game';

type GameSliderProps = {
  games: Game[];
  onSwiperInit?: (swiper: SwiperType) => void;
};

export const GameSlider = ({ games, onSwiperInit }: GameSliderProps) => {
  return (
    <div className={styles.slider}>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        onSlideChange={() => {}}
        onSwiper={onSwiperInit}
      >
        {games.map((game) => (
          <SwiperSlide key={game.apiId}>
            <GameCard size='large' game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
