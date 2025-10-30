import { THEME } from "@/lib/color-constants";
import { Product } from "@/lib/types";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AdminRowProps = {
  item: Product;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
};

export const AdminRow = ({ item, index, onEdit, onDelete }: AdminRowProps) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.adminRow,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.adminImage} />
      <View style={styles.adminInfo}>
        <Text style={styles.adminName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.adminPrice}>{item.price}</Text>
      </View>

      <View style={styles.adminActions}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.actionBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.actionBtn, styles.deleteBtn]}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: "#fff" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  adminRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: THEME.card,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  adminImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 14,
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontWeight: "700",
    color: THEME.text,
    fontSize: 16,
    marginBottom: 4,
  },
  adminPrice: {
    color: THEME.green,
    fontWeight: "700",
    fontSize: 15,
  },
  adminActions: {
    flexDirection: "row",
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: THEME.green,
    marginLeft: 8,
  },
  deleteBtn: {
    backgroundColor: "#d9534f",
    borderColor: "#d9534f",
  },
  actionText: {
    color: THEME.green,
    fontWeight: "700",
    fontSize: 13,
  },
});
