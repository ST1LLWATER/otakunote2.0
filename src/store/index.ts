import { atom } from 'jotai';
import { AnimeInterface } from '../interfaces/AnimeInterface';

interface SelectedAnime {
  anime: AnimeInterface;
  watchlisted: boolean;
}

export const watchlistedIdsAtom = atom<number[]>([]);

export const watchlistedAnimesAtom = atom<AnimeInterface[] | null>(null);

export const currentCalendarAtom = atom<AnimeInterface[] | null>(null);

export const selectedAnimeAtom = atom<SelectedAnime | null>(null);

export const isLoggedInAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
