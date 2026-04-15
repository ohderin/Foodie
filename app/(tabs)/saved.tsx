import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FF } from "../../src/theme/colors";

export default function SavedScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Saved Places</Text>
      <View style={styles.empty}>
        <Text style={styles.icon}>🐾</Text>
        <Text style={styles.emptyTitle}>Nothing saved yet!</Text>
        <Text style={styles.emptyDesc}>
          Tap the heart on any restaurant card to save it here for later.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: FF.cream, paddingHorizontal: 20 },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: FF.dark,
    marginBottom: 24,
    textAlign: "center",
  },
  empty: { alignItems: "center", marginTop: 48 },
  icon: { fontSize: 56, marginBottom: 12 },
  emptyTitle: { fontSize: 22, fontWeight: "900", color: FF.dark, marginBottom: 8 },
  emptyDesc: {
    fontSize: 17,
    color: FF.med,
    textAlign: "center",
    lineHeight: 22,
  },
});
