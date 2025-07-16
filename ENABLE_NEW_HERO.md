# How to Enable the New Simplified Hero

The new hero is behind a feature flag for A/B testing. To enable it:

1. Open your browser's Developer Console (F12 or right-click → Inspect → Console)

2. Run this command:
```javascript
localStorage.setItem('ff_hero-simplification', 'true');
```

3. Refresh the page (F5 or Cmd+R)

You should now see the new simplified hero with:
- Single "Check Your Eligibility" button
- Simplified trust indicators
- Award badge in top-right corner
- Gradient background

To go back to the old hero:
```javascript
localStorage.removeItem('ff_hero-simplification');
```
Then refresh the page.