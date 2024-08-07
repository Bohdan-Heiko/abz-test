import UserImg from "#/images/users/user_1.png";
import { DEFAULT_COLORS } from "@/utils/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

export const User = () => {
  return (
    <View style={styles.container}>
      <Image source={UserImg} style={styles.imageContainer} />
      <View style={styles.textContainer}>
        <View style={styles.innerTextContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Malcolm Bailey</Text>
            <Text style={styles.titleText}>Frontend developer</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>jany_murazik51@hotmail.com</Text>
            <Text style={styles.phoneText}>+38 (098) 278 76 24</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flexDirection: "column",
    gap: 24,
    flex: 1,
  },
  innerTextContainer: {
    gap: 8,
  },
  nameContainer: {
    gap: 4,
  },
  emailContainer: {
    gap: 4,
  },
  nameText: {
    fontSize: 18,
    lineHeight: 20,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.6,
  },
  emailText: {
    fontSize: 14,
    lineHeight: 20,
  },
  phoneText: {
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: DEFAULT_COLORS.gray,
  },
});
