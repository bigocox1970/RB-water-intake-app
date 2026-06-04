import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
interface WaterProgressProps {
  currentMl: number;
  goalMl: number;
}
const MAX_FILL_HEIGHT = 180; // visual height of the fill bar in device units
/**
 * Visual water progress indicator.
 * Displays a glass with fill percentage, ml count, and an encouraging message when goal is reached.
 */
const WaterProgress: React.FC<WaterProgressProps> = ({ currentMl, goalMl }) => {
  const percentage = Math.min((currentMl / goalMl) * 100, 100);
  const fillAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const targetHeight = (percentage / 100) * MAX_FILL_HEIGHT;
    Animated.timing(fillAnim, {
      toValue: targetHeight,
      duration: 600,
      useNativeDriver: false, // height animation doesn't support native driver
    }).start();
  }, [currentMl, goalMl, percentage, fillAnim]);
  return (
    <View style={styles.container}>
      <View style={styles.glass}>
        {/* Top rim */}
        <View style={styles.rim} />
        {/* Fill area */}
        <View style={styles.fillArea}>
          <Animated.View
            style={[styles.fill, { height: fillAnim, backgroundColor: Colors.glassFill }]}
          />
        </View>
        {/* Bottom of glass */}
        <View style={styles.base} />
      </View>
      <View style={styles.info}>
        <Text style={styles.mlText}>
          {currentMl} / {goalMl} ml
        </Text>
        <Text style={styles.percentageText}>
          {Math.round(percentage)}%
        </Text>
      </View>
      {percentage >= 100 && (
        <Text style={styles.encouragement}>
          🎉 Great job! You reached your water goal today!
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  glass: {
    width: 100,
    alignItems: 'center',
  },
  rim: {
    width: 80,
    height: 12,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  fillArea: {
    width: 70,
    height: MAX_FILL_HEIGHT,
    backgroundColor: Colors.background,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: Colors.primary,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  fill: {
    width: '100%',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  base: {
    width: 80,
    height: 10,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  info: {
    marginTop: 12,
    alignItems: 'center',
  },
  mlText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  percentageText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  encouragement: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
    textAlign: 'center',
  },
});
export default WaterProgress;