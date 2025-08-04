<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions for Keuangan Pribadi Project

## Project Overview
This is a personal finance management application built with Next.js 14, TypeScript, and MongoDB Atlas. The app helps users track income, expenses, budgets, and generate financial reports.

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: NextAuth.js (future implementation)
- **Charts**: Recharts library
- **Styling**: Tailwind CSS with custom utility classes

## Coding Standards

### TypeScript
- Use strict TypeScript with proper type definitions
- Define interfaces for all data models (ITransaction, IBudget, IUser)
- Use proper typing for API responses and form data
- Avoid `any` types - use specific interfaces instead

### React/Next.js
- Use functional components with hooks
- Implement proper error handling and loading states
- Use 'use client' directive for client-side components
- Follow Next.js App Router conventions for file structure

### API Design
- RESTful API design with proper HTTP methods
- Consistent response format: `{ success: boolean, data?: any, error?: string }`
- Proper error handling with appropriate status codes
- Input validation for all endpoints

### Database
- Use Mongoose schemas with proper validation
- Implement proper indexing for performance
- Use lean() queries for read-only operations
- Follow MongoDB naming conventions

### Styling
- Use Tailwind CSS utility classes
- Custom components in `@layer components`
- Responsive design principles
- Consistent color scheme (primary, success, danger)

## Key Features to Implement
1. Transaction management (CRUD operations)
2. Budget tracking and alerts
3. Financial reporting with charts
4. Category-based expense tracking
5. Monthly/yearly summaries
6. Data export functionality

## File Structure Conventions
- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/src/models` - Mongoose schemas and models
- `/src/types` - TypeScript type definitions

## Environment Variables
- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXTAUTH_URL` - Application URL

## Development Notes
- The app uses MongoDB Atlas for cloud database access
- Demo user ID 'demo-user' is used for development
- All currency formatting uses Indonesian Rupiah (IDR)
- Date handling follows Indonesian locale (dd/mm/yyyy)
