import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { Colors } from '@/constants/Colors';
interface QuickAddProps {
  onAdd: (amountMl: number) => void;
}
const PRESETS = [
  { label: 'Glass', amount: 250, emoji: '💧' },
  { label: 'Bottle', amount: 500, emoji: '🥤' },
  { label: 'Large', amount: 750, emoji: '🫗' },
] as const;
/**
 * Row of quick-add buttons for common water amounts plus a custom amount input.
 * Calls onAdd(amount) when a preset is tapped or custom amount confirmed.
 */
const QuickAdd: React.FC<QuickAddProps> = ({ onAdd }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const handleCustomConfirm = () => {
    const amount = parseInt(customAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      onAdd(amount);
      setCustomAmount('');
      setShowCustom(false);
      Keyboard.dismiss();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Water</Text>
      <View style={styles.presetsRow}>
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset.amount}
            style={styles.presetButton}
            onPress={() => onAdd(preset.amount)}
            activeOpacity={0.7}
          >
            <Text style={styles.presetEmoji}>{preset.emoji}</Text>
            <Text style={styles.presetLabel}>{preset.label}</Text>
            <Text style={styles.presetAmount}>{preset.amount}ml</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Custom amount toggle / input */}
      {!showCustom ? (
        <TouchableOpacity
          style={styles.customToggle}
          onPress={() => setShowCustom(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.customToggleText}>✏️ Custom amount</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.customRow}>
          <TextInput
            style={styles.customInput}
            value={customAmount}
            onChangeText={setCustomAmount}
            placeholder="ml"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="number-pad"
            maxLength={5}
            returnKeyType="done"
            onSubmitEditing={handleCustomConfirm}
          />
          <TouchableOpacity
            style={styles.customConfirm}
            onPress={handleCustomConfirm}
            activeOpacity={0.7}
          >
            <Text style={styles.customConfirmText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customCancel}
            onPress={() => {
              setShowCustom(false);
              setCustomAmount('');
              Keyboard.dismiss();
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.customCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  presetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  presetButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  presetEmoji: {
    fontSize: 30,
    marginBottom: 4,
  },
  presetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  presetAmount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  customToggle: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
  },
  customToggleText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.primaryDark,
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  customInput: {
    width: 80,
    height: 44,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  customConfirm: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  customConfirmText: {
    color: Colors.surface,
    fontWeight: '600',
    fontSize: 15,
  },
  customCancel: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  customCancelText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
export default QuickAdd;