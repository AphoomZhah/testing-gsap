# Vite + React + Tailwind CSS Project

A modern, fast React project built with Vite and styled with Tailwind CSS.

## Features

- ⚡️ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with modern features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🔥 **Hot Module Replacement** - Instant updates during development
- 📦 **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind directives
├── public/               # Static assets
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Customization

### Tailwind CSS

The project is configured with Tailwind CSS. You can customize the design system by modifying `tailwind.config.js`.

### Styling

- Use Tailwind utility classes for styling
- Custom CSS can be added in `src/index.css` using `@layer` directives
- Component-specific styles can be added inline or in separate CSS modules

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT
