import { View, Text, StyleSheet } from "react-native";

export default function Map() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
