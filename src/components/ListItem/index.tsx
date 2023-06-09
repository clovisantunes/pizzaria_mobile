import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface itemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
}
export function ListItem({data}:itemProps) {
  return (
    <View style={styles.container}>
      <Text>Item</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
