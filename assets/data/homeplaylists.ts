import { newReleasesBgImageUrl, popBgImageUrl, rockBgImageUrl, sertanejoBgImageUrl, top50BgImageUrl, trendingBgImageUrl } from "@/src/constants/images";

export const swiperPlaylists = [
    {
        id: 1,
        name: 'Trending',
        image: trendingBgImageUrl,
    },
    {
        id: 2,
        name: 'Top 50',
        image: top50BgImageUrl,
    },
    {
        id: 3,
        name: 'New Releases',
        image: newReleasesBgImageUrl,
    }
] as const;

export const genresPlaylists = [
    {
        id: 1,
        name: 'Pop',
        image: popBgImageUrl,
    },
    {
        id: 2,
        name: 'Rock',
        image: rockBgImageUrl,
    },
    {
        id: 3,
        name: 'Sertanejo',
        image: sertanejoBgImageUrl,
    }
] as const;