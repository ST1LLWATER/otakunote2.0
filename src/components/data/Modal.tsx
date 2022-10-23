import React, { MouseEvent, useEffect, useState } from 'react';
import styles from '../../styles/modal.module.css';
import { RiStarSFill } from 'react-icons/ri';
import { Modal } from '@mantine/core';
import { AnimeInterface } from '../../interfaces/AnimeInterface';
import { atom, useAtom } from 'jotai';
import filter_data from '../../constants/filter_data.json';

export const ModalState = atom<boolean>(false);

interface InfoModal {
  anime: AnimeInterface;
  watchlisted: boolean;
}

const InfoModal = ({ anime, watchlisted }: InfoModal) => {
  const [isModalOpen, setIsModalOpen] = useAtom(ModalState);
  const [watchedEpisodes, setWatchedEpisodes] = useState<number>(0);

  useEffect(() => {
    console.log(watchedEpisodes);
  }, [watchedEpisodes]);

  return (
    <>
      <Modal
        onClose={() => setIsModalOpen(false)}
        opened={isModalOpen}
        withCloseButton={false}
        closeOnClickOutside={true}
        closeOnEscape={true}
        styles={{
          modal: {
            padding: '0px !important',
            borderRadius: '8px',
            overflow: 'hidden',
          },

          body: {
            // padding: '0 15px',
            // position: 'relative',

            '&::-webkit-scrollbar': {
              width: '0px',
            },

            '&::-webkit-scrollbar-track': {
              backgroundColor: '#e4e4e4',
              borderRadius: '100px',
            },

            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#302c2c',
              borderRadius: '100px',
            },
          },
        }}
        centered
        overflow="inside"
        size="1000px"
        transition="scale"
      >
        <div
          style={
            {
              // position: 'relative',
            }
          }
        >
          <div
            style={{
              position: 'relative',
              zIndex: -1,
            }}
          >
            <div
              className={styles.overlay}
              style={{
                display: anime.bannerImage ? '' : 'none',
              }}
            ></div>
            <img
              src={anime?.bannerImage}
              // src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-lf01ya5ny8aH.jpg"
              // width={1000}
              // height={250}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                // maxHeight: '300px',
                objectFit: 'cover',
              }}
            />
            <div
              className={styles.metadata_parent}
              style={{
                position: anime.bannerImage ? 'absolute' : 'static',
                margin: '15px 0',
                padding: '15px 50px',
              }}
            >
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
              <div className={styles.title}>
                <p>{anime.title.romaji ?? anime.title.english}</p>
              </div>
              {anime.title.romaji && (
                <div className={styles.title_secondary}>
                  <p>{anime.title.english}</p>
                </div>
              )}
            </div>
          </div>

          {/* </div> */}
          <div className={styles.content}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: anime.description,
              }}
            >
              {/* {} */}
            </div>
            <div className={styles.episode_list}>
              {[...Array(anime?.episodes)].map((_, idx) => (
                <div
                  key={idx}
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    if (e.target instanceof HTMLElement) {
                      if (parseInt(e.target.innerText) == watchedEpisodes) {
                        setWatchedEpisodes((prev) => prev - 1);
                        return;
                      }
                      setWatchedEpisodes(parseInt(e.target.innerText));
                    }
                  }}
                  style={{
                    border: '1px solid black',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    background: idx < watchedEpisodes ? 'gray' : 'none',
                  }}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InfoModal;
