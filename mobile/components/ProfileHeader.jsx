import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import { createStyles } from "../assets/styles/profile.styles";
import { formatMemberSince } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { useMemo } from "react";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profilePic }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>
          🗓️ Joined {formatMemberSince(user.createdAt)}
        </Text>
      </View>
    </View>
  );
}
