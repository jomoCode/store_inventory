import { useEffect, useState } from "react";
import { View } from "react-native";

import { HomeScreen } from "@/components/templates/HomeScreen";
import { getProductsFromDB, initDB } from "@/lib/DB-helpers";
import { Product } from "@/lib/types";

const getProducts = async () => {
  await initDB();
  const products = await getProductsFromDB();
  return products;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    const awaitProducts = async () => {
      const productRows = await getProducts();
      setProducts(productRows);
    };
    awaitProducts();
  }, []);

  const awaitProducts = async () => {
    const productRows = await getProducts();
    setProducts(productRows);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen products={products} onRefresh={awaitProducts} />
    </View>
  );
}
