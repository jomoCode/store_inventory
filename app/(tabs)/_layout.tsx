import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2F8F6E",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#FFF7EA",
          borderTopWidth: 0,
          elevation: 4,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? "user-circle" : "user-circle-o"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
