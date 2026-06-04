import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useWater } from '@/hooks/useWater';
import { WaterLog } from '@/types/water';
import { Colors } from '@/constants/Colors';
/**
 * Today's water intake log entries.
 * Each entry displays amount and time, with a remove button.
 * Empty state shows an encouraging message with a water emoji.
 */
const DailyLog: React.FC = () => {
  const { logs, removeLog } = useWater();
  const todayLogs = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return logs.filter((log) => {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0];
      return logDate === today;
    });
  }, [logs]);
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const renderItem = ({ item }: { item: WaterLog }) => (
    <View style={styles.entry}>
      <View style={styles.entryInfo}>
        <Text style={styles.amount}>{item.amountMl} ml</Text>
        <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeLog(item.id)}
        style={styles.removeButton}
        activeOpacity={0.7}
        accessibilityLabel="Delete log entry"
      >
        <Text style={styles.removeText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
  const listEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>💦</Text>
      <Text style={styles.emptyText}>No water logged yet today</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Log</Text>
      <FlatList
        data={todayLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={todayLogs.length === 0 ? styles.emptyList : undefined}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  entryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  amount: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  time: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 20,
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
export default DailyLog;