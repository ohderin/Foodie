import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Restaurant } from "../data/sampleRestaurant";
import { FF } from "../theme/colors";

type Props = {
  restaurant: Restaurant;
  onSave: () => void;
  onMenu: () => void;
  onReviews: () => void;
  onDirections: () => void;
};

export function RestaurantCard({
  restaurant,
  onSave,
  onMenu,
  onReviews,
  onDirections,
}: Props) {
  const tx = useSharedValue(0);
  const rot = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      tx.value = e.translationX;
      rot.value = e.translationX / 25;
    })
    .onEnd(() => {
      tx.value = withSpring(0);
      rot.value = withSpring(0);
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { rotate: `${rot.value}deg` }],
  }));

  const price = "$".repeat(restaurant.priceLevel);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.cardOuter, animStyle]}>
        <LinearGradient
          colors={["#8B1E2A", "#C62A38", "#E8493A", "#F2824A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.photo}
        >
          <Text style={styles.photoText}>
            RAISING{"\n"}CANE'S
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.55)"]}
          style={styles.scrim}
          pointerEvents="none"
        />
        <View style={styles.topRight}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{price}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {restaurant.isOpen ? `🟢 Open · ${restaurant.closingNote}` : "Closed"}
            </Text>
          </View>
        </View>
        <View style={styles.sideBtns}>
          <SideBtn label="🤍" onPress={onSave} />
          <SideBtn label="🍴" onPress={onMenu} />
          <SideBtn label="💬" onPress={onReviews} />
          <SideBtn label="↗️" onPress={onDirections} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>★ {restaurant.rating.toFixed(2)}</Text>
            <Text style={styles.metaDim}> ({restaurant.reviewCount} reviews)</Text>
            <Text style={styles.metaDim}> · </Text>
            <Text style={styles.meta}>{restaurant.distanceMiles.toFixed(1)} mi away</Text>
          </View>
          <View style={styles.tags}>
            {restaurant.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.desc}>{restaurant.shortDescription}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

function SideBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.sideBtn} onPress={onPress}>
      <Text style={{ fontSize: 20 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 28,
    overflow: "hidden",
    minHeight: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  photoText: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 34,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  topRight: {
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "flex-end",
    gap: 8,
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  sideBtns: {
    position: "absolute",
    right: 8,
    top: "38%",
    gap: 12,
  },
  sideBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  metaRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 },
  meta: { color: "#fff", fontWeight: "600", fontSize: 14 },
  metaDim: { color: "rgba(255,255,255,0.85)", fontSize: 14 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  tag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  desc: { color: "rgba(255,255,255,0.92)", fontSize: 13, lineHeight: 18 },
});
