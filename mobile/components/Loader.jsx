import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Loader({ size = "large" }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}>
      <ActivityIndicator size={size} color={theme.primary} />
    </View>
  );
}
