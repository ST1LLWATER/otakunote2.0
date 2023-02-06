import React, { useState, useEffect } from 'react';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { createStyles } from '@mantine/core';
import CardWrapper from '../components/global/CardWrapper';
import { client, requestHeaders } from '../constants/api';
import { APIInterface } from '../interfaces/APIInterface';
import { SEARCH_QUERY } from '../queries/gql_queries.gql';
import { ConstantData } from '../constants/filter_data';
import { useAtom } from 'jotai';
import { WATCHLIST_BUTTON } from '../components/ActionButtons';
import { RiStarSFill } from 'react-icons/ri';
import { AnimeInterface } from '../interfaces/AnimeInterface';
import { getCalendar } from '../functions/dataFetcherFunctions';
import { currentCalendarAtom } from '../store';

const useStyles = createStyles((theme, params, getRef) => ({
  wrapper: {
    padding: '0 100px',
    margin: '50px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    [theme.fn.smallerThan('sm')]: {
      margin: '30px 0',
      padding: '0 15px',
    },
  },

  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 1,

    [theme.fn.smallerThan('sm')]: {
      opacity: 0,
    },
  },

  root: {
    borderRadius: '8px',
    overflow: 'hidden',
    // '&:hover': {
    //   [`& .${getRef('controls')}`]: {
    //     opacity: 1,
    //   },
    // },
  },

  indicator: {
    width: 50,
    height: 4,
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: 80,
    },
  },

  slide: {
    '&::after': {
      content: `''`,
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(90deg, rgba(23, 21, 27, 0.9) 12.5%, rgba(23, 21, 27, 0) 83.85%, rgba(23, 21, 27, 0.3) 100%)',
    },
  },

  slide_image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  metadata_item_parent: {
    position: 'absolute',
    paddingRight: '10px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    lineHeight: '1.25rem',
    fontSize: '1.2rem',
    bottom: 30,
    left: 55,
    zIndex: 1,
    textShadow: `1px 1px 2px rgba(0,0,0,0.5)`,
    // WebkitTextStroke: '1px white',
    mixBlendMode: 'normal',

    [theme.fn.smallerThan('sm')]: {
      bottom: 30,
      left: 25,
    },
  },

  metadata_item: {
    alignSelf: 'flex-start',
    display: 'flex',
    background: 'rgba(112, 108, 108, 0.644)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '5px 13px',
    fontSize: '14px',
    lineHeight: '18px',
    borderRadius: '999px',
  },
}));

const slides = [
  {
    name: 'Chainsaw Man',
    rating: 8.6,
    image:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-lf01ya5ny8aH.jpg',
  },
  {
    name: 'SPY x FAMILY Cour 2',
    rating: 8.4,
    image:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/142838-tynuN00wxmKO.jpg',
  },
  {
    name: 'My Hero Academia',
    rating: 6.9,
    image:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21856-wtSHgeHFmzdG.jpg',
  },
  {
    name: 'One Piece',
    rating: 8.7,
    image:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg',
  },
  {
    name: 'Dr. Stone',
    rating: 6.9,
    image:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/105333-KWKGvBM8Hyga.jpg',
  },
];

const Home = () => {
  const TRANSITION_DURATION = 2000;
  const { classes, cx } = useStyles();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [ongoing, setOngoing] = useAtom(currentCalendarAtom);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  useEffect(() => {
    if (ongoing) return;
    getCalendar({ setOngoing });
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <Carousel
          getEmblaApi={setEmbla}
          // styles={{}}
          classNames={{
            root: classes.root,
            controls: classes.controls,
            indicator: classes.indicator,
          }}
          mx="auto"
          withIndicators
          loop
          height={300}
        >
          {slides.map((slide, index) => (
            <Carousel.Slide key={index}>
              <div
                className={classes.slide}
                style={{
                  height: `100%`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                <img src={slide.image} className={classes.slide_image} alt="" />
                <div className={classes.metadata_item_parent}>
                  <div
                    className={classes.metadata_item}
                    // style={{
                    //   backgroundColor: 'rgba(161, 161, 161, 0.2)',
                    //   fontSize: '1rem',
                    //   padding: '0.25rem 0.9rem',
                    //   borderRadius: '999px',
                    //   alignSelf: 'flex-start',
                    // }}
                  >
                    <p>{slide.rating}</p>
                    <RiStarSFill />
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      margin: '0.8rem 0',
                      letterSpacing: '0.05rem',
                    }}
                  >
                    {slide.name}
                  </div>
                  <div
                    style={{
                      fontSize: '1.0rem',
                    }}
                  >
                    Latest episodes: 15 of 90 | Next episodes on: 17 Sept 2022
                  </div>
                  <div
                    style={{
                      marginTop: '10px',
                    }}
                  >
                    <WATCHLIST_BUTTON
                      mediaId={123}
                      mediaType={'ANIME'}
                      isLoggedIn={true}
                    />
                  </div>
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
        <div
          style={{
            fontSize: '2rem',
          }}
        >
          Current Calendar
        </div>
        <div>
          <CardWrapper animes={ongoing} />
        </div>
      </div>
    </>
  );
};

export default Home;
