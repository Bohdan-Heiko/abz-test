import { WorkingRequest } from "@/shared/components/work-request";
import { Button } from "@/shared/ui-kit/button";
import AnimatedInputField from "@/shared/ui-kit/input";
import { ScreenContainer } from "@/shared/ui-kit/screen-container";
import { ScrollView, Text, View } from "react-native";
import { Position } from "./_components/position";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string({ message: "Required field" })
    .min(2, "Minimum 2 character")
    .max(60, "Maximum 60 characters"),
  email: z.string().email(),
  phone: z
    .string({ message: "Required field" })
    .startsWith("+380", "Phone number must start with +380")
    .min(13)
    .max(13),
  position_id: z.number(),
  photo: z.string(),
});

const DEFAULT_DATA = {
  name: "",
  email: "",
  phone: "",
  position_id: "",
  photo: "",
};

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_DATA,
    resolver: zodResolver(signUpSchema),
  });

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
                keyboardType: "phone-pad",
              }}
              subPlaceHolder="+38 (XXX) XXX - XX - XX"
            />
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 24, lineHeight: 24 }}>Select your position</Text>
            <View>
              <Position position="Frontend developer" />
              <Position position="Backend developer" />
              <Position position="Designer" />
              <Position position="QA" />
            </View>
          </View>

          <AnimatedInputField
            name="position_id"
            control={control}
            label="Upload your photo"
            additionalText="Upload"
            inputProps={{
              onPress: () => console.log("asdasd"),
              editable: false,
            }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button label="Sign up" disabled />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};
