import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Activity, Info } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to meters
    if (w > 0 && h > 0) {
      setBmi(w / (h * h));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 24.9) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmi < 29.9) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obesity', color: 'text-red-500' };
  };

  return (
    <Card className="p-6 h-full border-t-4 border-t-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <Activity className="mr-2 text-blue-500" /> BMI Calculator
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <Button onClick={calculateBMI} fullWidth className="mt-2">
          Calculate BMI
        </Button>

        {bmi !== null && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Your BMI</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white my-1">
              {bmi.toFixed(1)}
            </p>
            <p className={`font-medium ${getBMICategory(bmi).color}`}>
              {getBMICategory(bmi).category}
            </p>
          </div>
        )}
        
        <div className="flex items-start text-xs text-gray-500 dark:text-gray-400 mt-4">
          <Info className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
          <p>BMI is a useful measure of overweight and obesity. It is calculated from your height and weight.</p>
        </div>
      </div>
    </Card>
  );
};

export default BMICalculator;
