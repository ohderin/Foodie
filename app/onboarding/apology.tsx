import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FFOutlineButton, FFPrimaryButton } from "../../src/components/FFButtons";
import { MascotBlob } from "../../src/components/MascotBlob";
import { FF } from "../../src/theme/colors";

export default function ApologyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]}>
      <MascotBlob grayscale />
      <View style={styles.logoBlock}>
        <Text style={styles.logo}>Foodie</Text>
        <Text style={styles.logoSub}>— Finder —</Text>
      </View>
      <Text style={styles.sorry}>We're Sorry!</Text>
      <Text style={styles.p}>
        We can't find food if we can't find you!{"\n"}
        Your location stays private and is only used to show nearby restaurants.
      </Text>
      <View style={{ flex: 1 }} />
      <View style={styles.actions}>
        <FFPrimaryButton title="📍 Share My Location" onPress={() => router.push("/onboarding/location")} />
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>
        <FFOutlineButton title="Browse Without Location" onPress={() => router.replace("/onboarding/start")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: FF.cream, alignItems: "center" },
  logoBlock: { alignItems: "center", marginTop: 14 },
  logo: { fontSize: 36, fontWeight: "900", color: FF.red },
  logoSub: { fontSize: 19, fontWeight: "800", color: FF.orange },
  sorry: { fontSize: 28, fontWeight: "900", color: FF.red, marginTop: 24 },
  p: {
    fontSize: 14,
    color: FF.med,
    textAlign: "center",
    paddingHorizontal: 36,
    marginTop: 8,
    lineHeight: 22,
  },
  actions: { gap: 10, width: "100%" },
  orRow: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 32 },
  orLine: { flex: 1, height: 1, backgroundColor: FF.border },
  orText: { fontSize: 12, color: FF.light },
});
