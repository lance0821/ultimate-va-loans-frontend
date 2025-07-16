// Enable feature flag in browser
const page = document.createElement('script');
page.innerHTML = `
localStorage.setItem('ff_hero-simplification', 'true');
window.location.reload();
`;
document.head.appendChild(page);
EOF < /dev/null