# user-management-frontend

Hosted on Netlify: https://user-management-frontend-h8hc.onrender.com

A React (v19) + TypeScript + Vite single-page application (SPA) for managing users and their associated cars.
This frontend consumes a RESTful backend (e.g., the UserManagementApi) to provide Create, Read, Update, and Delete (CRUD) operations for both users and cars.
It uses SCSS for styling, Axios for HTTP requests, and React Query for efficient data fetching and caching.
The project follows a modular "clean-style" structure—separating public assets, application entry points, presentation components, service (API) calls, and styling.

---

## Table of Contents

- [Description](#description)  
- [Folder Structure](#folder-structure)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running the Application](#running-the-application)  
- [Available Scripts](#available-scripts)  
- [Features](#features)  
- [Architecture Overview](#architecture-overview)  
- [Technologies Used](#technologies-used)  
- [Notes](#notes)  

---

## Description

This project is a client‐side SPA built with React, written in TypeScript, and bundled using Vite. It provides:

- **User Management**: List all users, view details, create new users, edit existing users, and delete users.  
- **Car Management**: For each user, you can list associated cars, add a new car record, edit an existing car, and delete a car.  

All data operations are performed against a RESTful API (for example, a .NET-based backend). The codebase is organized to keep UI, service logic, and styling in separate folders for readability and maintainability.

---

## Folder Structure

user-management-frontend/ <br>
├── public/<br>
│ ├── favicon.ico<br>
│ ├── index.html # Main HTML template<br>
│ └── assets/ # (optional) static assets like images/icons<br>
│<br>
├── src/<br>
│ ├── assets/ # Static files imported by components (e.g., images, SVGs)<br>
│ │ └── …<br>
│ │<br>
│ ├── components/ # Reusable UI components<br>
│ │ ├── UserList.tsx # Displays a table/list of users<br>
│ │ ├── UserForm.tsx # Form to create/edit user details<br>
│ │ ├── CarList.tsx # Displays a table/list of cars for a selected user<br>
│ │ ├── CarForm.tsx # Form to create/edit car details<br>
│ │ └── …<br>
│ │<br>
│ ├── services/ # API service layer (fetch wrappers or Axios calls)<br>
│ │ └── api.ts # Defines functions like getUsers(), createUser(), etc.<br>
│ │<br>
│ ├── styles/ # Global or shared styles (CSS/SCSS)<br>
│ │ ├── variables.css # CSS variables (colors, spacing, etc.)<br>
│ │ └── global.css # Global resets and base styles<br>
│ │<br>
│ ├── App.tsx # Root React component (wiring pages/components together)<br>
│ ├── main.tsx # Application entry point: renders <App /> into DOM<br>
│ ├── vite-env.d.ts # Vite TypeScript declarations<br>
│ └── index.css # (Optional) base CSS imported by main.tsx<br>
│<br>
├── .gitignore<br>
├── eslint.config.js # ESLint configuration<br>
├── package.json<br>
├── tsconfig.json<br>
├── tsconfig.node.json<br>
├── vite.config.ts # Vite configuration (aliases, plugins, etc.)<br>
└── README.md # This README file<br>

---

## Prerequisites

- **Node.js** v16 or higher (includes `npm`).  
- A running instance of the backend REST API (for example, the UserManagementApi). Update the API base URL in `src/services/api.ts` if needed.  

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/MaorTe/user-management-frontend.git
   cd user-management-frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment (if necessary)
  - By default, the frontend expects the API to run at http://localhost:5000 (or wherever your backend is hosted).
  - To change this, edit the BASE_URL constant in src/services/api.ts (or use an .env file if you’ve added support for that).

## Running the Application
   ```bash
   npm run dev
   ```
  - Starts Vite’s development server on http://localhost:5173 (port may vary—check console).
  - The app will automatically reload when you modify source files.

## Production Build
   ```bash
   npm run build
   ```
  - Bundles the application for production into the dist/ folder, minified and optimized.
*Preview Production Build*
   ```bash
   npm run preview
   ```
  - Serves the production build locally (for a final check before deploying).

## Available Scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint \"src/**/*.{ts,tsx}\" --fix"
  }
}
- npm run dev: Starts the Vite dev server with Hot Module Replacement (HMR).
- npm run build: Builds a production‐optimized version in dist/.
- npm run preview: Serves the production build for local testing.
- npm run lint: Runs ESLint on all .ts/.tsx files under src/ and auto‐fixes where possible.

## Features

1. **User Management**
   - **List Users**: Display all users in a paginated/table view.
   - **Create User**: Open a modal or navigate to a form to add a new user.
   - **Edit User**: Click “Edit” next to a user to modify their details.
   - **Delete User**: Remove a user after confirmation.

2. **Car Management**
   - **List Cars**: For a selected user, view all associated cars.
   - **Create Car**: Fill out a form to add a new car under a user.
   - **Edit Car**: Modify existing car details.
   - **Delete Car**: Delete a car record after confirmation.

3. **Global Error Handling & Loading States**
   - Show a spinner or “Loading…” indicator when API calls are in progress.
   - Display alerts or toast messages for success/failure of create, update, or delete operations.

4. **Responsive Design**
   - Basic responsive layouts so the UI adapts to mobile, tablet, and desktop screens.

## Architecture Overview

1. **`public/`**
   - Contains `index.html` which loads the Vite‐bundled JavaScript.  
   - Static assets (images, icons) live in `public/assets/`.  

2. **Entry Point (`src/main.tsx`)**
   - Bootstraps React and renders `<App />` into `#root`.  
   - Imports global CSS (e.g., `index.css` or `styles/global.css`).  

3. **Root Component (`src/App.tsx`)**
   - Defines the overall layout: e.g., header/nav bar, main content area, footer.  
   - Uses React Router (if configured) or conditional rendering to switch between “Users” and “Cars” views.  

4. **Components (`src/components/`)**
   - **UI-Focused**: Each file is typically a single React component (e.g., `UserList.tsx`, `CarForm.tsx`).  
   - **Presentational vs. Container**:  
     - _Presentational_ components render UI based on props.  
     - _Container_ components (if used) handle data fetching and pass props to Presentational components.  
   - **Styling**: Each component can import a scoped CSS/SCSS file (e.g., `UserList.module.css`).  

5. **Services (`src/services/api.ts`)**
   - Centralizes all HTTP calls (e.g., using `fetch` or `Axios`).  
   - Exposes functions such as:  
     ```ts
     export async function getUsers(): Promise<User[]> { … }
     export async function getUserById(id: number): Promise<User> { … }
     export async function createUser(data: Partial<User>): Promise<User> { … }
     export async function updateUser(id: number, data: Partial<User>): Promise<User> { … }
     export async function deleteUser(id: number): Promise<void> { … }
     ```
   - Similar functions exist for cars: `getCars(userId)`, `createCar(userId, carData)`, etc.
   - All API calls point to a base URL (e.g., `http://localhost:5000/api`).

---

**State Management**  
- Local component state with React’s `useState` and `useEffect` hooks.  
- Optionally, React Context or a lightweight state library (e.g., Zustand) if the app grows.

---

**Styling (`src/styles/`)**  
- Global resets and variables in `global.css` or `variables.css`.  
- Component‐level CSS Modules or plain `.css` for scoped styling.

---

**Routing (Optional)**  
- If multiple “pages” exist (e.g., `/users`, `/users/:id`, `/users/:id/cars`), React Router can be configured in `App.tsx`.  
- Otherwise, simple conditional rendering inside `<App />` or within individual components suffices.

---

**Build & Deployment**  
- Vite handles bundling, code‐splitting, and asset optimization.  
- The `build` script outputs a production‐ready `dist/` folder.  
- This folder can be deployed to any static‐hosting service (Netlify, Vercel, GitHub Pages, etc.) or served by a Node/Express server.  

## Technologies Used

- **React** (v19) with **TypeScript**  
- **Vite** as the development server and build tool  
- **ESLint** for linting (configured in `eslint.config.js`)  
- **SCSS** for styling (module support)  
- **React Query** for data fetching and caching  
- **Axios** for HTTP requests  
- **React Router** for client-side routing  
- **npm** (or **Yarn**) for package management  

# React + TypeScript + Vite
**Default Vite Template**
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
