import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, Text, View } from "react-native"

// import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/legacy";
import { CameraModal } from "@/shared/components/camera-modal/camera-modal"
import { WorkingRequest } from "@/shared/components/work-request"
import { Button } from "@/shared/ui-kit/button"
import AnimatedInputField from "@/shared/ui-kit/input"
import { ScreenContainer } from "@/shared/ui-kit/screen-container"

import { Position } from "./_components/position"
import { UserStatus } from "./_components/user-status"
import { useCreateuser } from "./hooks/useUserCreate"

export const SignUp = () => {
  const { form, visible, createUserMethods, createdStatuses, positionsData } =
    useCreateuser()

  // SHOW COMPONENT IF CREATE USER IS SUCCESS
  if (createdStatuses.isCreateUserSuccess) {
    return (
      <UserStatus
        status="success"
        onPress={() => router.navigate("/")}
        title="User created"
      />
    )
  }

  // SHOW COMPONENT IF CREATE USER IS REJECTED
  if (createdStatuses.isCreateUserError) {
    return (
      <UserStatus
        status="reject"
        onPress={createUserMethods.resetRequestData}
        title="Something went wrong"
      />
    )
  }

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <WorkingRequest requestType="POST" />
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.gap32}>
            <AnimatedInputField name="name" label="Your name" control={form.control} />
            <AnimatedInputField name="email" label="Email" control={form.control} />
            <AnimatedInputField
              name="phone"
              label="Phone"
              control={form.control}
              inputProps={{
                keyboardType: "phone-pad"
              }}
              subPlaceHolder="+38 (XXX) XXX - XX - XX"
            />
          </View>

          <View style={styles.gap12}>
            <Text style={styles.positionTitle}>Select your position</Text>
            <View>
              {positionsData?.positions?.map((position) => (
                <Position
                  key={position.id}
                  control={form.control}
                  name="position_id"
                  userPosition={position}
                />
              ))}
            </View>
          </View>

          <AnimatedInputField
            name="photo"
            control={form.control}
            label="Upload your photo"
            additionalText="Upload"
            inputProps={{
              editable: false,
              onPress: () => createUserMethods.onOpenCloseModal(true)
            }}
          />

          <View style={styles.btnContainer}>
            <Button
              onPress={form.handleSubmit(createUserMethods.onSendForm)}
              label="Sign up"
              disabled={false}
            />
          </View>
        </View>
      </ScrollView>

      <CameraModal
        visible={visible}
        onClose={() => createUserMethods.onOpenCloseModal(false)}
        getImageInGalery={createUserMethods.getImageInGalery}
        getImageFromCamera={createUserMethods.getImageFromCamera}
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 24
  },
  gap32: {
    gap: 32
  },
  gap12: {
    gap: 12
  },
  positionTitle: {
    fontSize: 24,
    lineHeight: 24
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
})
