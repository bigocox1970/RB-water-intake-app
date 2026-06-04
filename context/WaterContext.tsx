import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WaterLog, WaterContextValue } from '@/types/water';
const STORAGE_KEY = 'water-data';
const DEFAULT_GOAL = 2000;
export const WaterContext = createContext<WaterContextValue | undefined>(
  undefined,
);
interface WaterProviderProps {
  children: React.ReactNode;
}
export const WaterProvider: React.FC<WaterProviderProps> = ({ children }) => {
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [goalMl, setGoalMl] = useState<number>(DEFAULT_GOAL);
  const isInitialLoad = useRef(true);
  /** Hydrate state from AsyncStorage on mount */
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          if (data.logs && Array.isArray(data.logs)) {
            setLogs(data.logs);
          }
          if (typeof data.goalMl === 'number') {
            setGoalMl(data.goalMl);
          }
        }
      } catch (error) {
        console.error('Failed to load water data from storage:', error);
      } finally {
        isInitialLoad.current = false;
      }
    })();
  }, []);
  /** Persist state whenever it changes (skips initial render before load) */
  useEffect(() => {
    if (isInitialLoad.current) return;
    (async () => {
      try {
        const data = JSON.stringify({ logs, goalMl });
        await AsyncStorage.setItem(STORAGE_KEY, data);
      } catch (error) {
        console.error('Failed to save water data:', error);
      }
    })();
  }, [logs, goalMl]);
  const addWater = useCallback((amountMl: number) => {
    const newLog: WaterLog = {
      id: crypto.randomUUID(),
      amountMl,
      timestamp: Date.now(),
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);
  const removeLog = useCallback((id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  }, []);
  const updateGoal = useCallback((ml: number) => {
    if (ml > 0) {
      setGoalMl(ml);
    }
  }, []);
  const value: WaterContextValue = {
    logs,
    goalMl,
    addWater,
    removeLog,
    updateGoal,
  };
  return (
    <WaterContext.Provider value={value}>{children}</WaterContext.Provider>
  );
};