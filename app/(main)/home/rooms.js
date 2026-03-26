import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

// import de mon Context
import { AuthContext } from "../../../context/AuthContext";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // Destruction de Context
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    if (!userToken) {
      setIsLoading(false);
      router.replace("/");
      return;
    }

    const fetchRooms = async () => {
      try {
        setErrorMessage("");
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
        );

        const roomsData = Array.isArray(response.data)
          ? response.data
          : response.data.rooms || [];

        setRooms(roomsData);
      } catch (error) {
        setErrorMessage("Impossible de charger les annonces");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [router, userToken]);

  const renderRoom = ({ item }) => {
    const imageSource = item.photos?.[0]?.url || item.photo?.url || item.image?.url;

    return (
      <View style={styles.card}>
        {imageSource ? (
          <Image source={{ uri: imageSource }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>No image</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.roomTitle} numberOfLines={1}>
            {item.title || "Annonce"}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description || "Aucune description"}
          </Text>
          <Text style={styles.price}>
            {item.price ? `${item.price} € / nuit` : "Prix non disponible"}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF5A5F" />
        <Text style={styles.infoText}>Chargement des annonces...</Text>
      </View>
    );
  }

  if (!userToken) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Redirection...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item, index) => item._id || item.id || String(index)}
      contentContainerStyle={styles.listContent}
      renderItem={renderRoom}
      ListHeaderComponent={<Text style={styles.title}>Toutes les annonces</Text>}
      ListEmptyComponent={
        <Text style={styles.infoText}>Aucune annonce disponible</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  image: {
    width: "100%",
    height: 200,
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  imagePlaceholderText: {
    color: "#777777",
  },
  content: {
    padding: 16,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    color: "#666666",
    marginBottom: 12,
  },
  price: {
    color: "#FF5A5F",
    fontSize: 16,
    fontWeight: "600",
  },
  infoText: {
    marginTop: 12,
    color: "#555555",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
