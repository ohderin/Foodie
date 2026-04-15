import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FFOutlineButton } from "../../src/components/FFButtons";
import { useApp } from "../../src/context/AppContext";
import { FF } from "../../src/theme/colors";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { resetOnboarding } = useApp();

  const signOut = async () => {
    await resetOnboarding();
    router.replace("/onboarding/splash");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.hero}>
        <View style={styles.bigAvatar}>
          <Text style={styles.bigAvatarText}>BB</Text>
        </View>
        <Text style={styles.name}>Bingo Bongo</Text>
        <Text style={styles.sub}>Foodie since 1984 · Baton Rouge, LA</Text>
        <View style={styles.stats}>
          <Stat value="0" label="Saved" />
          <View style={styles.vsep} />
          <Stat value="0" label="Reviews" />
          <View style={styles.vsep} />
          <Stat value="1" label="Day Streak" />
        </View>
      </View>
      <View style={styles.menuCard}>
        <MenuRow emoji= "" title="My Food Preferences" />
        <MenuRow emoji= "" title="Location Settings" />
        <MenuRow emoji= "" title="Dark Mode" />
        <MenuRow emoji= "" title="Notifications" last />
      </View>
      <FFOutlineButton title="Sign Out" onPress={signOut} />
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.statVal}>{value}</Text>
      <Text style={styles.statLbl}>{label}</Text>
    </View>
  );
}

function MenuRow({
  emoji,
  title,
  last,
}: {
  emoji: string;
  title: string;
  last?: boolean;
}) {
  return (
    <View
      style={[styles.menuRow, !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: FF.border }]}
    >
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.chev}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: FF.cream, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: "900", color: FF.dark },
  gear: { fontSize: 20, color: FF.light },
  hero: { alignItems: "center", marginBottom: 20 },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: FF.orange,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  bigAvatarText: { fontSize: 30, fontWeight: "900", color: "#fff" },
  name: { fontSize: 20, fontWeight: "900", color: FF.dark },
  sub: { fontSize: 13, color: FF.light, marginTop: 2 },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: FF.border,
  },
  vsep: { width: 1, height: 36, backgroundColor: FF.border },
  statVal: { fontSize: 22, fontWeight: "900", color: FF.dark },
  statLbl: { fontSize: 11, color: FF.light, marginTop: 4 },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: FF.border,
    overflow: "hidden",
    marginBottom: 16,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
  },
  menuTitle: { flex: 1, fontSize: 15, fontWeight: "600", color: FF.dark },
  chev: { fontSize: 18, color: FF.light },
});
