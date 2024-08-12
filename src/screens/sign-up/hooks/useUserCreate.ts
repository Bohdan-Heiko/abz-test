import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { Control, SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form"
import { Alert, Linking } from "react-native"

// import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/legacy";
import { signUpSchema } from "@/schema/signup.schema"
import { useActions } from "@/shared/hooks/use-actions"
import { useLazyGetTokenQuery } from "@/store/services/tokens-api"
import {
  useCreateUserMutation,
  useGetUsersPositionsQuery
} from "@/store/services/users-api"
import { SignUpUserSchemaType, UsersPositionsResponse } from "@/types/users"
import { zodResolver } from "@hookform/resolvers/zod"

const DEFAULT_DATA = {
  name: "",
  email: "",
  phone: "",
  position_id: 0,
  photo: {}
}

interface ReturnData {
  visible: boolean
  form: {
    control: Control<SignUpUserSchemaType>
    handleSubmit: UseFormHandleSubmit<SignUpUserSchemaType>
  }
  createUserMethods: {
    onOpenCloseModal: (status: boolean) => void
    onSendForm: SubmitHandler<SignUpUserSchemaType>
    resetRequestData: () => void
    getImageInGalery: () => void
    getImageFromCamera: () => void
  }
  createdStatuses: {
    isCreateUserSuccess: boolean
    isCreateUserError: boolean
  }
  positionsData: UsersPositionsResponse | undefined
}

export const useCreateuser = (): ReturnData => {
  const { setNewToken, setCreatedUserId } = useActions()
  const [visible, setVisible] = useState(false)

  const { data: positionsData } = useGetUsersPositionsQuery()
  const [getToken] = useLazyGetTokenQuery()
  const [
    createUser,
    {
      isSuccess: isCreateUserSuccess,
      isError: isCreateUserError,
      reset: resetRequestData
    }
  ] = useCreateUserMutation()

  const { control, watch, trigger, setValue, handleSubmit, setError } =
    useForm<SignUpUserSchemaType>({
      mode: "onChange",
      defaultValues: DEFAULT_DATA,
      resolver: zodResolver(signUpSchema)
    })

  // WATCHING PHOTO FROM USEFORM
  const WATCH_PHOTO = watch("photo") as ImagePicker.ImagePickerAsset

  // SET TOKEN IN TO REDUX
  const setToken = async (): Promise<boolean> => {
    const token = await getToken().unwrap()

    if (token.success) {
      setNewToken(token.token)
    }

    return token.success
  }

  // FORAM DATA AND SEND TO SERVER
  const onSendForm: SubmitHandler<SignUpUserSchemaType> = async (data) => {
    if (!WATCH_PHOTO.assetId)
      return setError("photo", { type: "required", message: "Photo is required" })
    const isToken = await setToken()

    if (isToken) {
      const formData = new FormData()
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
        .then((res) => setCreatedUserId(res.user_id))
        .finally(() => setNewToken(""))
    }
  }

  // GET PERISSIONS FOR CAMERA AND GALLERY
  const getPermissions = async (type: "camera" | "gallery"): Promise<boolean> => {
    if (type === "gallery") {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!galleryStatus.granted) {
        Alert.alert(
          "Permission required",
          "The app requires access to the camera and gallery to upload images."
        )

        return false
      }

      return true
    } else {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()

      if (!cameraStatus.granted) {
        Alert.alert(
          "Permission required",
          "The app needs camera access to upload images."
        )
        return false
      }

      return true
    }
  }

  // GETING IMG FROM GALERY
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

  // GETING IMG FROM CAMERA
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

  const onOpenCloseModal = (status: boolean) => {
    setVisible(status)
  }

  return {
    visible,

    form: {
      control,
      handleSubmit
    },
    createUserMethods: {
      onSendForm,
      getImageInGalery,
      getImageFromCamera,
      resetRequestData,
      onOpenCloseModal
    },
    createdStatuses: {
      isCreateUserError,
      isCreateUserSuccess
    },

    positionsData
  }
}
