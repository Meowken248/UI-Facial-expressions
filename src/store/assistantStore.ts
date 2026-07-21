import { create } from 'zustand';
import type { AssistantState } from '../types/assistant';

interface AssistantStore {
  state: AssistantState;
  speed: number;
  battery: number;
  rangeKm: number;
  passengerWeight: number;
  maxWeight: number;
  selectedTripPurpose: string;
  setState: (s: AssistantState) => void;
  setSpeed: (v: number) => void;
  setBattery: (v: number) => void;
  setPassengerWeight: (v: number) => void;
  setSelectedTripPurpose: (id: string) => void;
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  state: 'carrying-friend',
  speed: 56,
  battery: 86,
  rangeKm: 120,
  passengerWeight: 120,
  maxWeight: 250,
  selectedTripPurpose: 'friend',
  setState: (s) => set({ state: s }),
  setSpeed: (v) => set({ speed: v }),
  setBattery: (v) => set({ battery: v }),
  setPassengerWeight: (v) => set({ passengerWeight: v }),
  setSelectedTripPurpose: (id) => set({ selectedTripPurpose: id }),
}));
