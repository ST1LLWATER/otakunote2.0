import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  createStyles,
  Header,
  Group,
  Burger,
  Paper,
  Transition,
  Menu,
  Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { signIn, useSession, signOut } from 'next-auth/react';
import { MdOutlineMovieFilter } from 'react-icons/md';
import { BsChevronDown } from 'react-icons/bs';
import Link from 'next/link';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  menuItem: {
    // padding: '0 15px',
  },

  menuDropdown: {
    zIndex: 100,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    fontSize: 14,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    margin: '0',
    padding: '0 15px',

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
    },

    '> div': {
      width: '100%',
      display: 'flex',

      '&:nth-of-child(2)': {
        justifyContent: 'center',
        backgrounColor: 'green',
      },

      '&:nth-of-child(3)': {
        justifyContent: 'flex-end',
      },
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  user: {
    display: 'flex',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: '24px',
    padding: '4px 12px',
    // margin: '0 8px',
    cursor: 'pointer',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 600,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    '&:focus': {
      outline: 'none',
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      // backgroundColor: theme.fn.variant({
      //   variant: 'light',
      //   color: theme.primaryColor,
      // }).background,
      // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
      //   .color,
      backgroundColor: 'rgba(105, 66, 187,0.5)',
      color: 'white',
    },
  },

  linkLabel: {
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<null | string>(null);
  const { classes, cx } = useStyles();
  const Router = useRouter();

  const { data: session } = useSession();

  console.log('rerender');

  useEffect(() => {
    setActive(Router.pathname);
  });

  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={(event) => {
          setActive(link.link);
          close();
        }}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <div className={classes.header}>
        <div>
          <MdOutlineMovieFilter size={30} color="#6942BB" />
        </div>
        <div>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </div>

        <div className={classes.user}>
          {session && session.user ? (
            <>
              <Menu
                trigger="hover"
                position="bottom"
                exitTransitionDuration={0}
                classNames={{
                  item: classes.menuItem,
                  dropdown: classes.menuDropdown,
                }}
              >
                <Menu.Target>
                  <Center className={classes.link}>
                    <div className={classes.linkLabel}>{session.user.name}</div>
                    <div>
                      <BsChevronDown size={12} />
                    </div>
                  </Center>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <a>Import MAL Watchlist</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={(event) => signOut()}>Sign Out</a>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <>
              <a className={classes.link} onClick={(event) => signIn('google')}>
                <Center>Sign In</Center>
              </a>
            </>
          )}
        </div>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </div>
    </Header>
  );
}
