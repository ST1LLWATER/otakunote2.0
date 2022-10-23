// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider as ThemeProvider } from '@mantine/core';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import type { AppRouter } from '../server/router';
import '../styles/globals.css';
import { HeaderResponsive } from '../components/global/Header';
import Links from '../constants/links.json';
import Footer from '../components/global/Footer';
import InfoModal from '../components/data/Modal';
import { useAtom } from 'jotai';
import { selectedAnimeAtom } from '../store/animeStore';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [selectedAnime, setSelectedAnime] = useAtom(selectedAnimeAtom);

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        theme={{ fontFamily: 'Open Sans', colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        {selectedAnime && (
          <InfoModal
            anime={selectedAnime.anime}
            watchlisted={selectedAnime?.watchlisted}
          />
        )}
        <div
          style={{
            maxWidth: '1536px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            minHeight: '100vh',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <HeaderResponsive links={Links.links} />
          </div>
          <div
            style={{
              width: '100%',
              flex: 1,
              margin: '0 auto 35px auto',
            }}
          >
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
