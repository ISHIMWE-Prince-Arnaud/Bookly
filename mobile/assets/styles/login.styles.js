import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createStyles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.background,
    padding: 20,
    justifyContent: "center",
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: theme.background,
  },
  topIllustration: {
    alignItems: "center",
    width: "100%",
  },
  illustrationImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  card: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: theme.border,
    marginTop: -24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: theme.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: theme.textDark,
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: theme.textSecondary,
    marginRight: 5,
  },
  link: {
    color: theme.primary,
    fontWeight: "600",
  },
});