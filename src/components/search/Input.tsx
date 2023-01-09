import {
  TextInput,
  TextInputProps,
  ActionIcon,
  createStyles,
  Select,
} from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import React, { useState } from 'react';
import ConstantData from '../../constants/filter_data.json';

const useStyles = createStyles((theme) => ({
  input: {
    flex: 1,
    borderRadius: 0,
    border: 'none',
    '&:focus': {
      outline: 'none',
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },
  inputWrapper: {
    maxWidth: '70%',
    display: 'flex',
    position: 'relative',
    zIndex: 2,
    isolation: 'isolate',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    margin: '30px auto',

    [theme.fn.smallerThan('md')]: {
      maxWidth: '95%',
    },
  },
}));

interface InputProps extends TextInputProps {
  props?: TextInputProps;
  handleSearch: (type: string, search_query: string, sort: string) => void;
}

type PreviousFormInput = {
  type: string;
  search_query: string;
  sort: string;
};

export function InputWithFilter({ props, handleSearch }: InputProps) {
  const { classes, cx } = useStyles();
  const [formInputs, setFormInputs] = useState<{
    type: string;
    search_query: string;
    sort: string;
  }>({
    type: 'All',
    search_query: '',
    sort: 'POPULARITY_DESC',
  });

  return (
    <div className={classes.inputWrapper}>
      <TextInput
        // label="Search"
        className={classes.input}
        styles={{
          input: {
            '&:focus': {
              borderColor: '#6942BB',
            },
          },
        }}
        icon={<AiOutlineSearch size={18} />}
        size="sm"
        value={formInputs.search_query}
        onChange={(e) => {
          setFormInputs((prev: PreviousFormInput) => {
            return { ...prev, search_query: e.target.value };
          });
        }}
        placeholder="Search"
        rightSectionWidth={42}
        {...props}
      />
      <Select
        // label="Media Type"
        placeholder="Select Type"
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        size="sm"
        styles={(theme) => ({
          // dropdown: {
          //   zIndex: 999,
          // },
          input: {
            '&:focus': {
              borderColor: '#6942BB',
            },
          },

          item: {
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor: '#6942BB',
              },
            },
          },
        })}
        value={formInputs.type}
        onChange={(e: string) =>
          setFormInputs((prev: PreviousFormInput) => {
            return { ...prev, type: e };
          })
        }
        data={[
          { value: 'All', label: 'All' },
          { value: 'ANIME', label: 'Anime' },
          { value: 'MANGA', label: 'Manga' },
        ]}
      />
      <Select
        // label="Sort By"
        size="sm"
        placeholder="Sort By"
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        styles={(theme) => ({
          // dropdown: {
          //   zIndex: 999,
          // },
          input: {
            '&:focus': {
              borderColor: '#6942BB',
            },
          },

          item: {
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor: '#6942BB',
              },
            },
          },
        })}
        value={formInputs.sort}
        onChange={(e: string) => {
          setFormInputs((prev: PreviousFormInput) => {
            return { ...prev, sort: e };
          });
        }}
        data={ConstantData.Sort}
      />
      <ActionIcon
        onClick={() => {
          handleSearch(
            formInputs.type,
            formInputs.search_query,
            formInputs.sort
          );

          //Setting Default Values Back
          // setFormInputs({
          //   type: 'All',
          //   search_query: '',
          //   sort: 'POPULARITY_DESC',
          // });
        }}
        size={32}
        radius="xl"
        variant="filled"
      >
        <BsArrowRight size={18} />
      </ActionIcon>
    </div>
  );
}
