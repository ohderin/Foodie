import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function MascotBlob({ grayscale }: { grayscale?: boolean }) {
  return (
    <View style={[styles.wrap, grayscale && { opacity: 0.75 }]}>
      <LinearGradient colors={["#F0B429", "#D96F00"]} style={styles.blob}>
        <Text style={styles.emoji}>🐾</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center" },
  blob: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D96F00",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: { fontSize: 88 },
});
