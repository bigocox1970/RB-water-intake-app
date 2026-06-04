import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useWater } from '@/hooks/useWater';
import { Colors } from '@/constants/Colors';
/**
 * Settings screen – allows the user to view and update their daily water goal.
 */
export default function SettingsScreen() {
  const { goalMl, updateGoal } = useWater();
  const [inputValue, setInputValue] = useState(goalMl.toString());
  const [message, setMessage] = useState<string | null>(null);
  const handleSave = () => {
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed) && parsed > 0) {
      updateGoal(parsed);
      setMessage('✅ Goal updated!');
      Keyboard.dismiss();
      setTimeout(() => setMessage(null), 2000);
    } else {
      setMessage('❌ Please enter a valid positive number');
      setTimeout(() => setMessage(null), 3000);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>⚙️ Daily Goal</Text>
      <Text style={styles.currentGoal}>
        Current goal: {goalMl} ml
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Enter new goal (ml)"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="number-pad"
          maxLength={5}
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      {message && (
        <Text
          style={[
            styles.message,
            message.startsWith('✅') ? styles.successMessage : styles.errorMessage,
          ]}
        >
          {message}
        </Text>
      )}
      <Text style={styles.tip}>
        💡 Health experts often recommend around 2000–3000 ml per day, but individual needs vary.
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  currentGoal: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    fontSize: 17,
    color: Colors.textPrimary,
    marginRight: 12,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  saveButtonText: {
    color: Colors.surface,
    fontWeight: '700',
    fontSize: 16,
  },
  message: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  successMessage: {
    color: Colors.success,
  },
  errorMessage: {
    color: Colors.error,
  },
  tip: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});