import { View, StyleSheet } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/pokemon';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNameWithId } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const [term, setTerm] = useState('');

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNameWithId(),
    })



    //Todo: aplicar debounce
    const pokemonNameIdList = useMemo(() => {
        if (!isNaN(Number(term))) {
            const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(term));
            return pokemon ? [pokemon] : [];
        }

        if (term.length === 0) return [];

        if (term.length < 3) return [];

        return pokemonNameList.filter(pokemon => pokemon.name.includes(term.toLocaleLowerCase()))


    }, [term])


    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput
                placeholder='Busca un pokemon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term}
            />

            <ActivityIndicator style={{ paddingTop: 20 }} />

            <Text>{JSON.stringify(pokemonNameIdList, null, 2)}</Text>

            <FlatList
                data={[] as Pokemon[]}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}