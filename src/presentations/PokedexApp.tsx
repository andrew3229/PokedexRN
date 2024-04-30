import 'react-native-gesture-handler';
import { StackNavigator } from './navigator/StackNavigator';
import { ThemeContextProvider } from './context/ThemContext';


export const PokedexApp = () => {
    return (
        <ThemeContextProvider>
            <StackNavigator />
        </ThemeContextProvider>

    )
}