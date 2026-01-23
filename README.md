# Legal Consulting Website - Portfolio Project

A modern, professional website for a legal consulting practice specializing in securities, financial law, and regulatory compliance. This project demonstrates full-stack web development skills with a focus on clean code, performance, and user experience.

## 🌐 Live Demo

Visit the live site: [monsalverubi.com](https://monsalverubi.com)

## � Project Highlights

This project showcases practical implementation of:

### Frontend Architecture
- ✅ **Component-based design** with React 18 and TypeScript
- ✅ **State management** using React hooks with unified state patterns
- ✅ **Type safety** throughout the application for maintainability
- ✅ **Custom design system** with CSS variables and design tokens
- ✅ **Responsive design** optimized for all device sizes

### Key Features
- 🌍 **Bilingual support** (Spanish/English) with context-based i18n
- 📧 **Robust contact form** with real-time validation and error handling
- 🎨 **Professional UI** with custom animations and transitions
- ♿ **Accessibility** with semantic HTML and ARIA attributes
- 🛡️ **Security features** including honeypot spam protection and input validation

### Development Practices
- 📝 **Clean code** with organized folder structure and naming conventions
- 🔧 **Path aliases** for cleaner imports and easier refactoring
- 🎯 **Performance optimization** with memoization and code splitting
- 🚀 **Fast build times** using Vite with optimized bundling
- 📊 **Git workflow** with meaningful commit messages

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 18 + TypeScript |
| **Routing** | React Router v7 |
| **Build Tool** | Vite 5 |
| **Styling** | CSS3 + Design Tokens |
| **Icons** | Lucide React |
| **Email Service** | Resend API |
| **Deployment** | Vercel |

## 🎯 What I Built

### Components & State Management
- **Modular components** with clear separation of concerns
- **Unified state pattern** combining form data, UI states, and errors
- **Custom hooks** for reusable logic across components
- **Context API** for global language management

### Form Handling
- Real-time email validation
- Smart error clearing that improves UX
- Auto-dismissing success messages
- Honeypot field for bot protection
- Type-safe form state with TypeScript interfaces

### Internationalization
- Dual-language support without external libraries
- Dynamic key-based translations
- Language toggle in navigation
- Consistent translation structure

### Styling & Design
- CSS-in-files organization by component
- Design system with 40+ CSS variables
- Responsive grid layouts
- Smooth animations and transitions
- Professional color palette and typography

## 🔒 Security Implementation

- Input validation on both client and server
- CSRF protection with honeypot fields
- Email domain validation (blocks temporary emails)
- Trimmed user input to prevent whitespace injection
- Environment variables for sensitive data
- Type safety preventing runtime errors

## 🎨 Design Approach

The design system uses:
- **Semantic color variables** (primary, success, error, warning)
- **Consistent spacing scale** (0.5rem base unit)
- **Typography hierarchy** with serif/sans-serif combination
- **Accessible color contrast** ratios (WCAG AA compliant)
- **Mobile-first responsive design**

## 📊 Code Quality

- **TypeScript**: Full type coverage for better DX and fewer bugs
- **Organized structure**: Logical folder organization following industry standards
- **Clean code patterns**: SOLID principles applied to component design
- **Error handling**: Comprehensive try-catch and error boundaries
- **Testing mindset**: Validation logic separated for easy unit testing

## 🚀 Deployment & DevOps

- Deployed on **Vercel** for automatic deployments
- Serverless functions for email API
- Environment-based configuration
- Zero-downtime deployments
- Performance monitoring via Vercel Analytics

## � Code Organization

```
src/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── context/          # React Context for global state
├── constants/        # App-wide constants
├── shared/           # Utilities and helpers
├── styles/           # Component-scoped CSS
├── locales/          # i18n translation files
└── assets/           # Images and SVG files
```

## 🎯 What's Next

Future enhancements could include:
- Unit and integration tests (Jest, Vitest)
- E2E tests (Cypress, Playwright)
- Analytics integration
- Blog section with MDX
- Case studies showcase
- CMS integration

## 📄 License

This project is proprietary and not for redistribution.

---

**Built with attention to detail by a developer committed to clean code and best practices.**

For more information about my work, visit my [LinkedIn](https://linkedin.com/in/monsalverubi) or check out my other projects on [GitHub](https://github.com/monrubi).
