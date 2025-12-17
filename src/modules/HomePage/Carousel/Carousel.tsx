import styles from './Carousel.module.scss';
import type { Game } from '@/types/Game';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import { GameSlider } from './GameSlider';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

interface CarouselProps {
  title: string;
  games: Game[];
}

export const Carousel: React.FC<CarouselProps> = ({ title, games }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const onSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsStart(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    swiper.on('slideChange', () => {
      setIsStart(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__header}>
        <h4 className={styles.carousel__title}>{title}</h4>
        <div className={styles.carousel__navigation}>
          <button
            className={styles.carousel__navBtn}
            disabled={isStart}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft className={styles.carousel__navIcon} />
          </button>
          <button
            className={styles.carousel__navBtn}
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight className={styles.carousel__navButton} />
          </button>
        </div>
      </div>
      <GameSlider
        games={games}
        onSwiperInit={(swiper) => onSwiperInit(swiper)}
      />
    </section>
  );
};
