import { describe, it, expect, vi } from 'vitest';
import PDFExportService from './PDFExportService';
import type { SymptomResult } from '../types';

// Mock jsPDF
vi.mock('jspdf', () => {
  const jsPDFMock = vi.fn(() => ({
    setProperties: vi.fn(),
    internal: {
      pageSize: {
        getWidth: vi.fn(() => 210),
        getHeight: vi.fn(() => 297)
      }
    },
    setFillColor: vi.fn(),
    rect: vi.fn(),
    setTextColor: vi.fn(),
    setFontSize: vi.fn(),
    setFont: vi.fn(),
    text: vi.fn(),
    splitTextToSize: vi.fn((text: string) => [text]),
    setDrawColor: vi.fn(),
    line: vi.fn(),
    addPage: vi.fn(),
    setPage: vi.fn(),
    getNumberOfPages: vi.fn(() => 1),
    save: vi.fn()
  }));
  return { default: jsPDFMock };
});

describe('PDFExportService', () => {
  const dummyResult: SymptomResult = {
    summary: 'Summary text',
    possibleConditions: [
      { name: 'Common Cold', probability: 90, description: 'Viral infection', recommendations: [] }
    ],
    severity: 1,
    recommendations: ['Rest', 'Hydrate'],
    requiresAttention: false,
    disclaimer: 'Test disclaimer',
    diet: { recommendedFoods: ['Soup'], foodsToAvoid: ['Sugar'], hydration: 'Water' },
    medications: { recommended: ['Paracetamol'], supplements: ['Vitamin C'], precautions: 'None' }
  };

  it('should generate a PDF report without throwing errors', async () => {
    // Generate report
    await expect(PDFExportService.generateReport(dummyResult, 'I have a headache')).resolves.not.toThrow();
  });
});
