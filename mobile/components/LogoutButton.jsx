import { Text, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "../store/authStore";
import { createStyles } from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useMemo } from "react";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={theme.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}