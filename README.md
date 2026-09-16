# Magribache - Business Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A comprehensive, modern CRM and business management platform built with Next.js, designed to streamline client relationships, supplier management, task tracking, and financial operations.

## 🎯 Features

### 📊 Core Modules
- **Client Management** - Create, organize, and manage client information with custom categories
- **Supplier Management** - Track suppliers, contacts, and supplier relationships  
- **Contact Management** - Centralized contact management for clients and suppliers
- **Task Management** - Priority-based task tracking with due dates and project assignment
- **Document Management** - Upload, organize, and manage business documents
- **Financial Operations** - Invoice generation, quotation management, and contract tracking
- **Sales Dashboard** - Real-time sales metrics and revenue tracking
- **Report Generation** - Comprehensive business reports and analytics

### 🔐 Authentication & Security
- JWT-based authentication with secure session management
- Bcrypt password hashing
- Admin role-based access control
- Protected API routes and endpoints

### 💻 User Interface
- Modern, responsive dashboard design
- Dark/Light theme support
- Drag-and-drop interface for task management
- Data tables with advanced filtering and sorting
- Interactive charts and visualizations
- Mobile-friendly responsive layout

### ⚙️ Technical Features
- **Real-time Updates** - React Query for efficient data synchronization
- **Form Validation** - React Hook Form with Zod schema validation
- **State Management** - Zustand for global state management
- **Component Library** - shadcn/ui integrated components
- **Type Safety** - Full TypeScript support with strict typing
- **Database ORM** - Prisma with PostgreSQL adapter

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/magribache.git
cd magribache
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/magribache"
JWT_SECRET="your_jwt_secret_key_here"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Setup the database**
```bash
# Run Prisma migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
magribache/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard routes
│   ├── api/                 # API routes for backend logic
│   ├── login/               # Authentication pages
│   ├── generated/           # Generated Prisma client
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── add-dialog.tsx       # Add/Create dialogs
│   ├── data-table.tsx       # Data table component
│   ├── app-sidebar.tsx      # Navigation sidebar
│   ├── login.tsx            # Login form
│   └── theme-provider.tsx   # Theme context
├── hooks/                   # Custom React hooks
│   ├── mutations.ts         # React Query mutations
│   ├── querys.ts            # React Query queries
│   └── useEntity.ts         # Entity-specific hooks
├── lib/                     # Utility functions
│   ├── auth.ts              # Authentication utilities
│   ├── prisma.ts            # Prisma client singleton
│   └── utils.ts             # General utilities
├── utils/                   # Helper utilities
│   ├── Apis.ts              # API client configuration
│   ├── types.ts             # TypeScript type definitions
│   ├── schema.ts            # Zod validation schemas
│   └── constants.ts         # Application constants
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma        # Prisma data model
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── stores/                  # Zustand state stores
│   └── auth-store.ts        # Authentication state
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies & scripts
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework for production |
| **React 19** | UI library |
| **TypeScript 5** | Type-safe JavaScript |
| **Prisma 7** | ORM for database management |
| **PostgreSQL** | Relational database |
| **TailwindCSS 4** | Utility-first CSS framework |
| **React Query** | Server state management |
| **React Hook Form** | Efficient form management |
| **shadcn/ui** | High-quality UI components |
| **Zod** | Schema validation |
| **Zustand** | Lightweight state management |
| **JWT** | Token-based authentication |
| **Bcrypt** | Password hashing |

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users login with email and password
2. Server validates credentials against bcrypt-hashed passwords
3. JWT token is issued and stored in httpOnly cookies
4. Protected routes verify token validity

**API Routes:**
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user info

## 📊 Database Schema

Key models include:
- **Admin** - User accounts with authentication
- **Task** - Task management with priority and status
- **Client** - Client information and metadata
- **Fournisseur** - Supplier/vendor management
- **ContactsFournisseur** - Supplier contacts
- **Contact** - Client contacts
- **Document** - Document storage and management
- **Invoice** - Financial invoicing
- **Devis** - Quotations/Estimates
- **Contrat** - Contract management

View the complete schema in [prisma/schema.prisma](prisma/schema.prisma)

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy your app is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

**Other deployment options:**
- Docker containerization
- AWS, Google Cloud, or Azure
- Self-hosted VPS
- DigitalOcean App Platform

## 📝 API Endpoints

### Clients
- `GET /api/client-fetch` - Fetch all clients
- `POST /api/client-create` - Create new client
- `DELETE /api/client-delete` - Delete client
- `POST /api/update-client` - Update client info
- `POST /api/move-client` - Move client to prospect

### Suppliers
- `GET /api/fournisseur-fetch` - Fetch all suppliers
- `POST /api/fournisseur-create` - Create new supplier
- `DELETE /api/fournisseur-delete` - Delete supplier
- `POST /api/update-fournisseur` - Update supplier

### Tasks
- `GET /api/task-fetch` - Fetch all tasks
- `POST /api/task-add` - Create new task
- `DELETE /api/task-delete` - Delete task
- `POST /api/update-task` - Update task

### Financial Documents
- `POST /api/facture-create` - Create invoice
- `POST /api/devis-create` - Create quotation
- `POST /api/contrat-create` - Create contract
- `GET /api/doc-fetch` - Fetch documents

See individual API route files in [app/api/](app/api/) for detailed documentation.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use ESLint for code quality
- Write descriptive commit messages
- Test features before submitting PR
- Keep components modular and reusable

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

- **Email:** alferdmony41@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Prisma](https://www.prisma.io/) - Database ORM
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- All open-source contributors

---

**Made with ❤️ by Rmili Ishaq**
