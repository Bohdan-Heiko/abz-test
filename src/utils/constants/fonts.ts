type Fonts =
  | "NunitoRegular400"
  | "NunitoMedium500"
  | "NunitoSemiBold600"
  | "NunitoBold700"
  | "NunitoExtraBold800"

export const FONTS: Record<Fonts, string> = {
  NunitoRegular400: "Nunito Sans 7pt Condensed Regular",
  NunitoMedium500: "Nunito Sans 7pt Condensed Medium",
  NunitoSemiBold600: "Nunito Sans 7pt Condensed SemiBold",
  NunitoBold700: "Nunito Sans 7pt Condensed Bold",
  NunitoExtraBold800: "Nunito Sans 7pt Condensed ExtraBold"
}
