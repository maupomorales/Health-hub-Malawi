# Blantyre Health Hub

## Overview

Blantyre Health Hub is a comprehensive healthcare directory web application built for Blantyre, Malawi. The platform helps users discover and connect with verified healthcare providers including pharmacies, dentists, opticians, gyms, and skincare services. The application provides detailed provider information, emergency contacts, and location-based search functionality to make healthcare services more accessible to the community.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15.2.4 with React 19
- **Rendering Strategy**: Server-side rendering (SSR) with React Server Components (RSC) enabled
- **Routing**: Next.js App Router for file-based routing with support for dynamic routes (`/provider/[id]`, `/search`, `/emergency`)
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **Type Safety**: TypeScript with strict mode enabled for compile-time type checking

**UI Component Library**: Shadcn/ui
- Pre-built, accessible components using Radix UI primitives
- Customizable through Tailwind CSS and class-variance-authority
- Icon library: Lucide React for consistent iconography
- Components stored in `@/components/ui` with centralized path aliases

**State Management**: Client-side React hooks
- `useState` and `useEffect` for local component state
- Custom hooks (`use-mobile`, `use-toast`) for reusable logic
- URL search parameters (`useSearchParams`) for search state management

**Design Patterns**:
- Component composition with reusable UI primitives
- Client/Server component separation ("use client" directive where needed)
- Responsive design with mobile-first approach (768px breakpoint)
- Accessibility-first with ARIA labels and semantic HTML

### Data Architecture

**Data Storage**: Currently static/hardcoded
- Provider data embedded in page components as JavaScript objects
- Service data organized by geographical areas (Blantyre neighborhoods)
- No database integration present (opportunity for future enhancement)

**Data Structure**:
- Healthcare providers with detailed profiles (name, rating, services, contact info, hours)
- Emergency contacts with priority levels and service categories
- Area-based service listings with location information

### Styling System

**Tailwind Configuration**:
- Custom color palette using CSS custom properties (HSL values)
- Dark mode support through class-based strategy
- Extended theme with chart colors and sidebar-specific variables
- Custom animations (fade-in, accordion transitions)
- Responsive breakpoints for mobile optimization

**Global Styles**:
- Custom CSS animations for user experience enhancement
- Smooth scroll behavior for anchor navigation
- Background attachment fixes for mobile devices
- Typography using Arial/Helvetica sans-serif stack

### Routing Structure

**Public Routes**:
- `/` - Homepage with service categories and featured providers
- `/search` - Search and filtering interface with area-based results
- `/emergency` - Emergency contacts and services directory
- `/provider/[id]` - Dynamic provider detail pages with comprehensive information

**Loading States**: Each route has dedicated loading components for progressive rendering

### Image Handling

- Next.js Image component for optimized image delivery
- Logo and provider images loaded from `/logo.png` path
- Configured with proper width/height for performance

### Development Configuration

**Build Setup**:
- Development server on port 5000 with network binding (0.0.0.0)
- Production builds optimized with Next.js compiler
- Path aliases configured for clean imports (@/ prefix)
- ESModuleInterop enabled for compatibility

**Code Quality**:
- ESLint integration for code linting
- Strict TypeScript checking enabled
- Incremental compilation for faster builds

## External Dependencies

### UI Framework Dependencies
- **Radix UI**: Complete suite of accessible, unstyled UI primitives (@radix-ui/react-*)
  - Dialog, Dropdown, Popover, Toast, Tabs, Select, and 20+ other components
  - Provides keyboard navigation, ARIA attributes, and focus management
  
- **Tailwind CSS**: Utility-first CSS framework (v10.4.20)
  - Configured with custom design tokens
  - Supports dark mode and responsive design

### Utility Libraries
- **clsx & tailwind-merge**: Conditional className management
- **class-variance-authority**: Type-safe component variants
- **cmdk**: Command menu/palette functionality
- **date-fns**: Date formatting and manipulation (v3.6.0)
- **embla-carousel-react**: Carousel/slider functionality (v8.5.1)
- **input-otp**: OTP input component (v1.4.1)
- **lucide-react**: Icon library with 1000+ icons (v0.454.0)

### Form Management
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Validation schema resolvers for forms

### Theming
- **next-themes**: Theme switching support (light/dark mode)

### Build Tools
- **Autoprefixer**: CSS vendor prefixing
- **TypeScript**: Static type checking

### Missing Integrations (Opportunities)
- No database layer (consider Drizzle ORM + PostgreSQL for production)
- No authentication system
- No API routes for data fetching
- No analytics or monitoring
- No payment processing
- No email/notification services
- No maps integration (despite location-based features)
- No real-time features or WebSocket connections