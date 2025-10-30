import { getProductsFromDB, initDB } from "@/lib/DB-helpers";
import { Product } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { HomeScreen } from "../components/templates/HomeScreen";
import { AdminScreen } from "../components/templates/AdminScreen";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [screen, setScreen] = useState("Home");

  useEffect(() => {
    (async () => {
      await initDB();
      await getProductsFromDB(setProducts);
    })();
  }, []);

  const navigation = {
    navigate: (screenName: string) => setScreen(screenName),
  };

  return (
    <View style={{ flex: 1 }}>
      {screen === "Home" ? (
        <HomeScreen navigation={navigation} products={products} />
      ) : (
        <AdminScreen products={products} setProducts={setProducts} />
      )}
    </View>
  );
}

export default App;
