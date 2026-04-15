import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { FF } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function FFPrimaryButton({ title, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.primary, pressed && styles.primaryPressed, style]}
    >
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

export function FFOutlineButton({ title, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outline, pressed && styles.outlinePressed, style]}
    >
      <Text style={styles.outlineText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: FF.red,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginHorizontal: 32,
  },
  primaryPressed: { opacity: 0.92, transform: [{ scale: 0.98 }] },
  primaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
  outline: {
    borderWidth: 2,
    borderColor: FF.red,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    marginHorizontal: 32,
  },
  outlinePressed: { backgroundColor: FF.redLight },
  outlineText: {
    color: FF.red,
    fontSize: 16,
    fontWeight: "800",
  },
});
