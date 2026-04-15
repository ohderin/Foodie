import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SAMPLE_RESTAURANT } from "../src/data/sampleRestaurant";
import { FF } from "../src/theme/colors";

const ITEMS = [
  {
    badge: "🔥 Most Popular",
    name: "Box Combo",
    desc: "4 Chicken Fingers, 1 Cane's Sauce, Crinkle Cut Fries, Texas Toast, 22oz Drink",
    price: "$11.49",
  },
  {
    name: "3 Finger Combo",
    desc: "3 Chicken Fingers, 1 Cane's Sauce, Crinkle Cut Fries, Texas Toast, 22oz Drink",
    price: "$9.59",
  },
  {
    name: "Caniac Combo",
    desc: "6 Chicken Fingers, 2 Cane's Sauces, Crinkle Cut Fries, Coleslaw, Texas Toast, Large Drink",
    price: "$15.99",
  },
  {
    name: "Sandwich Combo",
    desc: "Chicken Finger Sandwich, Crinkle Cut Fries, 22oz Drink",
    price: "$10.79",
  },
  {
    name: "Kids Combo",
    desc: "2 Chicken Fingers, 1 Cane's Sauce, Crinkle Cut Fries, Kids Drink",
    price: "$6.49",
  },
];

const CATS = ["Combos", "TailGates", "Extras", "Drinks", "Kids"];

export default function MenuScreen() {
  const [cat, setCat] = useState("Combos");

  return (
      <View style={{ flex: 1, backgroundColor: FF.cream }}>
        <LinearGradient
          colors={["#8B1E2A", "#C62A38"]}
          style={styles.banner}
        >
          <Text style={styles.bannerName}>{SAMPLE_RESTAURANT.name}</Text>
          <Text style={styles.bannerMeta}>
            🟢 Open Now · {SAMPLE_RESTAURANT.closingNote} ·{" "}
            {SAMPLE_RESTAURANT.distanceMiles.toFixed(1)} mi
          </Text>
        </LinearGradient>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {CATS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setCat(c)}
              style={[styles.cat, cat === c && styles.catOn]}
            >
              <Text style={[styles.catText, cat === c && styles.catTextOn]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          {ITEMS.map((item, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.thumb}>
                <Text style={{ fontSize: 22 }}>🍗</Text>
              </View>
              <View style={{ flex: 1 }}>
                {item.badge ? (
                  <Text style={styles.badge}>{item.badge}</Text>
                ) : null}
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  banner: { padding: 20 },
  bannerName: { color: "#fff", fontSize: 22, fontWeight: "900" },
  bannerMeta: { color: "rgba(255,255,255,0.9)", marginTop: 6, fontSize: 13 },
  catRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 8, flexDirection: "row" },
  cat: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  catOn: { backgroundColor: FF.red },
  catText: { fontWeight: "700", color: FF.dark },
  catTextOn: { color: "#fff" },
  item: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: FF.border,
    marginBottom: 14,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: FF.red,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: { fontSize: 11, fontWeight: "800", color: FF.orange, marginBottom: 4 },
  itemName: { fontSize: 17, fontWeight: "900", color: FF.dark },
  itemDesc: { fontSize: 12, color: FF.med, marginTop: 4, lineHeight: 16 },
  price: { fontSize: 17, fontWeight: "900", color: FF.red, marginTop: 6 },
});
