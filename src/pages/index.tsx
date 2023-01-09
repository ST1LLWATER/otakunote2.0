import React from 'react';
import { Carousel } from '@mantine/carousel';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: '0 100px',
    margin: '50px 0',

    [theme.fn.smallerThan('sm')]: {
      margin: '30px 0',
      padding: '0 15px',
    },
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
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Carousel
          styles={{
            root: {
              borderRadius: '8px',
              overflow: 'hidden',
            },
            indicator: {
              width: 50,
              height: 4,
              transition: 'width 250ms ease',

              '&[data-active]': {
                width: 80,
              },
            },
          }}
          mx="auto"
          withIndicators
          loop
          height={300}
        >
          {slides.map((slide, index) => (
            <Carousel.Slide key={index}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                }}
                src={slide.image}
                alt=""
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
