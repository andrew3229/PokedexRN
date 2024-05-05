import { PropsWithChildren, createContext } from "react";

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});


export const ThemContext = createContext({
    isDark: false,
    theme: LightTheme
});


export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';

    const theme = isDark ? DarkTheme : LightTheme;


    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme} >
                <ThemContext.Provider value={{ isDark, theme: theme }} >
                    {children}
                </ThemContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    )

}