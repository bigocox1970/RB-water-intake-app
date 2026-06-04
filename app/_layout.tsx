import '@/lib/crypto-polyfill';
import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { WaterProvider } from '@/context/WaterContext';
/**
 * Root layout – applies the crypto polyfill for Hermes, wraps the app with
 * the WaterProvider, and configures the Tabs navigator with emoji headers.
 */
export default function RootLayout() {
  return (
    <WaterProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#90CAF9',
          tabBarStyle: { backgroundColor: 'white' },
          headerStyle: { backgroundColor: '#3b82f6' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '💧 Water Tracker',
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>💧</Text>,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: '📊 History',
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: '⚙️ Settings',
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>⚙️</Text>,
          }}
        />
      </Tabs>
    </WaterProvider>
  );
}