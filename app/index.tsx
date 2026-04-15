import { Redirect } from "expo-router";
import { useApp } from "../src/context/AppContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FF } from "../src/theme/colors";

export default function Index() {
  const { ready, hasCompletedOnboarding } = useApp();

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={FF.red} />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding/splash" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: FF.cream },
});
