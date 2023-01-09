import React, { useRef, MouseEvent, useState, useEffect } from 'react';
import styles from '../../styles/card.module.css';
import { RiStarSFill } from 'react-icons/ri';
import { Badge, Button } from '@mantine/core';
import { AnimeInterface } from '../../interfaces/AnimeInterface';
import { ModalState } from './Modal';
import { WATCHLIST_BUTTON, REMOVE_BUTTON } from './ActionButtons';
import { useAtom } from 'jotai';
import { selectedAnimeAtom } from '../../store/animeStore';
import filter_data from '../../constants/filter_data.json';

// const [description, setDescription] = useState(props.description);

interface AnimeCard {
  anime: AnimeInterface;
  watchlisted: boolean;
  isLoggedIn: boolean;
}

const Card = ({ anime, watchlisted, isLoggedIn }: AnimeCard) => {
  const slider = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useAtom(ModalState);
  const [selectedAnime, setSelectedAnime] = useAtom(selectedAnimeAtom);
  const [isHovered, setIsHovered] = useState<string>('translateY(54px)');

  let mouseDown = false;
  let startX: number, scrollLeft: number;

  const startDragging = function (e: MouseEvent<HTMLDivElement>) {
    mouseDown = true;
    console.log(slider.current);
    startX = e.pageX - slider.current!.offsetLeft;
    scrollLeft = slider.current!.scrollLeft;
  };
  const stopDragging = () => {
    mouseDown = false;
  };

  function mouseMoveEvent(e: MouseEvent<HTMLDivElement>) {
    // e.preventDefault();

    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.current!.offsetLeft;
    const scroll = x - startX;
    slider.current!.scrollLeft = scrollLeft - scroll;
  }

  function onHover() {
    console.log('MOUSE ENTER');
    setIsHovered('translateY(0px)');
  }

  function exitHover() {
    if (isModalOpen) {
      return;
    }
    setIsHovered('translateY(54px)');
  }

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        setIsHovered('translateY(54px)');
      }, 100);
    }
  }, [isModalOpen]);

  return (
    <>
      <div
        onMouseOver={onHover}
        onMouseLeave={exitHover}
        // onMouseEnter={onHover}
        // onMouseLeave={exitHover}
        style={{
          background: `url(${anime.coverImage.large}) no-repeat center center/cover`,
        }}
        className={styles.card_parent}
      >
        <div className={styles.overlay}></div>
        {anime.isAdult && (
          <Badge className={styles.nsfw_badge} size="sm">
            NSFW
          </Badge>
        )}
        <Badge className={styles.badge} size="sm">
          {anime.type === 'ANIME' ? 'Anime' : 'Manga'}
        </Badge>
        <div
          style={{
            transform: `${isHovered}`,
          }}
          className={`${styles.card_content}`}
        >
          <div
            ref={slider}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={mouseMoveEvent}
            className={styles.genre_parent}
          >
            {anime.genres.map((item, index) => {
              return (
                <p className={styles.genre_items} key={index}>
                  {item}
                </p>
              );
            })}
          </div>
          <div className={styles.title}>
            {anime.title.english ?? anime.title.romaji}
          </div>
          <div className={styles.metadata}>
            <div className={styles.metadata_item}>
              <p>{anime?.averageScore / 10}</p>
              <RiStarSFill />
            </div>
            {anime.episodes && (
              <div className={styles.metadata_item}>
                <p>EP</p> <p>{anime.episodes}</p>
              </div>
            )}
            {anime.startDate.year && (
              <div className={styles.metadata_item}>
                {anime.startDate.month && (
                  <p>{filter_data.Months[anime.startDate.month - 1]}</p>
                )}
                <p>{anime.startDate.year}</p>
              </div>
            )}
          </div>
          <div className={styles.actions}>
            {watchlisted ? (
              <REMOVE_BUTTON />
            ) : (
              <WATCHLIST_BUTTON
                mediaId={anime.id}
                mediaType={anime.type}
                isLoggedIn={isLoggedIn}
              />
            )}

            <Button
              styles={() => ({
                root: {
                  color: 'white',
                  padding: '4px 8px',
                  width: '50%',

                  '&:hover': {
                    backgroundColor: 'inherit',
                  },

                  '&:focus': {
                    outline: 0,
                  },
                },
              })}
              className={styles.action_button}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                // e.preventDefault();
                setSelectedAnime({ anime, watchlisted });
                setIsModalOpen(true);
              }}
              variant="outline"
              size="sm"
              color="violet"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
