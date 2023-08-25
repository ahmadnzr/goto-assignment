type ColorKeys =
  | "PRIMARY_10"
  | "NEUTRAL_10"
  | "NEUTRAL_20"
  | "NEUTRAL_30"
  | "NEUTRAL_40"
  | "NEUTRAL_50";

export type ColorValues =
  | "primary-10"
  | "neutral-10"
  | "neutral-20"
  | "neutral-30"
  | "neutral-40"
  | "neutral-50";

export const Colors: Record<ColorKeys, ColorValues> = {
  PRIMARY_10: "primary-10",
  NEUTRAL_10: "neutral-10",
  NEUTRAL_20: "neutral-20",
  NEUTRAL_30: "neutral-30",
  NEUTRAL_40: "neutral-40",
  NEUTRAL_50: "neutral-50",
};
