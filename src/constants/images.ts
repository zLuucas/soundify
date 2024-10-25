import unknownArtistImage from '@/assets/unknown_artist.png';
import unknownTrackImage from '@/assets/unknown_track.png';
import woman from '@/assets/images/woman.png';
import { Image } from 'react-native';

export const unknownTrackImageUrl = Image.resolveAssetSource(unknownTrackImage).uri;
export const unknownArtistImageUrl = Image.resolveAssetSource(unknownArtistImage).uri;
export const womanImageUrl = Image.resolveAssetSource(woman).uri;