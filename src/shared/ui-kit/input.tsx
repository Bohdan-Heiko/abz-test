import { DEFAULT_COLORS } from "@/utils/constants/Colors";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface Props {
  label: string;
  subPlaceHolder?: string;
  inputProps?: TextInputProps;
  additionalText?: string;
  error: {
    isError: boolean;
    message: string;
  };
}

const AnimatedInputField = ({
  label,
  error,
  subPlaceHolder,
  inputProps,
  additionalText,
}: Props) => {
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
        style={[
          styles.animatedInput,
          { borderColor: error.isError ? DEFAULT_COLORS.red : borderColor },
        ]}
      >
        <TextInput
          {...inputProps}
          value={text}
          onChangeText={(val) => setText(val)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ flex: 1 }}
        />
        {additionalText && <Text style={styles.additionalText}>{additionalText}</Text>}
      </Animated.View>
      {error.isError && <Text style={styles.errorMessage}>{error.message}</Text>}
      {subPlaceHolder && !error.isError && (
        <Text style={styles.subPlaceholder}>{subPlaceHolder}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  inputContainer: {
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  animatedInput: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
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
  subPlaceholder: {
    color: DEFAULT_COLORS.surface,
    lineHeight: 16,
    paddingTop: 4,
  },
  additionalText: {
    fontSize: 16,
    lineHeight: 21,
    color: DEFAULT_COLORS.secondary,
  },
});

export default AnimatedInputField;
