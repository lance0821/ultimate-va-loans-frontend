import {
  calculateEstimatedClosingCosts,
  calculateDTI,
  validateNumericInput,
  CLOSING_COSTS,
  DTI_GUIDELINES,
  PRE_APPROVAL_CHECKLIST,
  INPUT_LIMITS,
} from '../calculator-data';

describe('calculator-data', () => {
  describe('validateNumericInput', () => {
    it('validates purchase price correctly', () => {
      expect(validateNumericInput(500000, 'purchasePrice')).toEqual({ isValid: true });
      expect(validateNumericInput(500, 'purchasePrice')).toEqual({
        isValid: false,
        message: 'Purchase price must be between $1,000 and $10,000,000',
      });
      expect(validateNumericInput(-1000, 'purchasePrice')).toEqual({
        isValid: false,
        message: 'Value cannot be negative',
      });
    });

    it('validates monthly income correctly', () => {
      expect(validateNumericInput(5000, 'monthlyIncome')).toEqual({ isValid: true });
      expect(validateNumericInput(500, 'monthlyIncome')).toEqual({
        isValid: false,
        message: 'Monthly income must be between $1,000 and $50,000',
      });
    });

    it('handles NaN values', () => {
      expect(validateNumericInput(NaN, 'purchasePrice')).toEqual({
        isValid: false,
        message: 'Value cannot be negative',
      });
    });
  });

  describe('calculateEstimatedClosingCosts', () => {
    it('calculates closing costs for valid inputs', () => {
      const result = calculateEstimatedClosingCosts(400000, 400000);
      
      expect(result.total).toBeGreaterThan(0);
      expect(result.breakdown).toHaveLength(CLOSING_COSTS.length);
      expect(result.errors).toBeUndefined();
    });

    it('returns errors for invalid purchase price', () => {
      const result = calculateEstimatedClosingCosts(500, 500);
      
      expect(result.total).toBe(0);
      expect(result.breakdown).toEqual([]);
      expect(result.errors).toHaveLength(2); // Both purchase price and loan amount invalid
    });

    it('calculates percentage-based fees correctly', () => {
      const result = calculateEstimatedClosingCosts(400000, 400000);
      
      // Should include origination fee calculation
      expect(result.breakdown.find(item => item.category === 'Lender Fees')).toBeTruthy();
    });

    it('handles zero down payment', () => {
      const result = calculateEstimatedClosingCosts(400000, 400000);
      
      expect(result.total).toBeGreaterThan(0);
      expect(result.breakdown).toHaveLength(CLOSING_COSTS.length);
    });
  });

  describe('calculateDTI', () => {
    it('calculates DTI ratios correctly', () => {
      const result = calculateDTI(8000, 600, 2000);
      
      expect(result.frontEndRatio).toBe(25); // 2000/8000 * 100
      expect(result.backEndRatio).toBe(32.5); // (2000+600)/8000 * 100
      expect(result.rating).toBe('Excellent');
      expect(result.color).toBe('green');
      expect(result.qualified).toBe(true);
    });

    it('returns error for zero income', () => {
      const result = calculateDTI(0, 600, 2000);
      
      expect(result.rating).toBe('Error');
      expect(result.color).toBe('red');
      expect(result.qualified).toBe(false);
      expect(result.errors).toContain('Monthly income must be greater than zero');
    });

    it('handles high DTI ratios', () => {
      const result = calculateDTI(4000, 1000, 2500);
      
      expect(result.backEndRatio).toBe(87.5);
      expect(result.rating).toBe('Too High');
      expect(result.color).toBe('red');
      expect(result.qualified).toBe(false);
    });

    it('validates input ranges', () => {
      const result = calculateDTI(500, 0, 1000); // Income too low
      
      expect(result.errors).toContain('Monthly income must be between $1,000 and $50,000');
    });

    it('categorizes DTI correctly', () => {
      const excellent = calculateDTI(10000, 500, 3000);
      expect(excellent.rating).toBe('Excellent');
      
      const good = calculateDTI(10000, 1000, 3000);
      expect(good.rating).toBe('Good');
      
      const fair = calculateDTI(10000, 1500, 3000);
      expect(fair.rating).toBe('Fair');
    });
  });

  describe('CLOSING_COSTS data', () => {
    it('has required structure', () => {
      expect(CLOSING_COSTS).toHaveLength(4);
      
      CLOSING_COSTS.forEach(category => {
        expect(category).toHaveProperty('category');
        expect(category).toHaveProperty('items');
        expect(Array.isArray(category.items)).toBe(true);
        
        category.items.forEach(item => {
          expect(item).toHaveProperty('name');
          expect(item).toHaveProperty('typical');
          expect(item).toHaveProperty('description');
          expect(item).toHaveProperty('vaAllowed');
        });
      });
    });

    it('includes VA-allowed fees only', () => {
      CLOSING_COSTS.forEach(category => {
        category.items.forEach(item => {
          expect(item.vaAllowed).toBe(true);
        });
      });
    });
  });

  describe('DTI_GUIDELINES', () => {
    it('has correct VA guidelines', () => {
      expect(DTI_GUIDELINES.vaGuideline).toBe(41);
      expect(DTI_GUIDELINES.vaMax).toBe(50);
      expect(DTI_GUIDELINES.frontEndRatio).toBe(28);
    });

    it('has proper category structure', () => {
      expect(DTI_GUIDELINES.categories).toHaveLength(5);
      
      DTI_GUIDELINES.categories.forEach(category => {
        expect(category).toHaveProperty('max');
        expect(category).toHaveProperty('rating');
        expect(category).toHaveProperty('color');
      });
    });
  });

  describe('PRE_APPROVAL_CHECKLIST', () => {
    it('includes required and optional items', () => {
      const requiredItems = PRE_APPROVAL_CHECKLIST.filter(item => item.required);
      const optionalItems = PRE_APPROVAL_CHECKLIST.filter(item => !item.required);
      
      expect(requiredItems.length).toBeGreaterThan(0);
      expect(optionalItems.length).toBeGreaterThan(0);
    });

    it('has proper item structure', () => {
      PRE_APPROVAL_CHECKLIST.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('item');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('required');
        expect(typeof item.required).toBe('boolean');
      });
    });

    it('includes all necessary categories', () => {
      const categories = [...new Set(PRE_APPROVAL_CHECKLIST.map(item => item.category))];
      
      expect(categories).toContain('Income Documentation');
      expect(categories).toContain('Asset Documentation');
      expect(categories).toContain('VA Documents');
      expect(categories).toContain('Identification');
    });
  });

  describe('INPUT_LIMITS', () => {
    it('has sensible limits', () => {
      expect(INPUT_LIMITS.purchasePrice.min).toBe(1000);
      expect(INPUT_LIMITS.purchasePrice.max).toBe(10000000);
      expect(INPUT_LIMITS.monthlyIncome.min).toBe(1000);
      expect(INPUT_LIMITS.monthlyIncome.max).toBe(50000);
    });

    it('covers all necessary fields', () => {
      expect(INPUT_LIMITS).toHaveProperty('purchasePrice');
      expect(INPUT_LIMITS).toHaveProperty('monthlyIncome');
      expect(INPUT_LIMITS).toHaveProperty('monthlyDebt');
      expect(INPUT_LIMITS).toHaveProperty('downPayment');
      expect(INPUT_LIMITS).toHaveProperty('loanAmount');
      expect(INPUT_LIMITS).toHaveProperty('familySize');
    });
  });
});