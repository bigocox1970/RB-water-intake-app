import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import WaterProgress from '@/components/WaterProgress';
import QuickAdd from '@/components/QuickAdd';
import DailyLog from '@/components/DailyLog';
import { useWater } from '@/hooks/useWater';
import { Colors } from '@/constants/Colors';
/**
 * Home screen – displays today's total, a progress indicator, quick-add
 * buttons, and the log of today's entries.
 */
export default function HomeScreen() {
  const { logs, goalMl, addWater } = useWater();
  const todayTotalMl = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return logs
      .filter((log) => {
        const logDate = new Date(log.timestamp).toISOString().split('T')[0];
        return logDate === today;
      })
      .reduce((sum, log) => sum + log.amountMl, 0);
  }, [logs]);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>💧 Stay Hydrated</Text>
      <WaterProgress currentMl={todayTotalMl} goalMl={goalMl} />
      <QuickAdd onAdd={addWater} />
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
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
});