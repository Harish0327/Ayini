# SpiceHeritage - Next.js E-commerce Store

A modern e-commerce platform for traditional Indian spices and powders, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Database**: Supabase for backend services
- **Authentication**: Supabase Auth
- **State Management**: TanStack Query (React Query)
- **Responsive Design**: Mobile-first approach
- **Admin Dashboard**: Complete admin panel for managing products, orders, and customers

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd humble-hearth-shop
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── product/[id]/      # Dynamic product pages
│   ├── shop/              # Product listing
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── pages/             # Page components
│   ├── providers/         # Context providers
│   └── ui/                # shadcn/ui components
├── integrations/          # External service integrations
│   └── supabase/          # Supabase client and types
├── lib/                   # Utility functions
└── hooks/                 # Custom React hooks
```

## Key Changes from Vite to Next.js

1. **Routing**: Migrated from React Router to Next.js App Router
2. **Image Optimization**: Using Next.js Image component
3. **Environment Variables**: Prefixed with `NEXT_PUBLIC_` for client-side access
4. **Build System**: Replaced Vite with Next.js build system
5. **Client Components**: Added "use client" directive for interactive components

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Deployment

The application can be deployed on Vercel, Netlify, or any platform that supports Next.js.

For Vercel deployment:
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## License

This project is private and proprietary.