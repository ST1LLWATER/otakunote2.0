import React, { MouseEvent, useState, useEffect } from 'react';
import Truncate from 'react-truncate';
import styles from '../../styles/card.module.css';
import { RiStarSFill } from 'react-icons/ri';
import { Badge, Button } from '@mantine/core';
import { AnimeInterface } from '../../interfaces/AnimeInterface';
import { ModalState } from './Modal';
import { WATCHLIST_BUTTON, REMOVE_BUTTON } from '../ActionButtons';
import { useAtom } from 'jotai';
import { selectedAnimeAtom } from '../../store';
import { ConstantData } from '../../constants/filter_data';
import Draggable from '../Draggable';

// const [description, setDescription] = useState(props.description);

interface AnimeCard {
  anime: AnimeInterface;
  watchlisted: boolean;
  isLoggedIn: boolean;
}

const Card = ({ anime, watchlisted, isLoggedIn }: AnimeCard) => {
  const [isModalOpen, setIsModalOpen] = useAtom(ModalState);
  const [, setSelectedAnime] = useAtom(selectedAnimeAtom);
  const [isHovered, setIsHovered] = useState<string>('translateY(54px)');

  function onHover() {
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
        data-value={anime.coverImage.extraLarge}
        className={styles.card_parent}
      >
        <img
          src={anime.coverImage.large}
          alt="cover-image"
          loading="lazy"
          className={styles.cover_image}
        />

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
          <Draggable className={styles.genre_parent}>
            <>
              {anime.genres.map((item: string, index: number) => {
                return (
                  <p key={index} className={styles.genre_items}>
                    {item}
                  </p>
                );
              })}
            </>
          </Draggable>
          <div className={styles.title}>
            <Truncate lines={2} ellipsis={<span>...</span>}>
              {anime.title.english ?? anime.title.romaji}
            </Truncate>
          </div>
          <Draggable className={styles.metadata}>
            <>
              <div className={styles.metadata_item}>
                <p>{anime?.averageScore / 10}</p>
                <RiStarSFill />
              </div>
              {anime.episodes && (
                <div className={styles.metadata_item}>
                  <p>EP</p>
                  {anime.status == 'RELEASING' ? (
                    <p>{anime.episodes}</p>
                  ) : (
                    <p>{`${anime.nextAiringEpisode?.episode}/${anime.episodes}`}</p>
                  )}
                </div>
              )}
              {anime.startDate.year && (
                <div className={styles.metadata_item}>
                  {anime.startDate.month && (
                    <p>{ConstantData.Months[anime.startDate.month - 1]}</p>
                  )}
                  <p>{anime.startDate.year}</p>
                </div>
              )}
            </>
          </Draggable>
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
