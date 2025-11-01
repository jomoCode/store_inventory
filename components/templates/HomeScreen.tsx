import { ProductCard } from "@/components/molecules/ProductCard";
import { THEME } from "@/lib/color-constants";
import { Product } from "@/lib/types";
import { useCallback, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenProps = {
  products: Product[] | undefined;
  onRefresh: () => void;
};

export const HomeScreen = ({ products, onRefresh }: HomeScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>GreenDrop</Text>
          <Text style={styles.headerSubtitle}>Sustainable Shopping</Text>
        </View>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[THEME.green]}
            tintColor={THEME.green}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.cream,
    paddingTop: Platform.OS === "android" ? 24 : 0,
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
  listContainer: {
    padding: 12,
    paddingBottom: 24,
  },
});
