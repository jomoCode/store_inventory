import { AdminScreen } from "@/components/templates/AdminScreen";
import { getProductsFromDB, initDB } from "@/lib/DB-helpers";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]|undefined>([]);

  useEffect(() => {
    (async () => {
      await initDB();
      const productFromDb = await getProductsFromDB();
      setProducts(productFromDb);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AdminScreen products={products} setProducts={setProducts} />
    </View>
  );
}
