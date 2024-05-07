import { View, StyleSheet } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/pokemon';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNameWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebounceValue } from '../../hooks/useDebounceValue';
export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const [term, setTerm] = useState('');

    const debouncedValue  = useDebounceValue(term);

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNameWithId(),
    })



    //Todo: aplicar debounce
    const pokemonNameIdList = useMemo(() => {

        if (!isNaN(Number(debouncedValue))) {
            const pokemon = pokemonNameList.find(pokemon => pokemon.id === debouncedValue);
            return pokemon ? [pokemon] : [];
        }

        if (debouncedValue.length === 0) return [];

        if (debouncedValue.length < 3) return [];

        return pokemonNameList.filter(pokemon => pokemon.name.includes(debouncedValue.toLocaleLowerCase()))


    }, [debouncedValue]);



    const { isLoading: isLoadingPokemon, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5
    })


    if (isLoading) {
        return <FullScreenLoader />
    }

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

            {
                isLoadingPokemon && <ActivityIndicator style={{ paddingTop: 20 }} />
            }

            {/* <Text>{JSON.stringify(pokemonNameIdList, null, 3)}</Text> */}

            
            <FlatList
                data={pokemons}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => <View style={{ height: 100 }} />}
            />
        </View>
    )
}