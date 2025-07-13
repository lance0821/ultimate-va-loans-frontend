# Color Classes Reference Guide

This guide documents all color-based CSS classes defined in `globals.css` for consistent styling across the VA Loans application.

## 🎨 Color System Overview

Our color system is based on:
- **VA Blue** (`--va-blue`): Primary brand color for CTAs and active states
- **VA Gold** (`--va-gold`): Accent color for highlights and achievements
- **VA Red** (`--va-red` / `--destructive`): Error states and destructive actions only
- **Neutral colors**: For text, borders, and backgrounds

## 📍 Navigation Classes

### Desktop Navigation
```jsx
// Base navigation link
<Link className="nav-link nav-link-hover">Home</Link>

// Active navigation link
<Link className="nav-link nav-link-active">Current Page</Link>

// Disabled navigation
<Link className="nav-link nav-link-disabled">Unavailable</Link>
```

### Mobile Navigation
```jsx
// Mobile nav link with hover state
<Link className="nav-mobile-link nav-mobile-hover">Menu Item</Link>

// Active mobile nav
<Link className="nav-mobile-link nav-mobile-active">Current Page</Link>
```

## 🔘 Button Classes

```jsx
// Primary CTA button
<Button className="btn-primary">Get Started</Button>

// Secondary button
<Button className="btn-secondary">Learn More</Button>

// Destructive button (delete/remove actions only)
<Button className="btn-destructive">Delete Account</Button>

// Ghost button (minimal style)
<Button className="btn-ghost">Cancel</Button>

// Outline button
<Button className="btn-outline">View Details</Button>

// VA-specific primary button
<Button className="btn-va-primary">Apply for VA Loan</Button>
```

## 📝 Form Classes

### Input States
```jsx
// Normal input
<input className="form-input" />

// Error state
<input className="form-input form-input-error" />

// Success state
<input className="form-input form-input-success" />
```

### Labels and Messages
```jsx
// Form label
<label className="form-label">Email Address</label>

// Required field label
<label className="form-label form-label-required">Full Name</label>

// Helper text
<p className="form-helper">Enter your military email</p>

// Error message
<p className="form-error">Invalid email format</p>

// Success message
<p className="form-success">Email verified successfully</p>
```

## 🃏 Card Classes

```jsx
// Interactive card (clickable/hoverable)
<Card className="card-interactive">
  {/* Content */}
</Card>

// Highlighted card (special/featured)
<Card className="card-highlight">
  {/* Featured content */}
</Card>

// Success card
<Card className="card-success">
  {/* Success message */}
</Card>

// Warning card
<Card className="card-warning">
  {/* Warning content */}
</Card>

// Error card
<Card className="card-error">
  {/* Error information */}
</Card>
```

## 🏷️ Badge Classes

```jsx
// Badge variants
<Badge className="badge-primary">New</Badge>
<Badge className="badge-secondary">Optional</Badge>
<Badge className="badge-success">Approved</Badge>
<Badge className="badge-warning">Pending</Badge>
<Badge className="badge-error">Rejected</Badge>
<Badge className="badge-info">Info</Badge>

// VA-specific badge
<Badge className="badge-va-gold">Premium</Badge>
```

## 🚨 Alert Classes

```jsx
// Information alert
<Alert className="alert-info">
  <InfoIcon />
  Your application is being processed
</Alert>

// Success alert
<Alert className="alert-success">
  <CheckIcon />
  Application approved!
</Alert>

// Warning alert
<Alert className="alert-warning">
  <AlertIcon />
  Documents expire in 30 days
</Alert>

// Error alert
<Alert className="alert-error">
  <XIcon />
  Failed to submit application
</Alert>
```

## 📑 Tab Classes

```jsx
// Tab list container
<TabsList className="tab-list">
  {/* Tab triggers */}
</TabsList>

// Inactive tab
<TabsTrigger className="tab-trigger">Overview</TabsTrigger>

// Active tab
<TabsTrigger className="tab-trigger tab-trigger-active">Details</TabsTrigger>
```

## 🔗 Link Classes

```jsx
// Primary link (standard blue)
<a className="link-primary">View details</a>

// Subtle link (less prominent)
<a className="link-subtle">Learn more</a>

// VA Blue branded link
<a className="link-va">VA Benefits Guide</a>
```

## 📊 Status Indicators

### Text Status
```jsx
<span className="status-active">Active</span>
<span className="status-pending">Pending</span>
<span className="status-inactive">Inactive</span>
<span className="status-error">Error</span>
```

### Status Dots
```jsx
<span className="status-dot-active" />
<span className="status-dot-pending" />
<span className="status-dot-error" />
```

## 🇺🇸 VA-Specific Patterns

```jsx
// VA highlight text
<span className="va-highlight">Zero Down Payment</span>

// VA accent text
<span className="va-accent">Gold Star Service</span>

// Hero statistics
<div className="va-hero-stat">$0</div>

// Benefit icons
<Icon className="va-benefit-icon" />

// Trust badges
<div className="va-trust-badge">VA Approved</div>
```

## 📈 Progress Indicators

```jsx
// Progress bar container
<div className="progress-bar">
  {/* Default fill */}
  <div className="progress-bar-fill" style={{width: '60%'}} />
</div>

// Success progress
<div className="progress-bar">
  <div className="progress-bar-fill progress-bar-success" style={{width: '100%'}} />
</div>

// Warning progress
<div className="progress-bar">
  <div className="progress-bar-fill progress-bar-warning" style={{width: '75%'}} />
</div>

// Error progress
<div className="progress-bar">
  <div className="progress-bar-fill progress-bar-error" style={{width: '25%'}} />
</div>
```

## 🎯 Focus States

```jsx
// Standard focus ring
<button className="focus-ring">Click me</button>

// Focus visible ring (keyboard navigation)
<button className="focus-visible-ring">Tab to me</button>

// Gold focus ring for special elements
<button className="focus-ring-gold">Special Action</button>
```

## ✨ Interactive Effects

```jsx
// Hover lift effect (cards, images)
<Card className="hover-lift">
  {/* Content lifts on hover */}
</Card>

// Hover scale effect (buttons, icons)
<Button className="hover-scale">
  {/* Scales up on hover */}
</Button>

// Active press effect
<Button className="active-press">
  {/* Scales down on click */}
</Button>
```

## 🌓 Dark Mode Considerations

Most classes automatically adapt to dark mode. Special overrides are defined for:
- Navigation active states
- Card hover effects
- Badge colors
- Alert backgrounds

## 📋 Usage Guidelines

1. **Color Hierarchy**:
   - Use `btn-primary` or `link-primary` for main CTAs
   - Use `btn-secondary` for less important actions
   - Reserve `btn-destructive` for delete/remove actions only
   - Use `status-error` and `form-error` for error states

2. **Consistency**:
   - Always use these predefined classes instead of inline color styles
   - Update classes in `globals.css` if new color patterns are needed
   - Don't mix Tailwind color utilities with these semantic classes

3. **Accessibility**:
   - All interactive elements include focus states
   - Color contrast ratios meet WCAG AA standards
   - Don't rely on color alone to convey information

4. **VA Branding**:
   - Use VA Blue for primary actions and active states
   - Use VA Gold sparingly for special highlights
   - Never use VA Red except for errors and destructive actions

## 🔄 Migration Guide

When refactoring existing components:

### Before:
```jsx
<Link className="text-foreground hover:text-primary transition-colors">
```

### After:
```jsx
<Link className="nav-link nav-link-hover">
```

### Before:
```jsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
```

### After:
```jsx
<Button className="btn-primary">
```

## 📚 Additional Resources

- View the source: `/src/app/globals.css`
- Component library: `/src/components/ui/`
- Design system documentation: `/docs/design-system.md` (if available)