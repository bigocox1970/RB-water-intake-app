import '@/lib/crypto-polyfill';
import React from 'react';
import { Stack } from 'expo-router';
import { WaterProvider } from '@/context/WaterContext';
/**
 * Root layout – applies the crypto polyfill for Hermes, wraps the app with
 * the WaterProvider, and configures the Stack navigator with emoji headers.
 */
export default function RootLayout() {
  return (
    <WaterProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#3b82f6' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: '💧 Water Tracker' }}
        />
        <Stack.Screen
          name="history"
          options={{ title: '📊 History' }}
        />
        <Stack.Screen
          name="settings"
          options={{ title: '⚙️ Settings' }}
        />
      </Stack>
    </WaterProvider>
  );
}