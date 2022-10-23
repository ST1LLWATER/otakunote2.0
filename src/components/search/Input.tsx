import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  createStyles,
  Popover,
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
        className={classes.input}
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
        // label="Type"
        placeholder="Select Type"
        size="sm"
        styles={(theme) => ({
          dropdown: {
            zIndex: 999,
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
        // label="Sort"
        size="sm"
        placeholder="Sort By"
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

          setFormInputs({
            type: 'All',
            search_query: '',
            sort: 'POPULARITY_DESC',
          });
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
