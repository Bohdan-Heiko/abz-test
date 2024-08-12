import store from "@/store"
import { useNetInfo } from "@react-native-community/netinfo"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Redirect, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import { Provider as ReduxProvider } from "react-redux"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const netInfo = useNetInfo()

  useEffect(() => {
    let timeout: NodeJS.Timeout
    timeout = setTimeout(() => {
      SplashScreen.hideAsync()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  // CHECK CONNECTION
  if (!netInfo.isConnected) {
    return <Redirect href="/no-conections" />
  }

  return (
    <ReduxProvider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <Stack initialRouteName="/(tabs)/users">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="no-conections" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ReduxProvider>
  )
}
