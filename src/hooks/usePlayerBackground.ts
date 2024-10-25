import { useEffect, useState } from 'react';
import { getColors } from 'react-native-image-colors';

const initialState = {
    colorOne: { value: '', name: '' },
    colorTwo: { value: '', name: '' },
    colorThree: { value: '', name: '' },
    colorFour: { value: '', name: '' },
    rawResult: '',
}

export const usePlayerBackground = (imageUrl: string) => {
    const [colors, setColors] = useState(initialState);


    useEffect(() => {

        const fetchColors = async () => {
            const result = await getColors(imageUrl, {
                fallback: '#000000',
                pixelSpacing: 5,
            });

            switch (result.platform) {
                case 'android':
                case 'web':
                    setColors({
                        colorOne: { value: result.lightVibrant, name: 'lightVibrant' },
                        colorTwo: { value: result.dominant, name: 'dominant' },
                        colorThree: { value: result.vibrant, name: 'vibrant' },
                        colorFour: { value: result.darkVibrant, name: 'darkVibrant' },
                        rawResult: JSON.stringify(result),
                    })
                    break
                case 'ios':
                    setColors({
                        colorOne: { value: result.background, name: 'background' },
                        colorTwo: { value: result.detail, name: 'detail' },
                        colorThree: { value: result.primary, name: 'primary' },
                        colorFour: { value: result.secondary, name: 'secondary' },
                        rawResult: JSON.stringify(result),
                    })
                    break
                default:
                    throw new Error('Unexpected platform')
            }

        }

        fetchColors();

    }, [imageUrl]);

    return { colors };
};