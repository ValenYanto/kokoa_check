import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Rule, type SymptomInput } from './data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate CF for a single symptom
export function calculateCF(expertCF: number, userCF: number): number {
  return expertCF * userCF;
}

// Combine multiple CFs for a disease
export function combineCFs(cfList: number[]): number {
  if (!cfList.length) return 0;
  
  let combined = cfList[0];
  for (let i = 1; i < cfList.length; i++) {
    combined = combined + cfList[i] * (1 - combined);
  }
  
  return combined;
}

// Calculate diagnostic results based on user inputs
export function calculateDiagnosticResults(
  rules: Record<string, Rule[]>,
  userInputs: SymptomInput[],
  diseaseNames: Record<string, string>
) {
  const results = Object.entries(rules).map(([diseaseId, diseaseRules]) => {
    const cfList: number[] = [];
    
    for (const rule of diseaseRules) {
      // Find if user provided input for this symptom
      const userInput = userInputs.find(input => input.symptomId === rule.symptomId);
      
      // If user has input for this symptom, calculate CF
      if (userInput) {
        const cf = calculateCF(rule.certaintyFactor, userInput.userCertainty);
        cfList.push(cf);
      }
    }
    
    // Calculate combined CF for this disease
    const certaintyFactor = combineCFs(cfList);
    
    return {
      diseaseId,
      diseaseName: diseaseNames[diseaseId],
      certaintyFactor,
      rules: diseaseRules
    };
  });
  
  // Sort results by certainty factor in descending order
  return results.sort((a, b) => b.certaintyFactor - a.certaintyFactor);
}

// Format percentage from decimal
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

// Get color based on certainty factor
export function getCertaintyColor(cf: number): string {
  if (cf >= 0.8) return 'text-red-600 dark:text-red-400';
  if (cf >= 0.6) return 'text-orange-600 dark:text-orange-400';
  if (cf >= 0.4) return 'text-yellow-600 dark:text-yellow-400';
  if (cf >= 0.2) return 'text-blue-600 dark:text-blue-400';
  return 'text-gray-600 dark:text-gray-400';
}

// Save diagnostic history to local storage
export function saveDiagnosticHistory(date: Date, userInputs: SymptomInput[], results: any[]) {
  const history = JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
  
  history.push({
    id: Date.now().toString(),
    date: date.toISOString(),
    userInputs,
    results: results.slice(0, 3) // Save only top 3 results
  });
  
  // Keep only the last 10 diagnoses
  const trimmedHistory = history.slice(-10);
  
  localStorage.setItem('diagnosticHistory', JSON.stringify(trimmedHistory));
}

// Get diagnostic history from local storage
export function getDiagnosticHistory() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
}

// Clear diagnostic history
export function clearDiagnosticHistory() {
  localStorage.removeItem('diagnosticHistory');
}