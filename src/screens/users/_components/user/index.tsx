import { Image, StyleSheet, Text, View } from "react-native"

import { UsersResponse } from "@/types/users"
import { DEFAULT_COLORS } from "@/utils/constants/Colors"

interface Props {
  user: UsersResponse["users"][0]
}

export const User = ({ user }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.photo }} style={styles.imageContainer} />
      <View style={styles.textContainer}>
        <View style={styles.innerTextContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text style={styles.titleText}>{user?.position}</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>{user?.email}</Text>
            <Text style={styles.phoneText}>{user?.phone}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 24
    // backgroundColor: "red",
  },
  imageContainer: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25
  },
  textContainer: {
    flexDirection: "column",
    gap: 24,
    flex: 1
  },
  innerTextContainer: {
    gap: 8
  },
  nameContainer: {
    gap: 4
  },
  emailContainer: {
    gap: 4
  },
  nameText: {
    fontSize: 18,
    lineHeight: 20
  },
  titleText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.6
  },
  emailText: {
    fontSize: 14,
    lineHeight: 20
  },
  phoneText: {
    fontSize: 14,
    lineHeight: 20
  },
  divider: {
    height: 1,
    backgroundColor: DEFAULT_COLORS.gray
  }
})
