import { SubmitHandler, useForm } from "react-hook-form"
import { Linking, ScrollView, Text, View } from "react-native"
import { z } from "zod"

import { WorkingRequest } from "@/shared/components/work-request"
import { Button } from "@/shared/ui-kit/button"
import AnimatedInputField from "@/shared/ui-kit/input"
import { ScreenContainer } from "@/shared/ui-kit/screen-container"
import { useGetUsersPositionsQuery } from "@/store/services/users-api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCameraPermissions } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
// import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/legacy";

import { CameraModal } from "@/shared/components/camera-modal/camera-modal"
import { useState } from "react"
import { Position } from "./_components/position"

const signUpSchema = z.object({
  name: z
    .string({ message: "Required field" })
    .min(2, "Minimum 2 character")
    .max(60, "Maximum 60 characters"),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z
    .string({ message: "Required field" })
    .startsWith("+380", "Phone number must start with +380")
    .min(13)
    .max(13),
  position_id: z.number().min(1).nonnegative(),
  photo: z.string()
})

const DEFAULT_DATA = {
  name: "",
  email: "",
  phone: "",
  position_id: 0,
  photo: ""
}

type SignInSchemaType = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const [visible, setVisible] = useState(false)

  const { data: positionsData } = useGetUsersPositionsQuery()
  const [cameraPermission, requestPermission] = useCameraPermissions()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInSchemaType>({
    mode: "onChange",
    defaultValues: DEFAULT_DATA,
    resolver: zodResolver(signUpSchema)
  })

  console.log(errors)

  const onSendForm: SubmitHandler<SignInSchemaType> = (data: any) => {
    console.log(data)
  }

  const requestPermissions = async () => {
    // Запрос разрешений на доступ к камере и галерее
    console.log("requestPermissions")

    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
    // const cameraPermission = await Camera.requestCameraPermissionsAsync()
    // requestPermission()
    // console.log(cameraPermission)

    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
    console.log(galleryStatus, cameraStatus)
    if (!galleryStatus.granted) {
      Linking.openSettings()
    }

    // if (cameraStatus !== "granted" || galleryStatus !== "granted") {
    //   Alert.alert(
    //     "Требуется разрешение",
    //     "Приложению требуется доступ к камере и галерее для загрузки изображений."
    //   )
    //   return false
    // }

    // return true
  }

  return (
    <ScreenContainer>
      <WorkingRequest requestType="POST" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 32, gap: 24 }}>
          <View style={{ gap: 32 }}>
            <AnimatedInputField name="name" label="Your name" control={control} />
            <AnimatedInputField name="email" label="Email" control={control} />
            <AnimatedInputField
              name="phone"
              label="Phone"
              control={control}
              inputProps={{
                keyboardType: "phone-pad"
              }}
              subPlaceHolder="+38 (XXX) XXX - XX - XX"
            />
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 24, lineHeight: 24 }}>Select your position</Text>
            <View>
              {positionsData?.positions?.map((position) => (
                <Position
                  key={position.id}
                  control={control}
                  name="position_id"
                  userPosition={position}
                />
              ))}
            </View>
          </View>

          <AnimatedInputField
            name="position_id"
            control={control}
            label="Upload your photo"
            additionalText="Upload"
            inputProps={{
              onPress: () => setVisible(true),
              editable: false
            }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button onPress={handleSubmit(onSendForm)} label="Sign up" disabled={false} />
          </View>
        </View>
      </ScrollView>
      <CameraModal visible={visible} onClose={() => setVisible(false)} />
    </ScreenContainer>
  )
}
