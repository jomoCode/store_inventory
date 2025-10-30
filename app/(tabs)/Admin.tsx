import { AdminScreen } from "@/components/templates/AdminScreen";
import { getProductsFromDB, initDB } from "@/lib/DB-helpers";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      await initDB();
      await getProductsFromDB(setProducts);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AdminScreen products={products} setProducts={setProducts} />
    </View>
  );
}
