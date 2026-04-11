import { Deal, SalesPerson, Team, Activity, Notification } from '../data/dummyData';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  getTeams: async (): Promise<Team[]> => {
    const response = await fetch(`${API_BASE_URL}/teams`);
    return response.json();
  },
  
  getSalespeople: async (): Promise<SalesPerson[]> => {
    const response = await fetch(`${API_BASE_URL}/salespeople`);
    return response.json();
  },
  
  getDeals: async (): Promise<Deal[]> => {
    const response = await fetch(`${API_BASE_URL}/deals`);
    return response.json();
  },
  
  getDeal: async (id: string): Promise<Deal> => {
    const response = await fetch(`${API_BASE_URL}/deals/${id}`);
    return response.json();
  },
  
  updateDeal: async (id: string, data: Partial<Deal>): Promise<Deal> => {
    const response = await fetch(`${API_BASE_URL}/deals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  createDeal: async (data: Partial<Deal>): Promise<Deal> => {
    const response = await fetch(`${API_BASE_URL}/deals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  getActivities: async (): Promise<Activity[]> => {
    const response = await fetch(`${API_BASE_URL}/activities`);
    return response.json();
  },
  
  getNotifications: async (): Promise<Notification[]> => {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    return response.json();
  },
};
