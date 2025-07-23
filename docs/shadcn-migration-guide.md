# shadcn/ui Migration Guide

## Overview
This guide documents the migration process from custom components to shadcn/ui v4 components for the VA Home Loans project.

## Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4 with its CSS-first configuration approach:
- No `tailwind.config.js` file needed
- All configuration done in CSS using `@theme` directive
- Design tokens exposed as CSS variables
- Native CSS features for animations and custom utilities

### OKLCH Color Space

We use OKLCH (Oklab Lightness Chroma Hue) for all colors:
- **Better perceptual uniformity**: Colors appear consistent across different displays
- **Easier accessibility**: Lightness channel makes it simple to ensure proper contrast
- **More vibrant colors**: Wider gamut than sRGB
- **Future-proof**: Supported in all modern browsers and CSS Color Module Level 4

Example OKLCH format: `oklch(0.794 0.143 88.34)` where:
- First value: Lightness (0-1, where 0 is black and 1 is white)
- Second value: Chroma (0-0.4+, where 0 is gray and higher is more saturated)
- Third value: Hue (0-360 degrees)

## MCP Tools Usage

### CRITICAL: Always Use MCP Tools
Never copy code from external sources. Always use the official MCP tools:

1. **List available components**:
   ```
   mcp__shadcn-ui__list_components
   ```

2. **Get component source code**:
   ```
   mcp__shadcn-ui__get_component [component-name]
   ```

3. **Get implementation examples**:
   ```
   mcp__shadcn-ui__get_component_demo [component-name]
   ```

4. **Get component metadata**:
   ```
   mcp__shadcn-ui__get_component_metadata [component-name]
   ```

5. **Get block implementations**:
   ```
   mcp__shadcn-ui__get_block [block-name]
   ```

## Migration Process

### Phase 1: Foundation (Complete)
- [x] Theme configuration with VA colors
- [x] Global CSS variables setup
- [x] Button component standardization
- [x] Migration documentation

### Phase 2: Forms & Inputs
- [ ] Input component
- [ ] Form component
- [ ] Select component
- [ ] Checkbox/Radio components

### Phase 3: Layout Components
- [ ] Card component
- [ ] Navigation menu
- [ ] Sheet (mobile drawer)
- [ ] Tabs component

### Phase 4: Advanced Components
- [ ] Table component
- [ ] Dialog/Modal
- [ ] Popover/Dropdown
- [ ] Toast notifications

## Component Customization Pattern

### Example: Button Component
```typescript
// 1. Get base component from MCP
// mcp__shadcn-ui__get_component button

// 2. Add VA-specific variants
variant: {
  "va-primary": "bg-va-blue text-white hover:bg-va-blue/90",
  "va-secondary": "bg-va-gold text-va-blue hover:bg-va-gold/90",
}

// 3. Add touch optimization
size: {
  touch: "min-h-[44px] px-6 py-3", // 44px minimum for mobile
}

// 4. Preserve existing features
hierarchy: {
  primary: "text-base lg:text-lg font-bold shadow-lg",
}
```

## VA Brand Guidelines

### Colors (Using OKLCH Color Space)
- Primary: VA Blue - `--primary` - oklch(0.329 0.101 241.45) - #003E7E
- Secondary: VA Gold - `--secondary` - oklch(0.794 0.143 88.34) - #FDB714
- Destructive: VA Red - `--destructive` - oklch(0.518 0.178 29.23) - #B31B1B

OKLCH provides better color consistency across different displays and makes it easier to create accessible color variations.

### Accessibility
- Minimum touch target: 44px
- Focus indicators: 2px ring with offset
- Color contrast: WCAG AA compliant
- Keyboard navigation: Full support

### Mobile Optimization
- Touch-optimized sizes for all interactive elements
- Responsive text sizing
- Appropriate spacing for thumb reach

## Testing Checklist

### For Each Component:
- [ ] Visual consistency with VA brand
- [ ] Accessibility compliance (WCAG AA)
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Loading states
- [ ] Error states
- [ ] Disabled states

### Performance:
- [ ] Bundle size impact < 10%
- [ ] No layout shift
- [ ] Smooth animations
- [ ] Fast interaction response

## Common Gotchas

1. **Always use MCP tools** - Don't copy from docs
2. **Preserve VA customizations** - Don't lose existing features
3. **Test on mobile first** - Most users are on mobile
4. **Check accessibility** - Many Veterans have disabilities
5. **Monitor bundle size** - Keep performance optimal

## Support

For questions about the migration:
1. Check this guide first
2. Review the component demo page at `/dev/components`
3. Use MCP tools to explore available options
4. Test in isolation before integrating