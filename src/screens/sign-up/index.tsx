import AnimatedInputField from "@/shared/ui-kit/input";
import { ScreenContainer } from "@/shared/ui-kit/screen-container";
import { View } from "react-native";

export const SignUp = () => {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ gap: 32 }}>
          <AnimatedInputField
            label="Your name"
            error={{ isError: false, message: "Required field" }}
          />
          <AnimatedInputField label="Email" error={{ isError: false, message: "Required field" }} />
          <AnimatedInputField label="Phone" error={{ isError: true, message: "Required field" }} />
        </View>
      </View>
    </ScreenContainer>
  );
};
