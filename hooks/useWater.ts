import { useContext } from 'react';
import { WaterContext } from '@/context/WaterContext';
import { WaterContextValue } from '@/types/water';
/**
 * Hook to consume the water intake context.
 * Throws if used outside of a WaterProvider.
 */
export function useWater(): WaterContextValue {
  const context = useContext(WaterContext);
  if (context === undefined) {
    throw new Error('useWater must be used within a WaterProvider');
  }
  return context;
}