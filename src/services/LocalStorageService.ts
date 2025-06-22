import { SymptomResult } from '../types';

// Key for storing symptom history in localStorage
const SYMPTOM_HISTORY_KEY = 'symptom_checker_history';

// Maximum number of entries to store
const MAX_HISTORY_ENTRIES = 10;

// Structure to represent a saved symptom check
export interface SymptomHistoryEntry {
  id: string;
  date: string; // ISO string format
  symptoms: string;
  result: SymptomResult;
}

class LocalStorageService {
  /**
   * Save a symptom check to localStorage
   */
  saveSymptomCheck(symptoms: string, result: SymptomResult): void {
    try {
      // Get current history
      const history = this.getSymptomHistory();
      
      // Create new entry with unique ID
      const newEntry: SymptomHistoryEntry = {
        id: this.generateId(),
        date: new Date().toISOString(),
        symptoms,
        result
      };
      
      // Add new entry to the beginning of the array (most recent first)
      history.unshift(newEntry);
      
      // Limit to MAX_HISTORY_ENTRIES
      const limitedHistory = history.slice(0, MAX_HISTORY_ENTRIES);
      
      // Save back to localStorage
      localStorage.setItem(SYMPTOM_HISTORY_KEY, JSON.stringify(limitedHistory));
      
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Fail silently - localStorage functionality is non-critical
    }
  }
  
  /**
   * Get all symptom history entries
   */
  getSymptomHistory(): SymptomHistoryEntry[] {
    try {
      const historyJson = localStorage.getItem(SYMPTOM_HISTORY_KEY);
      if (!historyJson) {
        return [];
      }
      
      return JSON.parse(historyJson) as SymptomHistoryEntry[];
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return [];
    }
  }
  
  /**
   * Get a specific symptom check by ID
   */
  getSymptomCheckById(id: string): SymptomHistoryEntry | null {
    try {
      const history = this.getSymptomHistory();
      return history.find(entry => entry.id === id) || null;
    } catch (error) {
      console.error('Error retrieving entry by ID:', error);
      return null;
    }
  }
  
  /**
   * Delete a specific symptom check by ID
   */
  deleteSymptomCheckById(id: string): boolean {
    try {
      const history = this.getSymptomHistory();
      const updatedHistory = history.filter(entry => entry.id !== id);
      
      // Only update if an item was actually removed
      if (updatedHistory.length < history.length) {
        localStorage.setItem(SYMPTOM_HISTORY_KEY, JSON.stringify(updatedHistory));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  }
  
  /**
   * Clear all symptom history
   */
  clearSymptomHistory(): void {
    try {
      localStorage.removeItem(SYMPTOM_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
  
  /**
   * Generate a simple unique ID for entries
   * This is a simple implementation - for production, consider using a more robust ID generator
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}

// Export a singleton instance
export default new LocalStorageService();