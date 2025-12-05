# ERP Frontend Application

A modern, full-featured Enterprise Resource Planning (ERP) frontend application built with React Router v7, TypeScript, and Tailwind CSS. This application provides comprehensive management features for baseline information including yarn codes, item codes, and employee/staff codes.

## 🚀 Technologies

### Core Framework
- **React** `^19.1.0` - UI library
- **React Router** `^7.7.1` - Routing and navigation (SPA mode)
- **TypeScript** `^5.8.3` - Type-safe JavaScript
- **Vite** `^6.3.3` - Build tool and dev server

### UI & Styling
- **Tailwind CSS** `^4.1.4` - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Select, Popover, Checkbox, Radio Group, Tooltip, etc.
- **Lucide React** `^0.540.0` - Icon library
- **Sonner** `^2.0.7` - Toast notifications

### Form Management & Validation
- **React Hook Form** `^7.65.0` - Form state management
- **Zod** `^4.1.12` - Schema validation
- **@hookform/resolvers** `^5.2.2` - Zod integration for React Hook Form

### State Management
- **Zustand** `^5.0.8` - Lightweight state management (for global loader)
- **TanStack Query** `^5.85.5` - Server state management and data fetching

### Data Tables
- **TanStack Table** `^8.21.3` - Headless table library with sorting, filtering, pagination

### Internationalization
- **i18next** `^25.5.2` - Internationalization framework
- **react-i18next** `^15.7.3` - React bindings for i18next
- **i18next-browser-languagedetector** `^8.2.0` - Language detection

### HTTP Client
- **Axios** `^1.11.0` - HTTP client for API requests

### Utilities
- **clsx** `^2.1.1` - Conditional className utility
- **tailwind-merge** `^3.3.1` - Merge Tailwind CSS classes
- **js-cookie** `^3.0.5` - Cookie management
- **class-variance-authority** `^0.7.1` - Component variant management

### Development Tools
- **ESLint** `^9.33.0` - Code linting
- **Prettier** `^3.6.2` - Code formatting
- **TypeScript ESLint** `^8.40.0` - TypeScript linting

## 📁 Project Structure

```
erp_fe/
├── app/
│   ├── assets/              # Static assets (icons, images)
│   ├── components/           # React components
│   │   ├── common/         # Common/shared components
│   │   ├── customs/        # Custom reusable components
│   │   ├── forms/          # Form components
│   │   ├── tables/         # Table-related components
│   │   └── ui/             # UI primitives (Radix UI wrappers)
│   ├── configs/            # Configuration files
│   ├── constants/          # Application constants
│   ├── helpers/            # Utility functions and helpers
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components
│   ├── lib/                # Library configurations (i18n, utils)
│   ├── locales/            # Translation files (en.json, ko.json)
│   ├── mocks/              # Mock data for development
│   ├── providers/          # Context providers
│   ├── routes/             # Route components
│   │   ├── admin/          # Admin routes
│   │   ├── auth/           # Authentication routes
│   │   └── main/           # Main/public routes
│   ├── services/           # API service layer
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript type definitions
│   ├── root.tsx            # Root component
│   └── routes.ts           # Route configuration
├── public/                 # Public static files
├── build/                  # Production build output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

## 🛠️ Installation

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd erp_fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (configured in `vite.config.ts`).

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `build/` directory:
- `build/client/` - Static assets for the client
- `build/server/` - Server-side code (if SSR is enabled)

### Production Server

Start the production server:

```bash
npm start
```

This runs the built application using `react-router-serve`.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run prettier` | Check code formatting |
| `npm run prettier:fix` | Fix code formatting automatically |

## ✨ Key Features

### Baseline Information Management
- **Yarn Code Management** - Manage yarn types, names, colors, and notes
- **Item Code Management** - Manage raw fabric and direct purchase items
  - Raw Fabric items with yarn composition
  - Direct Purchase items with buy/sale item names
  - Fabric part settings
- **Staff/Employee Code Management** - Comprehensive employee management
  - Basic information (name, email, contact, password)
  - Contract information (department, job title, employment status, dates)
  - Payroll account information

### UI Features
- **Responsive Design** - Mobile-friendly layouts
- **Data Tables** - Sortable, filterable tables with pagination
- **Form Validation** - Real-time validation with Zod schemas
- **Date Picker** - Custom date picker with day/month/year navigation
- **Toast Notifications** - User feedback for actions
- **Global Loader** - Loading states for async operations
- **Internationalization** - Support for English and Korean (default: Korean)

### Component Library
- Reusable custom components (DialogCustom, TableCustom, SelectCustom)
- Form components with React Hook Form integration
- Accessible UI components built on Radix UI

## 🌐 Internationalization

The application supports multiple languages:
- **English (en)**
- **Korean (ko)** - Default language

Translation files are located in `app/locales/`:
- `en.json` - English translations
- `ko.json` - Korean translations

The language is detected from:
1. localStorage
2. Browser navigator
3. HTML lang attribute

## 🎨 Styling

The project uses **Tailwind CSS v4** for styling:
- Utility-first CSS approach
- Custom configuration in `vite.config.ts`
- Custom fonts (Gothic A1) in `public/fonts/`
- Responsive breakpoints and design system

## 📦 Build Configuration

- **Mode**: SPA (Single Page Application) - SSR disabled
- **Port**: 3000 (development)
- **Path Aliases**: `~/*` maps to `./app/*`
- **TypeScript**: Strict mode enabled

## 🔧 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint for code quality
- Prettier for code formatting
- Import sorting with `@trivago/prettier-plugin-sort-imports`

### Component Structure
- Functional components with TypeScript
- Custom hooks for reusable logic
- Helper functions for utilities
- Centralized constants and types

### State Management
- **Local State**: React `useState` and `useReducer`
- **Global State**: Zustand (for loader state)
- **Server State**: TanStack Query
- **Form State**: React Hook Form

## 🐳 Docker Deployment

The project includes a `Dockerfile` for containerized deployment:

```bash
# Build Docker image
docker build -t erp-fe .

# Run container
docker run -p 3000:3000 erp-fe
```

## 📝 Notes

- The application runs in **SPA mode** (SSR disabled)
- Default language is **Korean**
- Development server runs on port **3000**
- Mock data is available in `app/mocks/` for development

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Run `npm run typecheck` and `npm run lint` before committing
3. Ensure all tests pass (if applicable)
4. Update translations in both `en.json` and `ko.json` when adding new text

## 📄 License

[Add your license information here]

---

Built with ❤️ using React Router, TypeScript, and modern web technologies.
