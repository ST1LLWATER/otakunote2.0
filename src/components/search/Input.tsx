import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { ClassNames } from '@emotion/react';

const useStyles = createStyles((theme) => ({
  inputWrapper: {
    maxWidth: '70%',
    margin: '30px auto',
  },
}));

export function InputWithButton(props: TextInputProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.inputWrapper}>
      <TextInput
        icon={<AiOutlineSearch size={18} />}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon size={32} radius="xl" variant="filled">
            <BsArrowRight size={18} />
          </ActionIcon>
        }
        placeholder="Search questions"
        rightSectionWidth={42}
        {...props}
      />
    </div>
  );
}
