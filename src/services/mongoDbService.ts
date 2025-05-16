
import { IssueType } from '@/components/Report';
import { toast } from 'sonner';

// Fake API URL - in a real app, this would point to your backend server
// We'll mock the API behavior since we can't run a real backend in this environment
const API_URL = '/api';

export interface AnalysisResult {
  id?: string;
  code: string;
  score: number;
  issues: IssueType[];
  timestamp: Date;
}

// Store for demo purposes (simulates a database)
// In a real app, this would be handled by your Node.js backend
let mockDatabase: AnalysisResult[] = [];

/**
 * Mock API service to simulate backend API calls
 * In a real app, these would be actual fetch calls to your Node.js backend
 */
const mockAPI = {
  async post(endpoint: string, data: any): Promise<any> {
    console.log(`Mock API POST to ${endpoint}`, data);
    
    if (endpoint === '/analyses') {
      // Simulate saving data
      const id = Math.random().toString(36).substring(2, 15);
      const newItem = { ...data, id, timestamp: new Date() };
      mockDatabase.push(newItem);
      return { id };
    }
    
    return null;
  },
  
  async get(endpoint: string): Promise<any> {
    console.log(`Mock API GET to ${endpoint}`);
    
    if (endpoint === '/analyses') {
      // Simulate fetching all analyses
      return [...mockDatabase].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
    
    // For endpoints like '/analyses/:id'
    if (endpoint.startsWith('/analyses/')) {
      const id = endpoint.split('/').pop();
      return mockDatabase.find(item => item.id === id) || null;
    }
    
    return null;
  }
};

/**
 * Save analysis result to the backend
 */
export async function saveAnalysisResult(analysis: AnalysisResult): Promise<string | null> {
  try {
    // In a real app, this would be an actual API call to your Node.js server
    const response = await mockAPI.post('/analyses', analysis);
    
    if (response?.id) {
      toast.success("Analysis saved");
      return response.id;
    } else {
      throw new Error("Failed to save analysis");
    }
  } catch (error) {
    console.error("Error saving analysis:", error);
    toast.error("Failed to save analysis to database");
    return null;
  }
}

/**
 * Get analysis history from the backend
 */
export async function getAnalysisHistory(): Promise<AnalysisResult[]> {
  try {
    // In a real app, this would be an actual API call to your Node.js server
    const results = await mockAPI.get('/analyses');
    return results;
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    toast.error("Failed to fetch analysis history");
    return [];
  }
}

/**
 * Get a single analysis by ID from the backend
 */
export async function getAnalysisById(id: string): Promise<AnalysisResult | null> {
  try {
    // In a real app, this would be an actual API call to your Node.js server
    const result = await mockAPI.get(`/analyses/${id}`);
    return result;
  } catch (error) {
    console.error("Error fetching analysis:", error);
    toast.error("Failed to fetch analysis");
    return null;
  }
}
