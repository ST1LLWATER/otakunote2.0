import React, { useMemo } from 'react';
import { TextInput, createStyles, Select } from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { ConstantData } from '../../constants/filter_data';
import { FormInput } from '../../pages/search';

const useStyles = createStyles((theme) => ({
  input: {
    flex: 1,
    borderRadius: 0,
    border: 'none',
    width: '100%',
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
    display: 'flex',
    isolation: 'isolate',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      gap: '20px',
    },
  },

  filters: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },

    '>div': {
      flexGrow: 1,
    },
  },
}));

interface InputProps {
  formData: {
    type?: string | undefined;
    search_query?: string | undefined;
    sort?: string | undefined;
  };

  setFormData: React.Dispatch<React.SetStateAction<FormInput>>;
}

function Inputs(props: InputProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.inputWrapper}>
      {useMemo(
        () =>
          'search_query' in props.formData && (
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
              value={props.formData.search_query}
              onChange={(e) => {
                props.setFormData((prev: FormInput) => {
                  return { ...prev, search_query: e.target.value };
                });
              }}
              placeholder="Search"
              rightSectionWidth={42}
              // {...props}
            />
          ),
        [props.formData.search_query]
      )}
      <div className={classes.filters}>
        {useMemo(
          () =>
            'type' in props.formData && (
              <Select
                placeholder="Select Type"
                transition="pop-top-left"
                transitionDuration={80}
                transitionTimingFunction="ease"
                size="sm"
                styles={(theme) => ({
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
                value={props.formData.type}
                onChange={(e: string) =>
                  props.setFormData((prev: FormInput) => {
                    return { ...prev, type: e };
                  })
                }
                data={[
                  { value: 'All', label: 'All' },
                  { value: 'ANIME', label: 'Anime' },
                  { value: 'MANGA', label: 'Manga' },
                ]}
              />
            ),
          [props.formData.type]
        )}
        {useMemo(
          () =>
            'sort' in props.formData && (
              <Select
                size="sm"
                placeholder="Sort By"
                transition="pop-top-left"
                transitionDuration={80}
                transitionTimingFunction="ease"
                styles={(theme) => ({
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
                value={props.formData.sort}
                onChange={(e: string) => {
                  props.setFormData((prev: FormInput) => {
                    return { ...prev, sort: e };
                  });
                }}
                data={ConstantData.Sort}
              />
            ),
          [props.formData.sort]
        )}
      </div>
    </div>
  );
}

export default React.memo(Inputs);
