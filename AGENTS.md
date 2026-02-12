# AI Agent Development Guide

Next.js 15 portfolio with App Router, React 19, TypeScript 5, Tailwind CSS v4, and Strapi CMS.

## Commands

```bash
npm run dev            # Start dev server with Turbopack
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Run ESLint
npx tsc --noEmit       # Type-check only (no emit)
```

**Testing:** No test framework configured. If adding tests, use Jest + React Testing Library. Run `npm run lint` after all changes.

## Code Style

### TypeScript
- **Strict mode** enabled - no `any` types
- Use path alias `@/*` for all internal imports
- Define interfaces for all props and API responses
- Use `Readonly<T>` for immutable data

### Naming
- **Components/Types:** PascalCase (`UserCard`, `ApiResponse`)
- **Variables/Functions:** camelCase (`getData`, `isLoading`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)
- **Files:** kebab-case (`user-card.tsx`)

### Imports (ordered)
```typescript
// 1. React/Next
import { useState } from 'react'
import { Metadata } from 'next'

// 2. External libraries
import { motion } from 'motion/react'

// 3. Internal (@ aliases)
import Button from '@/components/ui/Button'
import { ApiResponse } from '@/types/api-response'
```

### Component Patterns
- Server components: default (no directive)
- Client components: `"use client"` at top
- Server actions: `"use server"` at top
- Polymorphic components: support `as` prop with generics
- UI components: accept `className`, use `forwardRef`
- All UI components in `@/components/ui/`

### File Structure
```
src/
├── app/              # Next.js App Router
├── components/
│   ├── common/       # Header, Footer, ThemeProvider
│   └── ui/           # Reusable UI (Button, Text, Card)
├── features/         # Feature-based modules
├── lib/              # Core utilities, configs
├── utils/            # Helper functions
├── types/            # TypeScript types
├── hooks/            # Custom React hooks
├── constants/        # App constants
└── styles/           # Global styles
```

### Styling (Tailwind-first)
- Use Tailwind classes exclusively
- Custom CSS only for theme variables
- Mobile-first responsive design
- Use CSS custom properties for theming

### Animation
- Use `motion/react` (Framer Motion successor)
- Wrap apps with `LazyMotion features={domMax}`
- Respect `prefers-reduced-motion`

### Error Handling
- Error boundaries for client errors
- Try-catch in server actions
- Never log sensitive data

### Accessibility
- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation
- Alt text for images
- Heading hierarchy (h1 → h2 → h3)

## Strapi Integration
- API: `http://localhost:1337` (dev)
- Use fetcher from `lib/strapi-fetcher`
- Type all API responses
- Handle errors gracefully

## Checklist Before Completion
- [ ] TypeScript strict compliance
- [ ] Proper import organization
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Responsive design
- [ ] Error handling present
- [ ] Accessibility standards met
