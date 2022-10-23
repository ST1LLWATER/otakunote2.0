import { atom, useAtom } from 'jotai';
import { AnimeInterface } from '../interfaces/AnimeInterface';

interface SelectedAnime {
  anime: AnimeInterface;
  watchlisted: boolean;
}

export const watchlistedIdsAtom = atom<number[]>([]);

export const selectedAnimeAtom = atom<SelectedAnime | null>(null);
