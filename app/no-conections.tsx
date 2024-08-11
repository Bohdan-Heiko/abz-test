import NoInternetConectionImg from "#/images/no-conections/no_internet.png"
import { Button } from "@/shared/ui-kit/button"
import { ScreenContainer } from "@/shared/ui-kit/screen-container"
import NetInfo from "@react-native-community/netinfo"
import { Redirect } from "expo-router"
import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const NoConectionsScreen = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true)
  const checkConnection = async () => {
    const state = await NetInfo.fetch()
    setIsConnected(state.isConnected)
  }

  if (isConnected) {
    return <Redirect href={"/"} />
  }
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.centered}>
          <Image source={NoInternetConectionImg} style={styles.image} />
          <Text style={styles.text}>There is no internet connection</Text>

          <Button onPress={checkConnection} label="Try Again" />
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24
  },
  image: {
    width: 200,
    height: 200
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 24
  }
})

export default NoConectionsScreen
