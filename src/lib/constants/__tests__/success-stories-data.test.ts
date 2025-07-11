import {
  SUCCESS_STORIES,
  SUCCESS_METRICS,
  TESTIMONIAL_HIGHLIGHTS,
  getAverageStats,
  type SuccessStory,
  type SuccessMetric
} from '../success-stories-data';

describe('success-stories-data', () => {
  describe('SUCCESS_STORIES', () => {
    it('should have exactly 4 stories', () => {
      expect(SUCCESS_STORIES).toHaveLength(4);
    });

    it('should have all required properties for each story', () => {
      SUCCESS_STORIES.forEach((story: SuccessStory) => {
        expect(story).toHaveProperty('id');
        expect(story).toHaveProperty('name');
        expect(story).toHaveProperty('branch');
        expect(story).toHaveProperty('location');
        expect(story).toHaveProperty('image');
        expect(story).toHaveProperty('quote');
        expect(story).toHaveProperty('beforeAfter');
        expect(story).toHaveProperty('details');
      });
    });

    it('should have proper beforeAfter structure', () => {
      SUCCESS_STORIES.forEach((story: SuccessStory) => {
        expect(story.beforeAfter).toHaveProperty('before');
        expect(story.beforeAfter).toHaveProperty('after');
        expect(story.beforeAfter.before).toHaveProperty('situation');
        expect(story.beforeAfter.before).toHaveProperty('challenges');
        expect(story.beforeAfter.after).toHaveProperty('outcome');
        expect(story.beforeAfter.after).toHaveProperty('benefits');
        expect(Array.isArray(story.beforeAfter.before.challenges)).toBe(true);
        expect(Array.isArray(story.beforeAfter.after.benefits)).toBe(true);
      });
    });

    it('should have proper details structure with numbers', () => {
      SUCCESS_STORIES.forEach((story: SuccessStory) => {
        expect(typeof story.details.purchasePrice).toBe('number');
        expect(typeof story.details.downPayment).toBe('number');
        expect(typeof story.details.closingTime).toBe('number');
        expect(typeof story.details.monthlyPayment).toBe('number');
        expect(typeof story.details.savedVsRenting).toBe('number');
        expect(story.details.purchasePrice).toBeGreaterThan(0);
        expect(story.details.closingTime).toBeGreaterThan(0);
      });
    });

    it('should have unique IDs', () => {
      const ids = SUCCESS_STORIES.map(story => story.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(SUCCESS_STORIES.length);
    });

    it('should have valid military branches', () => {
      const validBranches = ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'];
      SUCCESS_STORIES.forEach((story: SuccessStory) => {
        expect(validBranches).toContain(story.branch);
      });
    });

    it('should have at least one story with video testimonial', () => {
      const storiesWithVideo = SUCCESS_STORIES.filter(story => story.videoTestimonial);
      expect(storiesWithVideo.length).toBeGreaterThan(0);
    });

    it('should have proper video testimonial structure when present', () => {
      const storiesWithVideo = SUCCESS_STORIES.filter(story => story.videoTestimonial);
      storiesWithVideo.forEach((story: SuccessStory) => {
        expect(story.videoTestimonial).toHaveProperty('url');
        expect(story.videoTestimonial).toHaveProperty('duration');
        expect(story.videoTestimonial).toHaveProperty('thumbnail');
        expect(story.videoTestimonial!.url).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('SUCCESS_METRICS', () => {
    it('should have exactly 4 metrics', () => {
      expect(SUCCESS_METRICS).toHaveLength(4);
    });

    it('should have all required properties for each metric', () => {
      SUCCESS_METRICS.forEach((metric: SuccessMetric) => {
        expect(metric).toHaveProperty('id');
        expect(metric).toHaveProperty('value');
        expect(metric).toHaveProperty('label');
        expect(metric).toHaveProperty('description');
        expect(metric).toHaveProperty('icon');
      });
    });

    it('should have unique IDs', () => {
      const ids = SUCCESS_METRICS.map(metric => metric.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(SUCCESS_METRICS.length);
    });

    it('should have non-empty values', () => {
      SUCCESS_METRICS.forEach((metric: SuccessMetric) => {
        expect(metric.value).toBeTruthy();
        expect(metric.label).toBeTruthy();
        expect(metric.description).toBeTruthy();
        expect(metric.icon).toBeTruthy();
      });
    });
  });

  describe('TESTIMONIAL_HIGHLIGHTS', () => {
    it('should have at least 3 highlights', () => {
      expect(TESTIMONIAL_HIGHLIGHTS.length).toBeGreaterThanOrEqual(3);
    });

    it('should have non-empty strings', () => {
      TESTIMONIAL_HIGHLIGHTS.forEach((highlight: string) => {
        expect(typeof highlight).toBe('string');
        expect(highlight.length).toBeGreaterThan(0);
      });
    });

    it('should have unique highlights', () => {
      const uniqueHighlights = [...new Set(TESTIMONIAL_HIGHLIGHTS)];
      expect(uniqueHighlights).toHaveLength(TESTIMONIAL_HIGHLIGHTS.length);
    });
  });

  describe('getAverageStats function', () => {
    it('should return correct structure', () => {
      const stats = getAverageStats();
      expect(stats).toHaveProperty('totalDownPaymentSaved');
      expect(stats).toHaveProperty('avgMonthlySavings');
      expect(stats).toHaveProperty('avgClosingTime');
    });

    it('should return numbers', () => {
      const stats = getAverageStats();
      expect(typeof stats.totalDownPaymentSaved).toBe('number');
      expect(typeof stats.avgMonthlySavings).toBe('number');
      expect(typeof stats.avgClosingTime).toBe('number');
    });

    it('should calculate correct total down payment saved', () => {
      const stats = getAverageStats();
      const expectedTotal = SUCCESS_STORIES.reduce((sum, story) => {
        return sum + story.details.downPayment;
      }, 0);
      expect(stats.totalDownPaymentSaved).toBe(expectedTotal);
    });

    it('should calculate correct average monthly savings', () => {
      const stats = getAverageStats();
      const totalSavings = SUCCESS_STORIES.reduce((sum, story) => {
        return sum + story.details.savedVsRenting;
      }, 0);
      const expectedAvg = Math.round(totalSavings / SUCCESS_STORIES.length);
      expect(stats.avgMonthlySavings).toBe(expectedAvg);
    });

    it('should calculate correct average closing time', () => {
      const stats = getAverageStats();
      const totalDays = SUCCESS_STORIES.reduce((sum, story) => {
        return sum + story.details.closingTime;
      }, 0);
      const expectedAvg = Math.round(totalDays / SUCCESS_STORIES.length);
      expect(stats.avgClosingTime).toBe(expectedAvg);
    });

    it('should return positive values', () => {
      const stats = getAverageStats();
      expect(stats.totalDownPaymentSaved).toBeGreaterThanOrEqual(0);
      expect(stats.avgMonthlySavings).toBeGreaterThan(0);
      expect(stats.avgClosingTime).toBeGreaterThan(0);
    });
  });

  describe('Data integrity', () => {
    it('should have realistic financial values', () => {
      SUCCESS_STORIES.forEach((story: SuccessStory) => {
        expect(story.details.purchasePrice).toBeGreaterThan(50000);
        expect(story.details.purchasePrice).toBeLessThan(2000000);
        expect(story.details.monthlyPayment).toBeGreaterThan(500);
        expect(story.details.monthlyPayment).toBeLessThan(10000);
        expect(story.details.closingTime).toBeGreaterThan(15);
        expect(story.details.closingTime).toBeLessThan(90);
      });
    });

    it('should have proper string formatting', () => {
      SUCCESS_STORIES.forEach((story: SuccessStory) => {
        expect(story.quote).toMatch(/^[A-Z]/);
        expect(story.name).toMatch(/^[A-Z]/);
        expect(story.location).toMatch(/^[A-Z]/);
      });
    });
  });
});