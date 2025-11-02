# Architecture Overview

## Philosophy

This is a **Single Page Application (SPA)** with a focus on:

- **Simplicity** over premature optimization
- **MUI-first** styling patterns
- **Client-side** rendering for maintainability
- **Theme-based** styling rather than custom CSS

---

## Key Decisions

### ✅ Client-Side Rendering

- All components use `"use client"` when needed
- Data fetching via `useEffect` and `fetch()`
- **Accepts** React's double-invoke in development (Strict Mode)
- No Server Components or complex data fetching patterns

### ✅ MUI-First Styling

- Minimal custom styling
- Theme configuration in `src/theme/mui.ts`
- Use MUI props (`variant`, `color`, `sx`) over custom CSS
- Prefer theme tokens over hardcoded values

### ✅ Simple Data Flow

```
Client Component → useEffect → fetch('/api/...') → Supabase → Response
```

### ✅ Component Organization

```
src/
├── app/                    # Next.js pages
│   ├── data/
│   │   └── page.tsx        # Main data visualization page
│   └── api/                # API routes
│       └── attorney-caseload/
│           └── route.ts   # Supabase queries
├── components/             # Reusable UI components
│   ├── AttorneyCaseloadGauge.tsx
│   ├── StatCard.tsx
│   ├── HeroImageSection.tsx
│   └── ...
└── theme/                  # MUI theme configuration
    ├── mui.ts              # Theme setup
    └── definition.ts       # Theme tokens
```

---

## Current Features

### Data Visualization

- **Attorney Caseload Gauge**: Proof-of-concept gauge showing highest caseload attorney using MUI X Charts
- **Infographic Layout**: Minimal, scannable page design with immediate information display
- **Placeholder Structure**: Sections prepared for future table and card visualizations

### MUI Integration

- **Charts**: MUI X Charts for data visualization
- **Components**: Full MUI component library
- **Theme**: Custom palette and typography configured in theme

---

## Styling Guidelines

### ✅ Do This:

```typescript
// Use theme tokens
<Typography color="primary" variant="h4">

// Use MUI spacing
<Box sx={{ p: 2, mb: 4 }}>

// Use theme in sx
sx={(theme) => ({
  color: theme.palette.secondary.main
})}
```

### ❌ Avoid This:

```typescript
// Hardcoded colors
<Box sx={{ color: "#D95D39" }}>

// Custom CSS when MUI has it
<Box sx={{ marginTop: "16px" }}>  // Use mt={2} instead

// Overriding MUI defaults unnecessarily
```

---

## Data Fetching Pattern

### Standard Client Component Pattern:

```typescript
"use client";

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/my-endpoint");
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  return <DisplayComponent data={data} />;
}
```

**Note**: React 18 Strict Mode will double-invoke this in development. This is expected and acceptable.

---

## Theme Configuration

The theme (`src/theme/mui.ts`) handles:

- Custom palette colors
- Typography with custom fonts
- Component default props (e.g., Button `disableRipple`)
- Custom font-face definitions

**Keep theme customizations minimal** - only what's needed for brand consistency.

---

## API Routes

API routes (`src/app/api/`) provide:

- Direct Supabase access
- Data aggregation and processing
- Consistent JSON response format

Example:

```typescript
// src/app/api/attorney-caseload/route.ts
export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from("view_name").select("*");
  return NextResponse.json(processData(data));
}
```

---

## What We Removed

### ❌ Server Components

- Removed Server Component implementations
- Removed server-side data fetching utilities
- Kept everything client-side for simplicity

### ❌ Premature Optimizations

- Removed AbortController complexity
- Removed cache headers
- Accepted React's development double-invoke

### ❌ Unnecessary Documentation

- Removed extensive guides on Server Components
- Removed migration documentation
- Focused on working code, not theory

---

## Next Steps for Growth

### When You Need Server Components:

- If performance becomes critical
- If SEO becomes important
- If you need real-time data streaming

### When You Need More Custom Styling:

- Only when MUI doesn't provide the pattern
- Keep it in the theme, not component `sx`
- Prefer MUI variants and components

### When You Need More Charts:

- Use MUI X Charts components
- Follow the pattern in `AttorneyCaseloadGauge.tsx`
- Keep chart styling theme-based

---

## File Structure

```
src/
├── app/
│   ├── data/
│   │   └── page.tsx           # Main data page with tabs
│   └── api/
│       └── attorney-caseload/
│           └── route.ts       # Attorney caseload endpoint
├── components/
│   ├── AttorneyCaseloadGauge.tsx  # MUI X Charts gauge
│   ├── TabPanel.tsx                # Tab content wrapper
│   └── ...                          # Other UI components
├── theme/
│   ├── mui.ts                       # MUI theme configuration
│   └── definition.ts                # Theme tokens
└── types/
    └── database.ts                  # Supabase generated types
```

---

## Key Principles

1. **Simplicity First**: Prefer simple patterns over complex architectures
2. **MUI Native**: Use MUI components and patterns as designed
3. **Theme Overrides**: Configure in theme, not in components
4. **Client-Side**: Accept client-side rendering for maintainability
5. **Progressive Enhancement**: Start simple, add complexity only when needed
6. **Immediate Information**: Show impactful data upfront, don't bury it in tabs or modals

---

## Recent Improvements

### Data Page Redesign (Fall 2025)

**Changes Made:**

- ✅ Removed tabbed interface - all information now visible immediately
- ✅ Converted to infographic-style layout for better scannability
- ✅ Removed placeholder sections (methodology, downloads, etc.) - replaced with simple links
- ✅ Created placeholder structure for future visualizations (tables, cards)
- ✅ Kept attorney workload gauge as proof-of-concept

**Design Rationale:**

- **No Information Burial**: Removed tabs that hid content - everything is visible
- **Infographic Style**: Large, scannable metrics and visualizations
- **Future-Ready**: Layout structured for upcoming table/card visualizations
- **Minimal Placeholders**: Simple grey boxes indicate where future content goes

---

## Opportunities for Improvement

### 1. Reusable Visualization Components

**Current State**: AttorneyCaseloadGauge is a one-off component
**Opportunity**: Create reusable patterns for:

- Stat cards with filters
- Data tables with sorting/filtering
- Chart wrappers with consistent styling

**Recommendation**: When implementing the first table/card visualization, extract common patterns into reusable components.

### 2. Data Filtering Infrastructure

**Current State**: No filtering capability
**Future Need**: Based on visualization requirements:

- Year filters
- Attorney name filters
- Charge level filters
- Good motion presence filters
- Attorney type filters

**Recommendation**: Build a shared filter component/context when implementing first filtered visualization.

### 3. API Endpoint Patterns

**Current State**: Single endpoint (`/api/attorney-caseload`)
**Future Need**: Will need endpoints for:

- Attorney-level case assignments (table data)
- Attorney type aggregations (card data)
- Disposition analysis (table data with joins)

**Recommendation**: Follow the pattern established in `attorney-caseload/route.ts` - use database views when possible, fallback to joins.

### 4. MUI Table/DataGrid Integration

**Future Need**: Tables for attorney-level and disposition data
**Recommendation**: Consider MUI X DataGrid for complex tables with sorting/filtering, or MUI Table for simpler needs.

### 5. Component Organization

**Current State**: All components in single directory
**Opportunity**: When adding more data visualization components, consider:

```
components/
├── visualizations/
│   ├── AttorneyCaseloadGauge.tsx
│   ├── AttorneyTable.tsx (future)
│   └── DispositionTable.tsx (future)
├── filters/
│   └── DataFilters.tsx (future)
└── ... (existing components)
```

### 6. Theme Enhancement

**Current State**: Basic theme configuration
**Opportunity**: When adding more visualizations, consider:

- Chart color palette in theme
- Consistent spacing for visualization cards
- Typography variants for stat cards

---

This architecture prioritizes **maintainability** and **simplicity** over premature optimization.
