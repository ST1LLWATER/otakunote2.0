import React, { MouseEvent, useEffect, useState } from 'react';
import styles from '../../styles/modal.module.css';
import { RiStarSFill } from 'react-icons/ri';
import { Modal } from '@mantine/core';
import { ModalState } from '../../store';
import { useAtom } from 'jotai';
import { ConstantData } from '../../constants/filter_data';
import { getModalData } from '../../functions/dataFetcherFunctions';
import { useSession } from 'next-auth/react';
import { ModalData } from '../../interfaces/ModalInterface';
import Draggable from '../Draggable';

interface IModal {
  id: number;
  watchlisted: boolean;
}

const InfoModal = ({ id, watchlisted }: IModal) => {
  const [isModalOpen, setIsModalOpen] = useAtom(ModalState);
  const [data, setData] = useState<ModalData | null>(null);
  const [watchedEpisodes, setWatchedEpisodes] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    getModalData({ id }).then((data) => setData(data));

    return () => {
      setData(null);
    };
  }, [id]);

  return (
    <>
      <Modal
        onClose={() => {
          setIsModalOpen(false);
        }}
        opened={isModalOpen}
        withCloseButton={false}
        closeOnClickOutside={true}
        closeOnEscape={true}
        styles={{
          modal: {
            padding: '0px !important',
            borderRadius: '8px',
            overflow: 'hidden',
            margin: '0px',
          },

          body: {
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
        {data ? (
          <div>
            <div
              style={{
                position: 'relative',
                zIndex: 0,
                background: `url(${data.bannerImage}) center center/cover no-repeat`,
              }}
            >
              <div
                className={styles.overlay}
                style={{
                  zIndex: 1,
                  display: data.bannerImage ? '' : 'none',
                }}
              ></div>
              <div className={styles.metadata_parent}>
                <div className={styles.metadata}>
                  <div className={styles.metadata_item}>
                    <p>{data.averageScore / 10}</p>
                    <RiStarSFill />
                  </div>
                  {data.episodes && (
                    <div className={styles.metadata_item}>
                      <p>EP</p> <p>{data.episodes}</p>
                    </div>
                  )}
                  {data.startDate.year && (
                    <div className={styles.metadata_item}>
                      {data.startDate.month && (
                        <p>{ConstantData.Months[data.startDate.month - 1]}</p>
                      )}
                      <p>{data.startDate.year}</p>
                    </div>
                  )}
                </div>
                <div className={styles.title}>
                  <p>{data.title.romaji ?? data.title.english}</p>
                </div>
                {data.title.romaji && (
                  <div className={styles.title_secondary}>
                    <p>{data.title.english}</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.content}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              ></div>
              {!!session && watchlisted && (
                <div className={styles.episode_list}>
                  {[...Array(data.episodes)].map((_, idx) => (
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
              )}

              <div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'semibold',
                  }}
                >
                  Characters:
                </div>
                <Draggable className={styles.characters}>
                  <>
                    {data.characterPreview.edges.map((character, index) => {
                      return (
                        <div key={index} className={styles.character}>
                          <img
                            loading="lazy"
                            className={styles.character_image}
                            src={character.node.image.medium}
                            alt={character.node.name.full}
                          />
                          <div className={styles.character_data}>
                            <div className={styles.character_name}>
                              {character.node.name.full}
                            </div>
                            <div className={styles.character_role}>
                              {character.role}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                </Draggable>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </Modal>
    </>
  );
};

export default React.memo(InfoModal);
