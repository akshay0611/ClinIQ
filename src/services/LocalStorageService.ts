import { SymptomResult } from '../types';

// Key for storing symptom history in localStorage
const SYMPTOM_HISTORY_KEY = 'symptom_checker_history';
// Key for storing encryption key in sessionStorage
const ENCRYPTION_KEY_NAME = 'symptom_checker_encryption_key';

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
  private keyPromise: Promise<CryptoKey> | null = null;

  private async getEncryptionKey(): Promise<CryptoKey> {
    if (this.keyPromise) return this.keyPromise;

    this.keyPromise = (async () => {
      const storedKeyStr = localStorage.getItem(ENCRYPTION_KEY_NAME);
      if (storedKeyStr) {
        try {
          const rawKey = Uint8Array.from(atob(storedKeyStr), c => c.charCodeAt(0));
          return await window.crypto.subtle.importKey(
            'raw',
            rawKey,
            'AES-GCM',
            true,
            ['encrypt', 'decrypt']
          );
        } catch (e) {
          console.error('Failed to import key, generating a new one', e);
        }
      }

      const key = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );

      const rawKey = await window.crypto.subtle.exportKey('raw', key);
      const rawKeyStr = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
      localStorage.setItem(ENCRYPTION_KEY_NAME, rawKeyStr);
      
      // Clear old unreadable data
      localStorage.removeItem(SYMPTOM_HISTORY_KEY);

      return key;
    })();

    return this.keyPromise;
  }

  private async encrypt(text: string): Promise<string> {
    const key = await this.getEncryptionKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(text);
    
    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);
    
    return btoa(String.fromCharCode(...combined));
  }

  private async decrypt(encryptedText: string): Promise<string> {
    const key = await this.getEncryptionKey();
    const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  }

  /**
   * Save a symptom check to localStorage securely
   */
  async saveSymptomCheck(symptoms: string, result: SymptomResult): Promise<void> {
    try {
      const history = await this.getSymptomHistory();
      
      const newEntry: SymptomHistoryEntry = {
        id: this.generateId(),
        date: new Date().toISOString(),
        symptoms,
        result
      };
      
      history.unshift(newEntry);
      const limitedHistory = history.slice(0, MAX_HISTORY_ENTRIES);
      
      const encryptedData = await this.encrypt(JSON.stringify(limitedHistory));
      localStorage.setItem(SYMPTOM_HISTORY_KEY, encryptedData);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  /**
   * Get all symptom history entries securely
   */
  async getSymptomHistory(): Promise<SymptomHistoryEntry[]> {
    try {
      const encryptedJson = localStorage.getItem(SYMPTOM_HISTORY_KEY);
      if (!encryptedJson) {
        return [];
      }
      
      const historyJson = await this.decrypt(encryptedJson);
      return JSON.parse(historyJson) as SymptomHistoryEntry[];
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return [];
    }
  }
  
  /**
   * Get a specific symptom check by ID securely
   */
  async getSymptomCheckById(id: string): Promise<SymptomHistoryEntry | null> {
    try {
      const history = await this.getSymptomHistory();
      return history.find(entry => entry.id === id) || null;
    } catch (error) {
      console.error('Error retrieving entry by ID:', error);
      return null;
    }
  }
  
  /**
   * Delete a specific symptom check by ID securely
   */
  async deleteSymptomCheckById(id: string): Promise<boolean> {
    try {
      const history = await this.getSymptomHistory();
      const updatedHistory = history.filter(entry => entry.id !== id);
      
      if (updatedHistory.length < history.length) {
        const encryptedData = await this.encrypt(JSON.stringify(updatedHistory));
        localStorage.setItem(SYMPTOM_HISTORY_KEY, encryptedData);
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
  async clearSymptomHistory(): Promise<void> {
    try {
      localStorage.removeItem(SYMPTOM_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
  
  /**
   * Generate a simple unique ID for entries
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}

// Export a singleton instance
export default new LocalStorageService();