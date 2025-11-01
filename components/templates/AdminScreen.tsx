import { AdminRow } from "@/components/molecules/AdminRow";
import { THEME } from "@/lib/color-constants";
import {
  deleteProduct,
  getProductsFromDB,
  insertProduct,
  updateProduct,
} from "@/lib/DB-helpers";
import { makeId } from "@/lib/helpers";
import { Product } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageInputField } from "../atoms/ImageInput";

type AdminScreenProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const AdminScreen = ({ products, setProducts }: AdminScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const modalAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(modalAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 8,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  function openAdd() {
    setEditingProduct(null);
    setNameInput("");
    setPriceInput("");
    setImageInput("");
    setModalVisible(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setNameInput(product.name);
    setPriceInput(product.price);
    setImageInput(product.image);
    setModalVisible(true);
  }

  async function save() {
    if (!nameInput.trim()) {
      Alert.alert("Name required", "Please enter a product name");
      return;
    }

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: nameInput,
        price: priceInput,
        image: imageInput,
      };
      await updateProduct(
        updated,
        async () => await getProductsFromDB(setProducts)
      );
    } else {
      const newProduct: Product = {
        id: makeId(),
        name: nameInput,
        price: priceInput || "₦0",
        image:
          imageInput ||
          "https://images.unsplash.com/photo-1582719478250-0b6c6f6b8d91?auto=format&fit=crop&w=800&q=60",
      };
      await insertProduct(
        newProduct,
        async () => await getProductsFromDB(setProducts)
      );
    }

    setModalVisible(false);
  }

  function confirmDelete(productId: string) {
    Alert.alert(
      "Delete product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(
              productId,
              async () => await getProductsFromDB(setProducts)
            );
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerAdmin}>
        <View>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <Text style={styles.headerSubtitle}>{products.length} Products</Text>
        </View>
        <TouchableOpacity
          onPress={openAdd}
          style={styles.addButton}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <AdminRow
            item={item}
            index={index}
            onEdit={() => openEdit(item)}
            onDelete={() => confirmDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.adminListContainer}
      />

      <Modal visible={modalVisible} animationType="none" transparent>
        <Animated.View
          style={[
            styles.modalBackdrop,
            {
              opacity: modalAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <Animated.View
            style={[
              styles.modalCard,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.modalTitle}>
              {editingProduct ? "Edit Product" : "New Product"}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Product Name</Text>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                placeholder="Enter product name"
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                value={priceInput}
                onChangeText={setPriceInput}
                placeholder="₦1,200"
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>

            <ImageInputField
              imageInput={imageInput}
              setImageInput={setImageInput}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalBtn, styles.modalCancel]}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={save}
                style={[styles.modalBtn, styles.modalSave]}
                activeOpacity={0.7}
              >
                <Text style={styles.modalSaveText}>
                  {editingProduct ? "Save Changes" : "Add Product"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
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
  adminListContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  addButton: {
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
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  headerAdmin: {
    padding: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.cream,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(47, 143, 110, 0.1)",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    color: THEME.darkGreen,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: THEME.text,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 10,
  },
  modalCancel: {
    backgroundColor: "#f0f0f0",
  },
  modalCancelText: {
    color: THEME.text,
    fontWeight: "600",
    fontSize: 15,
  },
  modalSave: {
    backgroundColor: THEME.green,
    shadowColor: THEME.green,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  modalSaveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
