import { ScrollView, Text, View } from "react-native"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { WorkingRequest } from "@/shared/components/work-request"
import { Button } from "@/shared/ui-kit/button"
import AnimatedInputField from "@/shared/ui-kit/input"
import { ScreenContainer } from "@/shared/ui-kit/screen-container"
import { useGetUsersPositionsQuery } from "@/store/services/users-api"
import { zodResolver } from "@hookform/resolvers/zod"

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
  const { data: positionsData } = useGetUsersPositionsQuery()
  console.log(positionsData)

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
              {/* <Position position="Backend developer" />
              <Position position="Designer" />
              <Position position="QA" /> */}
            </View>
          </View>

          <AnimatedInputField
            name="position_id"
            control={control}
            label="Upload your photo"
            additionalText="Upload"
            inputProps={{
              onPress: () => console.log("asdasd"),
              editable: false
            }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button onPress={handleSubmit(onSendForm)} label="Sign up" disabled={false} />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}
