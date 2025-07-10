# VA Home Loans Frontend

Next.js 14+ application with App Router, TypeScript, Tailwind CSS v4, and shadcn/ui for the VA Home Loans website.

## Prerequisites

- Bun runtime (latest version)
- Node.js 18+ (for compatibility)

## Setup Instructions

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
bun install
```

3. Copy the environment variables:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file with your actual values:
- Supabase URL and anon key
- GraphQL endpoint (default: http://localhost:8000/graphql)
- Google Analytics measurement ID (optional)
- Company information

## Development

Start the development server:
```bash
bun run dev
```

The application will be available at http://localhost:3000

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run type-check` - Check TypeScript types
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS with CSS-first configuration
- **shadcn/ui** - Component library
- **Bun** - JavaScript runtime and package manager

## Project Structure

```
frontend/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   │   └── ui/       # shadcn/ui components
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
└── ...config files
```

## Tailwind CSS v4 Notes

This project uses Tailwind CSS v4 with a CSS-first configuration approach:

- Configuration is done in `globals.css` using `@theme inline`
- No `tailwind.config.js` file is needed
- Custom colors are defined as CSS variables with oklch format
- VA brand colors: `bg-va-blue`, `text-va-gold`, `border-va-red`

## Environment Variables

See `.env.local.example` for required environment variables.

## License

Private - All rights reserved