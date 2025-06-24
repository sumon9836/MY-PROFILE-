# Personal Portfolio Website

## Overview

This is a modern, animated personal portfolio website built with React, Express, and TypeScript. The application features a beautiful, interactive design with social media integration and contact functionality. It's designed as a single-page application showcasing a creative professional's work and providing easy ways for visitors to connect.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Development**: Hot reloading with Vite integration

## Key Components

### Frontend Components
- **AnimatedBackground**: Dynamic gradient background with floating shapes
- **Navigation**: Responsive navigation with scroll-based hiding/showing
- **HeroSection**: Main introduction section with animated profile image
- **SocialMediaGrid**: Interactive cards for different social media platforms
- **AboutSection**: Personal information with skills showcase
- **ContactSection**: Contact form with validation and toast notifications
- **Footer**: Social media links footer

### Backend Components
- **Storage Interface**: Abstracted CRUD operations for user management
- **Route Registration**: Centralized route management system
- **Vite Integration**: Development-only Vite middleware for hot reloading
- **Error Handling**: Centralized error handling middleware

## Data Flow

### Client-Side Flow
1. User visits the portfolio website
2. React components render with initial animations
3. Smooth scrolling navigation between sections
4. Contact form submissions trigger toast notifications
5. Social media links open in new tabs

### Server-Side Flow
1. Express server serves the React application in production
2. API routes are prefixed with `/api` for backend functionality
3. Development mode integrates Vite middleware for hot reloading
4. Database operations use the abstracted storage interface

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icons, Font Awesome
- **Utilities**: clsx, class-variance-authority, date-fns

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution, ESBuild for production builds

### Development Tools
- **Build Tool**: Vite with React plugin
- **TypeScript**: Full TypeScript support with strict configuration
- **Replit Integration**: Replit-specific plugins for development environment
- **Database Migrations**: Drizzle Kit for schema management

## Deployment Strategy

### Development Environment
- Runs on Node.js 20 with PostgreSQL 16 module
- Vite dev server on port 5000 with hot module replacement
- Development database connections via environment variables
- Real-time error overlay and cartographer integration

### Production Build
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle pushes schema changes to production database
4. **Deployment**: Autoscale deployment target on Replit
5. **Static Assets**: Served from `dist/public` directory

### Environment Configuration
- Database URL required via `DATABASE_URL` environment variable
- Supports both development and production NODE_ENV modes
- Port configuration for local development (5000) and production (80)

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
- June 24, 2025. Added custom video background system with:
  - VideoBackground component with fallback support
  - VideoSelector with preset videos and custom upload
  - Smooth transitions between gradient and video backgrounds
  - Built-in video options from Pixabay CDN
  - File upload support for custom videos
- June 24, 2025. Added comprehensive admin panel system:
  - AdminPanel component for real-time editing
  - Personal info editing (name, title, description)
  - Image URL management (profile and about images)
  - Contact information editing
  - Social media URL management
  - Skills management with add/remove functionality
- June 24, 2025. Prepared for public deployment:
  - Added SEO meta tags and Open Graph data
  - Configured deployment settings in .replit
  - Production build optimization
- June 24, 2025. Created separate admin and public websites:
  - /admin - Complete admin panel for content management
  - / - Clean public website without edit buttons
  - Data synchronization via localStorage
  - Separate routing for admin and public access
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```