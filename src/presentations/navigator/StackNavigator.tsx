import { createStackNavigator } from '@react-navigation/stack';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { HomeScreen } from '../screens/home/HomeScreen';

export type RootStackParam = {
    HomeScreen: undefined;
    PokemonScreen: { pokemonId: number };
    SearchScreen: undefined;
}


const Stack = createStackNavigator<RootStackParam>();
export const StackNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}