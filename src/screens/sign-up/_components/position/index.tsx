import { Platform, StyleSheet, Text, View } from "react-native"
import React from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"

import { CheckBox } from "@/shared/ui-kit/check-box"
import { UsersPositionsResponse } from "@/types/users"

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  userPosition: UsersPositionsResponse["positions"][0]
}
export const Position = <T extends FieldValues>({
  userPosition,
  control,
  name
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <CheckBox
            isError={!!error}
            isChecked={value === userPosition.id}
            onPress={() => onChange(userPosition.id)}
          />
          <Text style={styles.text}>{userPosition.name}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 22,
    alignItems: "center",
    paddingVertical: Platform.OS === "ios" ? 17 : 14
  },
  text: {
    fontSize: 16,
    lineHeight: 24
  }
})
