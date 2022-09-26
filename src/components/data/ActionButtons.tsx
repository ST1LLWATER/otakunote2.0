import { Button } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';

export const WATCHLIST_BUTTON = () => (
  <Button
    styles={(theme) => ({
      root: {
        padding: '4px 8px',
        width: '50%',
      },
      rightIcon: {
        margin: '0',
        fontSize: '20px',
      },
    })}
    variant="filled"
    size="sm"
    color="violet"
    rightIcon={<BsPlus />}
  >
    <p>Watchlist</p>
  </Button>
);

export const REMOVE_BUTTON = () => (
  <Button
    styles={(theme) => ({
      root: {
        padding: '4px 8px',
        width: '50%',
        background: '#A85442',

        '&:hover': {
          background: '#864335',
        },
      },
      rightIcon: {
        margin: '0 0 1px 4px',
        fontSize: '14px',
      },
    })}
    variant="filled"
    size="sm"
    rightIcon={<FaRegTrashAlt />}
  >
    <p>Remove</p>
  </Button>
);
