import '@/lib/crypto-polyfill'; // first: make crypto.randomUUID() work on native Hermes (missing in Expo Go)
import '@/lib/_devErrorOverlay'; // then: install web error surface before anything can throw
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#1a1a1a',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}
