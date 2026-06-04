export interface WaterLog {
  id: string;
  amountMl: number;
  timestamp: number; // milliseconds
}
export interface DailyTotal {
  date: string; // YYYY-MM-DD
  totalMl: number;
  logs: WaterLog[];
}
export interface WaterState {
  logs: WaterLog[];
  goalMl: number;
}
export interface WaterContextValue extends WaterState {
  addWater: (amountMl: number) => void;
  removeLog: (id: string) => void;
  updateGoal: (ml: number) => void;
}