export interface ModalData {
  title: {
    english: string;
    romaji: string;
  };
  startDate: {
    year: number;
    month: number;
  };
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  characterPreview: {
    edges: {
      role: string;
      node: {
        name: {
          full: string;
        };
        image: {
          medium: string;
        };
      };
    }[];
  };
  status: string;
  description: string;
  episodes: number;
  bannerImage: string;
  averageScore: number;
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
  watched?: number;
}
