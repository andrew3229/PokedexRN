import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, FAB, Text, useTheme } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { PokemonBg } from '../../components/ui/PokemonBg'
import { FlatList } from 'react-native-gesture-handler'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack'



interface Props extends StackScreenProps<RootStackParam, 'HomeScreen'> { };



export const HomeScreen = ({ navigation }: Props) => {



    const { top } = useSafeAreaInsets();
    const theme = useTheme();

    // Forma tradicional de una peticion https
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60,
    // });

    // proyecto finalizado

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: (params) => getPokemons(params.pageParam),
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 1000 * 60 * 60,
    });


    return (
        <View style={globalTheme.globalMargin}>
            <PokemonBg style={styles.imgPosition} />

            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(pokemon: any, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={() => (
                    <Text variant='displayMedium'>Pókedex</Text>
                )}

                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
            />

            <FAB
                label='Buscar'
                style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}
                mode='elevated'
                color={theme.dark ? 'black' : 'white'}

                onPress={() => navigation.push('SearchScreen')}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
});