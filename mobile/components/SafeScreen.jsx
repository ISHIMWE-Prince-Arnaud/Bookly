import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: insets.bottom,
      }}>
      {children}
    </View>
  );
};

export default SafeScreen;
