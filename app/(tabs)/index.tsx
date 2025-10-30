import { useEffect, useState } from "react";
import { View } from "react-native";
import { HomeScreen } from "@/components/templates/HomeScreen";
import { initDB, getProductsFromDB } from "@/lib/DB-helpers";
import { Product } from "@/lib/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      await initDB();
      await getProductsFromDB(setProducts);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen products={products} />
    </View>
  );
}
