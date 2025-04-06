# 📘 Project Overview: MongoNext Starter Template

**MongoNext** is a professional-grade, production-ready starter template designed to streamline the development of modern web applications using **Next.js (App Router)**, **React**, and **MongoDB**. It's engineered to get developers up and running with essential app infrastructure in minutes — featuring integrated authentication, a responsive component system with Material UI, dark/light theming, robust API routing, and full-stack scaffolding tools.

This template is ideal for solo developers, startup teams, and enterprise projects looking for a scalable, secure foundation that adheres to current best practices.

---

## 🎯 Objectives

- Accelerate development speed with pre-built modules and pages.
- Reduce setup time for full-stack React/Next.js apps using MongoDB.
- Deliver a modular, testable, and extensible architecture.
- Offer seamless onboarding for developers through auto-documentation and CLI generators.
- Provide a framework that’s AI-assistant friendly (well-documented, structured, and testable).

---

## 🧠 Tech Stack Summary

| Layer                     | Tech / Library                   |
|--------------------------|----------------------------------|
| **Frontend**             | React 19, Next.js 15 (App Router)|
| **Styling**              | Material UI, Emotion             |
| **Backend**              | Node.js, Next.js API Routes      |
| **Database**             | MongoDB with Mongoose ORM        |
| **Auth**                 | NextAuth.js                      |
| **Forms & Validation**   | React Hook Form + Zod            |
| **Data Viz**             | Recharts                         |
| **Testing**              | Vitest, Storybook, Playwright    |
| **Dev Tools**            | ESLint, Prettier, Plop.js        |

---

## 🏛️ Architectural Components

### 📁 App Layer
- Built on Next.js **App Router**
- Supports dynamic routing with layouts and metadata
- Example routes: `admin/events`, `auth/forgot-password`, `api/auth/register`

### 🧩 Component Layer
- Organized into reusable units: `ui`, `forms`, `layout`, `dashboard`, etc.
- Each component is JSDoc-annotated and styled using Material UI's `sx` prop

### 🧬 Data Access Layer
- API routes live under `src/app/api`
- MongoDB connectivity managed via `mongoose` and a shared connection utility
- Uses Mongoose schemas with virtuals, validation, and indexing

### 🔐 Auth Layer
- NextAuth.js integrated with Google and email/password providers
- Includes:
  - Email verification
  - Password reset
  - JWT session management
  - Role-based route protection

### 🔧 Utilities Layer
- Utility methods for auth, DB connection, email, and common logic
- File structure:
  ```
  lib/
    ├── api/
    ├── auth/
    ├── db/
    └── utils/
  ```

### 📚 Documentation + Storybook
- **Storybook** integration (`npm run storybook`) for visual documentation
- Story files (`.stories.js`) are colocated with components
- CLAUDE.md defines contributor/editor code standards and structure

### 🛠️ Code Generation (Plop.js)
- `npm run plop` allows CLI-driven generation of:
  - Components
  - Pages
  - API routes
  - Mongoose models

---

## 🚪 Testing + Quality

- **Testing Framework**: Vitest (unit + integration)
- **Linter/Formatter**: ESLint with Airbnb config, Prettier
- **Testing strategy** includes:
  - API route testing
  - Component rendering (via Storybook)
  - E2E coverage using Playwright

---

## 🚀 Suggested Use Cases

- Internal tools and dashboards
- Hackathon/event management platforms
- SaaS platforms (starter kit)
- AI-driven frontends (with room to plug in LLM API endpoints)
- Authenticated admin panels or portals

---

## 🔍 For AI Assistants

MongoNext is designed with automation and AI assistants in mind:
- **JSDoc annotations** and clear function signatures support code comprehension.
- **Code generation (Plop)** offers hooks for guided scaffolding.
- **Logical structure** with `/lib`, `/components`, and `/app/api` provides clarity for navigating code.
- **MongoDB models** follow predictable patterns.
- **Readable configuration files** make it easy to parse app context (e.g., `next.config.mjs`, `auth/config.js`).

