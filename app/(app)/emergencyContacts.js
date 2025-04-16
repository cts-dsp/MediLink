import React from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  StyleSheet,
} from "react-native";
import { useTheme, Card, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const emergencyContacts = [
  { name: "Emergency Services (Police, Fire, Ambulance)", number: "911" },
  { name: "Poison Control", number: "1-800-222-1222" },
  { name: "Suicide & Crisis Lifeline", number: "988" },
  { name: "FEMA Helpline", number: "1-800-621-3362" },
  { name: "National Domestic Violence Hotline", number: "1-800-799-7233" },
  { name: "Child Abuse Hotline", number: "1-800-422-4453" },
  { name: "Roadside Assistance (AAA)", number: "1-800-222-4357" },
];

const EmergencyContacts = () => {
  const { colors } = useTheme();

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.number, { color: colors.text }]}>
            {item.number}
          </Text>
        </View>
        <IconButton
          icon={() => (
            <Ionicons name="call-outline" size={24} color={colors.primary} />
          )}
          onPress={() => makeCall(item.number)}
        />
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  number: {
    fontSize: 14,
    fontWeight: "400",
  },
});
