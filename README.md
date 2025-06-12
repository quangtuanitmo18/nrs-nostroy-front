# NRS NOSTROY Open Front

## Project Overview

This is the frontend application for the NRS NOSTROY open system. It provides a user interface for accessing the National Register of Specialists (NRS) in the field of construction.

## Tech Stack

- **Vue 3:** Using the Composition API with `<script setup>` syntax
- **Vite:** As the build tool and development server
- **Vuetify 3:** For UI components
- **Vue Router:** For client-side routing
- **TanStack Query:** For data fetching, caching, and state management
- **Axios:** For HTTP requests
- **Yup:** For form validation
- **Maska:** For input masking
- **SASS:** For styling

## Project Structure

```
src/
├── apis/               # API integration files
├── assets/             # Static assets (fonts, images)
├── components/         # Reusable Vue components
├── composables/        # Vue composables (custom hooks)
├── configs/            # Application configuration files
├── constants/          # Constants and enumerations
├── router/             # Vue Router configuration
├── schemas/            # Validation schemas (Yup)
├── services/           # Services for data fetching
├── styles/             # Global styles
├── utils/              # Utility functions
└── views/              # Page components
```

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd nrs-nostroy-open-front
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the project root (or modify the existing one)
   ```
   VITE_API_BASE_URI=https://nrs-nostroy-open.anonamis.ru/
   ```

### Development

Start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the project for production:

```
npm run build
```

Preview the production build:

```
npm run preview
```

## API Configuration

The application is configured to proxy API requests to the backend server. In development mode, requests to `/api` are forwarded to `https://nrs-nostroy-open.anonamis.ru`.

This proxy configuration can be modified in the `vite.config.js` file.

## Linting and Formatting

The project uses ESLint for linting and Prettier for code formatting.

- Run linting:

  ```
  npm run lint
  # or with auto-fix
  npm run lint:fix
  ```

- Run formatting:
  ```
  npm run prettier
  # or with auto-fix
  npm run prettier:fix
  ```

## Main Views

1. **Home View:** Displays the list of specialists with filterable and sortable data
2. **Notification by SNILS:** Form to submit notifications using SNILS identification
3. **Notification by FIO:** Form to submit notifications using Full Name and personal data
