import { atom } from 'jotai';
import { CardInterface } from '../interfaces/CardInterface';

interface SelectedAnime {
  id: number;
  watchlisted: boolean;
}

export const watchlistedIdsAtom = atom<number[] | null>(null);

export const watchlistedAnimesAtom = atom<CardInterface[] | null>(null);

export const currentCalendarAtom = atom<CardInterface[] | null>(null);

export const ModalState = atom<boolean>(false);

export const selectedAnimeAtom = atom<SelectedAnime | null>(null);

export const isLoggedInAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
