import { useContext } from 'react';
import { StyleProp, Image, ImageStyle } from 'react-native'
import { ThemContext } from '../../context/ThemContext';

interface Props {
    style?: StyleProp<ImageStyle>;
}
export const PokemonBg = ({ style }: Props) => {
    const { isDark } = useContext(ThemContext);
    const pokemonImg = !isDark ? require('../../../assets/pokeball-dark.png') : require('../../../assets/pokeball-light.png');
    return (
        <Image
            source={pokemonImg}
            style={[
                {
                    width: 300,
                    height: 300,
                    opacity: 0.2
                },
                style
            ]}
        />
    )
}