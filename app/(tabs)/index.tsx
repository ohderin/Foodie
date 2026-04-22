import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DirectionsSheet } from "../../src/components/DirectionsSheet";
import { SAMPLE_RESTAURANT } from "../../src/data/sampleRestaurant";
import { FF } from "../../src/theme/colors";

const FILTERS = ["Nearby", "Open Now", "$$$", "$$", "$"];
const RESTAURANT_BG_URI =
  "https://cdn.under30ceo.com/wp-content/uploads/2024/12/b67d70f9-3f97-4375-9bf9-e9ff1bb307c4.jpg";

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [filters, setFilters] = useState<boolean[]>(() => FILTERS.map((_, i) => i === 0));

  const toggleFilter = (index: number) => {
    setFilters((current) => {
      const next = [...current];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <ImageBackground source={{ uri: RESTAURANT_BG_URI }} style={styles.pageBackground} />
      <LinearGradient
        colors={["rgba(255,248,240,0.78)", "rgba(255,248,240,0.58)", "rgba(0,0,0,0.74)"]}
        style={styles.pageScrim}
      />

      <View style={styles.searchBar}>
        <View style={styles.glassFill} />
        <View style={styles.searchContent}>
          <Ionicons name="search" size={16} color={FF.light} />
          <Text style={styles.searchPh}>Search restaurants, dishes...</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((label, index) => (
          <Pressable
            key={label}
            onPress={() => toggleFilter(index)}
            style={[styles.filterPill, filters[index] && styles.filterPillActive]}
          >
            <Text style={[styles.filterText, filters[index] && styles.filterTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.cardArea}>
        <View style={styles.card}>
          <View style={styles.locationPill}>
            <Ionicons name="location-sharp" size={12} color="#E8FFF4" />
            <Text style={styles.locationPillText}>Nearby</Text>
          </View>

          <Pressable style={styles.floatAction} onPress={() => setDirectionsOpen(true)}>
            <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
          </Pressable>
          <Pressable style={[styles.floatAction, styles.floatActionSecondary]} onPress={() => router.push("/reviews")}>
            <Ionicons name="chatbubble-ellipses" size={19} color="#FFFFFF" />
          </Pressable>

          <View style={styles.cardBody}>
            <Text style={styles.nameText}>{SAMPLE_RESTAURANT.name}</Text>
            <Text style={styles.metaText}>LSU Area · {SAMPLE_RESTAURANT.distanceMiles.toFixed(1)} miles away</Text>
            <Text style={styles.metaText}>
              {SAMPLE_RESTAURANT.tags[0]}, {SAMPLE_RESTAURANT.tags[1]}
            </Text>
            <Text style={styles.ratingText}>
              ★ {SAMPLE_RESTAURANT.rating.toFixed(1)} ({SAMPLE_RESTAURANT.reviewCount} reviews)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionRow}>
        <CircleAction icon="refresh" color="#8E8E93" />
        <CircleAction icon="close" color="#FF5A5F" big />
        <CircleAction icon="heart" color="#73E35E" big onPress={() => router.navigate("/(tabs)/saved")} />
        <CircleAction icon="restaurant" color="#22B9FF" onPress={() => router.push("/menu")} />
      </View>

      <DirectionsSheet
        visible={directionsOpen}
        restaurant={SAMPLE_RESTAURANT}
        onClose={() => setDirectionsOpen(false)}
      />
    </View>
  );
}

function CircleAction({
  icon,
  color,
  big,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  big?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.actionButton, big && styles.actionButtonBig]}>
      <View style={styles.glassFill} />
      <Ionicons name={icon} size={big ? 31 : 24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: FF.cream,
    paddingHorizontal: 14,
  },
  pageBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  pageScrim: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    overflow: "hidden",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.52)",
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.14)",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchPh: {
    color: FF.light,
    fontSize: 15,
  },
  glassFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  filterRow: {
    gap: 8,
    paddingVertical: 2,
    paddingHorizontal: 1,
    alignItems: "center",
  },
  filterScroll: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 8,
  },
  filterPill: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: FF.border,
    backgroundColor: "#fff",
  },
  filterPillActive: {
    borderColor: FF.red,
    backgroundColor: FF.redLight,
  },
  filterText: {
    color: FF.dark,
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: FF.redDark,
  },
  cardArea: {
    flex: 1,
    marginTop: 8,
  },
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  locationPill: {
    position: "absolute",
    left: 16,
    top: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(8,137,104,0.85)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  locationPillText: {
    color: "#E8FFF4",
    fontWeight: "700",
    fontSize: 13,
  },
  floatAction: {
    position: "absolute",
    right: 16,
    bottom: 152,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.46)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
  },
  floatActionSecondary: {
    bottom: 98,
  },
  cardBody: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 44,
    textShadowColor: "rgba(0,0,0,0.72)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  metaText: {
    color: "rgba(255,255,255,0.96)",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 5,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 7,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 7,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingTop: 14,
    paddingBottom: 10,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.46)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  actionButtonBig: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
});
