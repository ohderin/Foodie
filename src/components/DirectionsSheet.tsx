import * as Linking from "expo-linking";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import { Restaurant } from "../data/sampleRestaurant";
import { FF } from "../theme/colors";

type Props = {
  visible: boolean;
  restaurant: Restaurant;
  onClose: () => void;
};

export function DirectionsSheet({ visible, restaurant, onClose }: Props) {
  const insets = useSafeAreaInsets();

  const openAppleMaps = () => {
    const q = encodeURIComponent(restaurant.address);
    Linking.openURL(`maps://?daddr=${q}`);
    onClose();
  };

  const openGoogleMaps = () => {
    const q = encodeURIComponent(restaurant.address);
    Linking.openURL(`comgooglemaps://?daddr=${q}`).catch(() => {
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${q}`);
    });
    onClose();
  };

  const openWaze = () => {
    const q = encodeURIComponent(restaurant.address);
    Linking.openURL(`waze://?navigate=yes&q=${q}`).catch(() => {});
    onClose();
  };

  const copyAddress = async () => {
    await Clipboard.setStringAsync(restaurant.address);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>Get Directions</Text>
          <Text style={styles.sub}>
            {restaurant.name} · {restaurant.address} · {restaurant.distanceMiles.toFixed(1)} mi
          </Text>
          <ScrollView style={styles.list}>
            <Row
              icon="🗺️"
              title="Apple Maps"
              subtitle="Open in Maps"
              onPress={openAppleMaps}
            />
            <Row
              icon="🗺️"
              title="Google Maps"
              subtitle="Open in Google Maps"
              onPress={openGoogleMaps}
            />
            <Row icon="🧭" title="Waze" subtitle="Open in Waze" onPress={openWaze} />
            <Row
              icon="📋"
              title="Copy Address"
              subtitle={restaurant.address}
              onPress={copyAddress}
            />
          </ScrollView>
          <Pressable style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function Row({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(26,18,8,0.48)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    maxHeight: "70%",
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
    color: FF.dark,
  },
  sub: {
    fontSize: 12,
    color: FF.med,
    textAlign: "center",
    marginBottom: 12,
  },
  list: { maxHeight: 320 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: FF.border,
  },
  rowIcon: { fontSize: 22, marginRight: 12 },
  rowTitle: { fontSize: 16, fontWeight: "600", color: FF.dark },
  rowSub: { fontSize: 13, color: FF.med },
  cancel: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: { fontSize: 16, fontWeight: "600", color: FF.red },
});
