import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ImageInputFieldProps = {
  imageInput: string;
  setImageInput: (text: string) => void;
};

export const ImageInputField = ({
  imageInput,
  setImageInput,
}: ImageInputFieldProps) => {
  const handleIconPress = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageInput(uri);
      console.log("Selected image URI:", uri);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Image URL (Optional)</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={imageInput}
          onChangeText={setImageInput}
          placeholder="https://..."
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleIconPress} style={styles.iconButton}>
          <Ionicons name="image-outline" size={22} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  iconButton: {
    paddingLeft: 8,
  },
});
