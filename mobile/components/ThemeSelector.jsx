import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useTheme, THEMES } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const ThemeSelector = ({ visible, onClose }) => {
  const { currentTheme, changeTheme, theme } = useTheme();

  const themeOptions = [
    { key: 'forest', name: 'Forest', icon: 'leaf', color: THEMES.forest.primary },
    { key: 'retro', name: 'Retro', icon: 'cafe', color: THEMES.retro.primary },
    { key: 'ocean', name: 'Ocean', icon: 'water', color: THEMES.ocean.primary },
    { key: 'blossom', name: 'Blossom', icon: 'flower', color: THEMES.blossom.primary },
  ];

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
    setTimeout(() => onClose(), 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Choose Theme
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.themeGrid}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.themeOption,
                  { 
                    backgroundColor: theme.background,
                    borderColor: currentTheme === option.key ? option.color : theme.border,
                    borderWidth: currentTheme === option.key ? 3 : 1,
                  }
                ]}
                onPress={() => handleThemeSelect(option.key)}
              >
                <View 
                  style={[
                    styles.iconContainer,
                    { backgroundColor: option.color }
                  ]}
                >
                  <Ionicons name={option.icon} size={32} color="#fff" />
                </View>
                <Text style={[styles.themeName, { color: theme.textPrimary }]}>
                  {option.name}
                </Text>
                {currentTheme === option.key && (
                  <View style={[styles.checkmark, { backgroundColor: option.color }]}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeOption: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
