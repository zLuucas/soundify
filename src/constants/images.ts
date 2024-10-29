import { Image } from 'react-native';

import unknownArtistImage from '@/assets/unknown_artist.png';
import unknownTrackImage from '@/assets/unknown_track.png';
import woman from '@/assets/images/woman.png';
import rock_bg from '@/assets/images/rock_bg.jpg';
import pop_bg from '@/assets/images/pop_bg.jpg';
import sertanejo_bg from '@/assets/images/sertanejo_bg.jpg';
import trending_bg from '@/assets/images/trending_bg.jpg';
import top_50_bg from '@/assets/images/top_50_bg.jpg';
import new_releases_bg from '@/assets/images/new_releases_bg.jpg';


export const unknownTrackImageUrl = Image.resolveAssetSource(unknownTrackImage).uri;
export const unknownArtistImageUrl = Image.resolveAssetSource(unknownArtistImage).uri;
export const womanImageUrl = Image.resolveAssetSource(woman).uri;
export const rockBgImageUrl = Image.resolveAssetSource(rock_bg).uri;
export const popBgImageUrl = Image.resolveAssetSource(pop_bg).uri;
export const sertanejoBgImageUrl = Image.resolveAssetSource(sertanejo_bg).uri;
export const trendingBgImageUrl = Image.resolveAssetSource(trending_bg).uri;
export const top50BgImageUrl = Image.resolveAssetSource(top_50_bg).uri;
export const newReleasesBgImageUrl = Image.resolveAssetSource(new_releases_bg).uri;