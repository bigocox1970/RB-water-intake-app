import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useWater } from '@/hooks/useWater';
import { Colors } from '@/constants/Colors';
interface DaySummary {
  date: string;   // YYYY-MM-DD
  totalMl: number;
}
/**
 * History screen – displays the last 7 days of water intake, grouped by date.
 * Each day shows the total ml and a simple progress bar relative to the daily goal.
 */
export default function HistoryScreen() {
  const { logs, goalMl } = useWater();
  // Build an array of the last 7 days (including today) and compute totals
  const last7Days = useMemo<DaySummary[]>(() => {
    const summaries: DaySummary[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const totalMl = logs
        .filter((log) => {
          const logDate = new Date(log.timestamp).toISOString().split('T')[0];
          return logDate === dateStr;
        })
        .reduce((sum, log) => sum + log.amountMl, 0);
      summaries.push({ date: dateStr, totalMl });
    }
    return summaries;
  }, [logs]);
  const formatDateLabel = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  const renderDayItem = ({ item }: { item: DaySummary }) => {
    const percentage = Math.min((item.totalMl / goalMl) * 100, 100);
    return (
      <View style={styles.dayContainer}>
        <View style={styles.dayHeader}>
          <Text style={styles.dateLabel}>{formatDateLabel(item.date)}</Text>
          <Text style={styles.totalMl}>{item.totalMl} ml</Text>
        </View>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: `${percentage}%`,
                backgroundColor: percentage >= 100 ? Colors.success : Colors.primary,
              },
            ]}
          />
        </View>
        <Text style={styles.percentageText}>{Math.round(percentage)}% of goal</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={last7Days}
      keyExtractor={(item) => item.date}
      renderItem={renderDayItem}
      contentContainerStyle={styles.listContent}
      style={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dayContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  totalMl: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  barBackground: {
    height: 12,
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
    minWidth: 4,
  },
  percentageText: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  separator: {
    height: 12,
  },
});