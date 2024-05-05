import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useTheme } from 'react-native-paper'
export const FullScreenLoader = () => {

    const {colors} = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary,
            }}
        >

            <ActivityIndicator size={50} color="white" />
        </View>
    )
}