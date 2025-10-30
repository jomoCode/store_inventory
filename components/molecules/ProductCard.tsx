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

export const ProductCard = ({
  item,
  index,
}: {
  item: Product;
  index: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 80,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.cardImageContainer}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardOverlay} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: THEME.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardImageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))",
  },
  cardContent: {
    padding: 12,
  },
  cardName: {
    color: THEME.text,
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },
  priceContainer: {
    backgroundColor: "rgba(47, 143, 110, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardPrice: {
    color: THEME.green,
    fontWeight: "800",
    fontSize: 16,
  },
});
