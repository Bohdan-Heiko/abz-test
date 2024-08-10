import { WorkingRequest } from "@/shared/components/work-request";
import { Button } from "@/shared/ui-kit/button";
import AnimatedInputField from "@/shared/ui-kit/input";
import { ScreenContainer } from "@/shared/ui-kit/screen-container";
import { ScrollView, Text, View } from "react-native";
import { Position } from "./components/position";

export const SignUp = () => {
  return (
    <ScreenContainer>
      <WorkingRequest requestType="POST" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 32, gap: 24 }}>
          <View style={{ gap: 32 }}>
            <AnimatedInputField
              label="Your name"
              error={{ isError: false, message: "Required field" }}
            />
            <AnimatedInputField
              label="Email"
              error={{ isError: false, message: "Required field" }}
            />
            <AnimatedInputField
              label="Phone"
              error={{ isError: false, message: "Required field" }}
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
            label="Upload your photo"
            additionalText="Upload"
            inputProps={{
              onPress: () => console.log("asdasd"),
              editable: false,
            }}
            error={{ isError: false, message: "Required field" }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button label="Sign up" disabled />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};
