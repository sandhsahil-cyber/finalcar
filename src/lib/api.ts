import { Deal, SalesPerson, Team, Activity, Notification, deals as initialDeals, salespeople, teams, activities, notifications } from '../data/dummyData';

// Simulated latency to make it feel like a real API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DEALS_STORAGE_KEY = 'finalcar_mock_deals';

// Initialize data from localStorage or fallback to dummyData
const getLocalDeals = (): Deal[] => {
  try {
    const stored = localStorage.getItem(DEALS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse deals from localStorage", e);
  }
  // Initialize with initialDeals if not present
  localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(initialDeals));
  return [...initialDeals];
};

const saveLocalDeals = (deals: Deal[]) => {
  localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
};

export const api = {
  getTeams: async (): Promise<Team[]> => {
    await delay(300);
    return teams;
  },
  
  getSalespeople: async (): Promise<SalesPerson[]> => {
    await delay(300);
    return salespeople;
  },
  
  getDeals: async (): Promise<Deal[]> => {
    await delay(400);
    return getLocalDeals();
  },
  
  getDeal: async (id: string): Promise<Deal> => {
    await delay(200);
    const localDeals = getLocalDeals();
    const deal = localDeals.find(d => d.id === id);
    if (!deal) throw new Error("Deal not found");
    return deal;
  },
  
  updateDeal: async (id: string, data: Partial<Deal>): Promise<Deal> => {
    await delay(500);
    const localDeals = getLocalDeals();
    const index = localDeals.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Deal not found");
    
    localDeals[index] = { ...localDeals[index], ...data };
    saveLocalDeals(localDeals);
    return localDeals[index];
  },
  
  createDeal: async (data: Partial<Deal>): Promise<Deal> => {
    await delay(500);
    const localDeals = getLocalDeals();
    const newDeal = { ...data, id: `D-${Date.now()}` } as Deal;
    const updatedDeals = [newDeal, ...localDeals];
    saveLocalDeals(updatedDeals);
    return newDeal;
  },
  
  getActivities: async (): Promise<Activity[]> => {
    await delay(300);
    return activities;
  },
  
  getNotifications: async (): Promise<Notification[]> => {
    await delay(300);
    return notifications;
  },
};
