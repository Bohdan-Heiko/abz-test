import React, { useRef, useState } from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native"

import { DEFAULT_COLORS } from "@/utils/constants/Colors"

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  label: string
  subPlaceHolder?: string
  inputProps?: TextInputProps
  additionalText?: string
}

const AnimatedInputField = <T extends FieldValues>({
  name,
  label,
  control,
  inputProps,
  subPlaceHolder,
  additionalText
}: Props<T>) => {
  const [text, setText] = useState("")
  const floatingLabelAnimation = useRef(new Animated.Value(text ? 1 : 0)).current
  const borderColorAnimation = useRef(new Animated.Value(0)).current

  const handleFocus = () => {
    // Animate the label up and reduce its size when input is focused
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false
    }).start()
    // Animate the border color when input is focused
    Animated.timing(borderColorAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false
    }).start()
  }

  const handleBlur = () => {
    // If the input is empty, animate the floating label back to its original position
    if (!text) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
      }).start()
    }
    // Animate the border color back to original when input is blurred
    Animated.timing(borderColorAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false
    }).start()
  }

  // Define animated styles for the floating label
  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 0] // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12] // font size
    })
  }

  const borderColor = borderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [DEFAULT_COLORS.gray, DEFAULT_COLORS.interior_blue] // change colors as needed
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
            <Animated.Text
              style={[
                styles.label,
                floatingLabelStyle,
                { color: error ? DEFAULT_COLORS.red : styles.label.color }
              ]}
            >
              {label}
            </Animated.Text>
            <Animated.View
              style={[
                styles.animatedInput,
                { borderColor: error ? DEFAULT_COLORS.red : borderColor }
              ]}
            >
              <TextInput
                {...inputProps}
                value={value}
                onChangeText={(val) => {
                  onChange(val)
                  setText(val) // ITS NEED FOR CORECT WORKING ANIMATION
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ flex: 1 }}
              />
              {additionalText && (
                <Pressable onPress={inputProps?.onPress}>
                  <Text style={styles.additionalText}>{additionalText}</Text>
                </Pressable>
              )}
            </Animated.View>
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
            {subPlaceHolder && !error && (
              <Text style={styles.subPlaceholder}>{subPlaceHolder}</Text>
            )}
          </View>
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  inputContainer: {
    borderBottomWidth: 1,
    paddingBottom: 4
  },
  animatedInput: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    paddingLeft: 16,
    position: "absolute",
    color: DEFAULT_COLORS.dark_gray
  },
  errorMessage: {
    position: "absolute",
    bottom: -20,
    left: 20,
    color: DEFAULT_COLORS.red
  },
  subPlaceholder: {
    color: DEFAULT_COLORS.surface,
    lineHeight: 16,
    paddingTop: 4
  },
  additionalText: {
    fontSize: 16,
    lineHeight: 21,
    color: DEFAULT_COLORS.secondary
  }
})

export default AnimatedInputField
