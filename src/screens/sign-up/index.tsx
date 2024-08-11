import { SubmitHandler, useForm } from "react-hook-form"
import { Alert, Linking, ScrollView, Text, View } from "react-native"

import { WorkingRequest } from "@/shared/components/work-request"
import { Button } from "@/shared/ui-kit/button"
import AnimatedInputField from "@/shared/ui-kit/input"
import { ScreenContainer } from "@/shared/ui-kit/screen-container"
import {
  useCreateUserMutation,
  useGetUsersPositionsQuery
} from "@/store/services/users-api"
import { zodResolver } from "@hookform/resolvers/zod"
import * as ImagePicker from "expo-image-picker"
// import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/legacy";

import { signUpSchema } from "@/schema/signup.schema"
import { CameraModal } from "@/shared/components/camera-modal/camera-modal"
import { useActions } from "@/shared/hooks/use-actions"
import { useLazyGetTokenQuery } from "@/store/services/tokens-api"
import { SignUpUserSchemaType } from "@/types/users"
import { useState } from "react"
import { Position } from "./_components/position"

const DEFAULT_DATA = {
  name: "",
  email: "",
  phone: "",
  position_id: 0,
  photo: {}
}

export const SignUp = () => {
  const [visible, setVisible] = useState(false)

  const { data: positionsData } = useGetUsersPositionsQuery()
  const [getToken] = useLazyGetTokenQuery()
  const [createUser] = useCreateUserMutation()
  const { setNewToken } = useActions()

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<SignUpUserSchemaType>({
    mode: "onChange",
    defaultValues: DEFAULT_DATA,
    resolver: zodResolver(signUpSchema)
  })

  const WATCH_PHOTO = watch("photo") as ImagePicker.ImagePickerAsset

  const setToken = async (): Promise<boolean> => {
    const token = await getToken().unwrap()

    if (token.success) {
      setNewToken(token.token)
    }

    return token.success
  }

  const onSendForm: SubmitHandler<SignUpUserSchemaType> = async (data) => {
    const isToken = await setToken()

    if (isToken) {
      let formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("position_id", data.position_id.toString())
      formData.append("photo", {
        uri: WATCH_PHOTO?.uri,
        name: WATCH_PHOTO?.fileName,
        type: WATCH_PHOTO?.mimeType
      } as unknown as Blob)

      await createUser(formData)
        .unwrap()
        .then(() => Alert.alert("Success", "User created"))
        .catch((e) => {
          console.log(e)

          Alert.alert("Error", "Something went wrong")
        })
        .finally(() => setNewToken(""))
    }
  }

  const getPermissions = async (type: "camera" | "gallery"): Promise<boolean> => {
    if (type === "gallery") {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!galleryStatus.granted) {
        Alert.alert(
          "Требуется разрешение",
          "Приложению требуется доступ к камере и галерее для загрузки изображений."
        )

        return false
      }

      return true
    } else {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()

      if (!cameraStatus.granted) {
        Alert.alert(
          "Требуется разрешение",
          "Приложению требуется доступ к камере для загрузки изображений."
        )
        return false
      }

      return true
    }
  }

  const getImageInGalery = async () => {
    try {
      const galleryStatus = await getPermissions("gallery")

      if (!galleryStatus) {
        return Linking.openSettings()
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        selectionLimit: 1
      })

      if (!result.canceled) {
        const image = result.assets[0]

        if (
          image &&
          image?.fileSize &&
          image?.fileSize <= 5 * 1024 * 1024 &&
          image.width >= 70 &&
          image.height >= 70
        ) {
          setValue("photo", image)
          trigger("photo")
          setVisible(false)
        } else {
          Alert.alert(
            "Error",
            "The image size must be no more than 5 MB and the resolution must be at least 70x70 pixels."
          )
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting the image.")
    }
  }

  const getImageFromCamera = async () => {
    try {
      const galleryStatus = await getPermissions("camera")

      if (!galleryStatus) {
        return Linking.openSettings()
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8
      })

      if (!result.canceled) {
        const image = result.assets[0]

        if (
          image &&
          image?.fileSize &&
          image.fileSize <= 5 * 1024 * 1024 &&
          image.width >= 70 &&
          image.height >= 70
        ) {
          setValue("photo", image)
          trigger("photo")
          setVisible(false)
        } else {
          Alert.alert(
            "Error",
            "The image size must be no more than 5 MB and the resolution must be at least 70x70 pixels."
          )
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting the image.")
    }
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
            name="photo"
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
      <CameraModal
        visible={visible}
        onClose={() => setVisible(false)}
        getImageInGalery={getImageInGalery}
        getImageFromCamera={getImageFromCamera}
      />
    </ScreenContainer>
  )
}
