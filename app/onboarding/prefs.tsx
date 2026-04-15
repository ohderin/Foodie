import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../src/context/AppContext";
import { FF } from "../../src/theme/colors";

const MEALS = [
  { emoji: "🌅", label: "Breakfast" },
  { emoji: "☀️", label: "Lunch" },
  { emoji: "🌙", label: "Dinner" },
  { emoji: "🧁", label: "Dessert" },
];
const STYLES = [
  { emoji: "🍽️", label: "Dine-in" },
  { emoji: "🛍️", label: "Takeout" },
  { emoji: "🛵", label: "Delivery" },
];
const CUISINES = [
  ["🍗", "Chicken"],
  ["🍔", "Burgers"],
  ["🌮", "Mexican"],
  ["🍣", "Sushi"],
  ["🍕", "Pizza"],
  ["🥗", "Salads"],
] as const;

export default function PrefsScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useApp();
  const [meal, setMeal] = useState<Record<string, boolean>>({
    Lunch: true,
    Dinner: true,
  });
  const [style, setStyle] = useState<Record<string, boolean>>({ "Dine-in": true });
  const [cuisine, setCuisine] = useState<Record<string, boolean>>({
    Chicken: true,
    Burgers: true,
  });
  const [price, setPrice] = useState(1);

  const finish = async () => {
    await completeOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Set Your Vibe</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Section title="Meal Time">
          <ChipRow>
            {MEALS.map((m) => (
              <PrefChip
                key={m.label}
                emoji={m.emoji}
                label={m.label}
                on={!!meal[m.label]}
                onToggle={() =>
                  setMeal((s) => ({ ...s, [m.label]: !s[m.label] }))
                }
              />
            ))}
          </ChipRow>
        </Section>
        <Section title="Dining Style">
          <ChipRow>
            {STYLES.map((m) => (
              <PrefChip
                key={m.label}
                emoji={m.emoji}
                label={m.label}
                on={!!style[m.label]}
                onToggle={() =>
                  setStyle((s) => ({ ...s, [m.label]: !s[m.label] }))
                }
              />
            ))}
          </ChipRow>
        </Section>
        <Section title="Cuisine">
          <ChipRow>
            {CUISINES.map(([emoji, label]) => (
              <PrefChip
                key={label}
                emoji={emoji}
                label={label}
                on={!!cuisine[label]}
                onToggle={() =>
                  setCuisine((s) => ({ ...s, [label]: !s[label] }))
                }
              />
            ))}
          </ChipRow>
        </Section>
        <Section title="Price Range">
          <View style={styles.priceRow}>
            {[0, 1, 2].map((i) => (
              <Pressable
                key={i}
                onPress={() => setPrice(i)}
                style={[
                  styles.priceTile,
                  price === i && styles.priceTileOn,
                ]}
              >
                <Text
                  style={[
                    styles.priceText,
                    price === i && styles.priceTextOn,
                  ]}
                >
                  {["$", "$$", "$$$"][i]}
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.showBtn} onPress={finish}>
          <Text style={styles.showBtnText}>Show Me! 🐾</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
      <Text style={styles.sectionLbl}>{title}</Text>
      {children}
    </View>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.chipWrap}>{children}</View>
  );
}

function PrefChip({
  emoji,
  label,
  on,
  onToggle,
}: {
  emoji: string;
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      style={[styles.chip, on && styles.chipOn]}
    >
      <Text>
        <Text style={styles.chipEmoji}>{emoji}</Text>
        <Text style={styles.chipLabel}> {label}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: FF.cream },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: { fontSize: 28, fontWeight: "700", color: FF.dark },
  headerTitle: { fontSize: 17, fontWeight: "800", color: FF.dark },
  sectionLbl: {
    fontSize: 11,
    fontWeight: "800",
    color: FF.light,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: FF.border,
    backgroundColor: "#fff",
  },
  chipOn: {
    borderColor: FF.red,
    borderWidth: 2,
    backgroundColor: FF.redLight,
  },
  chipEmoji: { fontSize: 16 },
  chipLabel: { fontSize: 14, fontWeight: "700", color: FF.dark },
  priceRow: { flexDirection: "row", gap: 12 },
  priceTile: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: FF.border,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  priceTileOn: { backgroundColor: FF.red },
  priceText: { fontSize: 20, fontWeight: "900", color: FF.dark },
  priceTextOn: { color: "#fff" },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    backgroundColor: FF.cream,
  },
  showBtn: {
    backgroundColor: FF.red,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  showBtnText: { color: "#fff", fontSize: 17, fontWeight: "900" },
});
