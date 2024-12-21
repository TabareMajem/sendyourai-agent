import { create } from 'zustand';

interface AdminState {
  users: any[];
  payments: any[];
  apiKeys: any[];
  systemHealth: any;
  setUsers: (users: any[]) => void;
  setPayments: (payments: any[]) => void;
  setApiKeys: (apiKeys: any[]) => void;
  setSystemHealth: (health: any) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  payments: [],
  apiKeys: [],
  systemHealth: null,
  setUsers: (users) => set({ users }),
  setPayments: (payments) => set({ payments }),
  setApiKeys: (apiKeys) => set({ apiKeys }),
  setSystemHealth: (health) => set({ systemHealth: health })
}));