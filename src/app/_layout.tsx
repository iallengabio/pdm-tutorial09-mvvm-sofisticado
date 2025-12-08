import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const theme = isDark
    ? { ...MD3DarkTheme, roundness: 8, colors: { ...MD3DarkTheme.colors, primary: "#6750A4" } }
    : { ...MD3LightTheme, roundness: 8, colors: { ...MD3LightTheme.colors, primary: "#6750A4" } };

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="signup" options={{ title: "Cadastro" }} />
        <Stack.Screen name="home" options={{ title: "Home" ,headerShown:false}} />
      </Stack>
    </PaperProvider>
  );
}
