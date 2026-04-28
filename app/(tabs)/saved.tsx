import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../src/context/AppContext";
import { FF } from "../../src/theme/colors";

const DEFAULT_RESTAURANT_BG_URI =
  "https://cdn.under30ceo.com/wp-content/uploads/2024/12/b67d70f9-3f97-4375-9bf9-e9ff1bb307c4.jpg";

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { hearted, removeHeart } = useApp();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <Text style={styles.title}>Saved Places</Text>

      <FlatList
        data={hearted}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <ImageBackground
              source={{ uri: item.imageUrl ?? DEFAULT_RESTAURANT_BG_URI }}
              style={styles.card}
              imageStyle={styles.cardImage}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.85)"]}
                style={StyleSheet.absoluteFillObject}
              />

              <View style={styles.topRow}>
                <View style={styles.locationPill}>
                  <Ionicons name="location-sharp" size={10} color="#E8FFF4" />
                  <Text style={styles.locationText}>Nearby</Text>
                </View>
                <Pressable onPress={() => removeHeart(item.id)} style={styles.removeButton}>
                  <Ionicons name="heart" size={15} color="#FFFFFF" />
                </Pressable>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemMeta} numberOfLines={1}>
                  {(item.distanceMiles ?? 0).toFixed(1)} mi · {item.tags?.[0] ?? "Local"}
                </Text>
                <Text style={styles.itemMeta} numberOfLines={1}>
                  {item.isOpen ? "Open Now" : "Closed"} · {item.closingNote}
                </Text>
                <Text style={styles.ratingText} numberOfLines={1}>
                  ★ {item.rating.toFixed(1)} ({item.reviewCount})
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.icon}>🐾</Text>
            <Text style={styles.emptyTitle}>Nothing saved yet!</Text>
            <Text style={styles.emptyDesc}>
              Tap the heart or swipe right on any restaurant card to save it here for later.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: FF.cream, paddingHorizontal: 14 },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: FF.dark,
    marginBottom: 14,
    textAlign: "left",
    paddingHorizontal: 2,
  },
  listContent: { paddingBottom: 20 },
  gridRow: { justifyContent: "space-between", marginBottom: 10 },
  cardWrap: { width: "48.5%" },
  card: { height: 220, borderRadius: 20, overflow: "hidden", justifyContent: "space-between" },
  cardImage: { borderRadius: 20 },
  topRow: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "rgba(10,26,20,0.36)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  locationText: { color: "#E8FFF4", fontSize: 10, fontWeight: "700" },
  removeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(228,59,90,0.92)",
  },
  cardBody: { paddingHorizontal: 10, paddingBottom: 10 },
  itemName: { color: "#fff", fontSize: 16, fontWeight: "900" },
  itemMeta: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 11,
    marginTop: 2,
  },
  ratingText: {
    color: "rgba(255,255,255,0.96)",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
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
