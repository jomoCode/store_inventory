import { useEffect, useState } from "react";
import { View } from "react-native";

import { HomeScreen } from "@/components/templates/HomeScreen";
import { getProductsFromDB, initDB } from "@/lib/DB-helpers";
import { Product } from "@/lib/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      await initDB();
      await getProductsFromDB(setProducts);
    }

    getProducts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen products={products} />
    </View>
  );
}
