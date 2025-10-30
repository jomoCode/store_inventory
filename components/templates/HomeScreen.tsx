import { ProductCard } from "@/components/molecules/ProductCard";
import { THEME } from "@/lib/color-constants";
import { Product } from "@/lib/types";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenprops = { navigation: any; products: Product[] };

export const HomeScreen = ({ navigation, products }: HomeScreenprops) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>GreenDrop</Text>
          <Text style={styles.headerSubtitle}>Sustainable Shopping</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Admin")}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Text style={styles.headerButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safe: {
    flex: 1,
    backgroundColor: THEME.cream,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.cream,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: THEME.darkGreen,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.green,
    marginTop: 2,
    fontWeight: "500",
  },
  headerButton: {
    backgroundColor: THEME.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: THEME.green,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 24,
  },
});
