import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DailyLog from '@/components/DailyLog';
import { Colors } from '@/constants/Colors';
/**
 * Today tab screen – displays today's water intake log entries
 * using the DailyLog component. The tab header already shows '📋 Today'.
 */
export default function TodayScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <DailyLog />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingVertical: 16,
  },
});