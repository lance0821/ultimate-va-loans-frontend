// Test script to enable the hero simplification feature flag
// Run this in the browser console on the dev server

// Enable the feature flag
localStorage.setItem('ff_hero-simplification', 'true');

// Reload the page to see the new hero
window.location.reload();

// To disable and go back to legacy:
// localStorage.removeItem('ff_hero-simplification');
// window.location.reload();