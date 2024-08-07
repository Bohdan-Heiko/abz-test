import { DEFAULT_COLORS } from "@/utils/constants/Colors";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  label: string;
  error: {
    isError: boolean;
    message: string;
  };
}

const AnimatedInputField = ({ label, error }: Props) => {
  const [text, setText] = useState("");
  const floatingLabelAnimation = useRef(new Animated.Value(text ? 1 : 0)).current;
  const borderColorAnimation = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    // Animate the label up and reduce its size when input is focused
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
    // Animate the border color when input is focused
    Animated.timing(borderColorAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    // If the input is empty, animate the floating label back to its original position
    if (!text) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    // Animate the border color back to original when input is blurred
    Animated.timing(borderColorAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  // Define animated styles for the floating label
  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 0], // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // font size
    }),
  };

  const borderColor = borderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [DEFAULT_COLORS.gray, DEFAULT_COLORS.interior_blue], // change colors as needed
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          floatingLabelStyle,
          { color: error.isError ? DEFAULT_COLORS.red : styles.label.color },
        ]}
      >
        {label}
      </Animated.Text>
      <Animated.View
        style={[styles.input, { borderColor: error.isError ? DEFAULT_COLORS.red : borderColor }]}
      >
        <TextInput
          value={text}
          onChangeText={(val) => setText(val)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
      {error.isError && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    position: "relative",
  },
  inputContainer: {
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    // borderColor: DEFAULT_COLORS.gray,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    // fontWeight: "bold",
  },
  label: {
    paddingLeft: 16,
    position: "absolute",
    color: DEFAULT_COLORS.dark_gray,
  },
  errorMessage: {
    position: "absolute",
    bottom: -20,
    left: 20,
    color: DEFAULT_COLORS.red,
  },
});

export default AnimatedInputField;
